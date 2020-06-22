import { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'

/**
 * The basic comportment of a resource which access an API
 *
 * The Axios response stay available using the property `$axios`
 */
export default abstract class AbstractResource {
  protected axios: AxiosInstance
  protected objectFactory?: (data: any) => any

  constructor(axios: AxiosInstance, ObjectConstructor?: { new (): any }) {
    this.axios = axios

    if (ObjectConstructor) {
      this.objectFactory = (data: any) => {
        if (Array.isArray(data)) {
          data = data.map(item => {
            const constructed = new ObjectConstructor()
            return Object.assign(constructed, item)
          })
        } else {
          const constructed = new ObjectConstructor()
          data = Object.assign(constructed, data)
        }
        return data
      }
    }
  }

  protected wrapHydraItem(data: any): any & { $hydra: any } {
    const $hydra: { [key: string]: any } = {}
    for (const key of Object.keys(data)) {
      if (key.startsWith('@') || (key.startsWith('hydra') && key !== 'hydra:member')) {
        $hydra[key] = data[key]
        delete data[key]
      }
    }
    if ($hydra['@type'] === 'hydra:Collection') {
      data = data['hydra:member']
      for (const key of Object.keys(data)) {
        data[key] = this.wrapHydraItem(data[key])
      }
    }
    data.$hydra = $hydra
    return data
  }

  protected wrapPromise(axiosPromise: AxiosPromise, objectFactory?: (data: any) => any) {
    return new Promise((resolve, reject) => {
      axiosPromise
        .then((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data
          if (typeof data === 'object') {
            data = this.wrapHydraItem(data)

            if (!objectFactory) {
              objectFactory = this.objectFactory
            }

            if (objectFactory) {
              data = objectFactory(data)
              axiosResponse.data = data
            }

            data.$axios = axiosResponse
            delete data.$axios.data

            const headers = axiosResponse.headers

            if (
              'pagination-page' in headers ||
              'pagination-itemsperpage' in headers ||
              'pagination-itemstotalcount' in headers
            ) {
              data.$page = {
                page: parseInt(headers['pagination-page'], 10),
                itemsPerPage: parseInt(headers['pagination-itemsperpage'], 10),
                itemsTotalCount: parseInt(headers['pagination-itemstotalcount'], 10)
              }
            }

            resolve(data)
          } else {
            resolve(axiosResponse.data)
          }
        })
        .catch(reject)
    })
  }
}

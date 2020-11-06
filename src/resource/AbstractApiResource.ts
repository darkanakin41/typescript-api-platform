import AbstractResource from './AbstractResource'
import createPropsParams from '../function/createPropsParams'
import AxiosResponseExt from '../model/AxiosResponseExt'
import { AxiosRequestConfig } from 'axios'
import moment from 'moment'
import GetOptions from '../model/GetOptions'
import GetOneOptions from '../model/GetOneOptions'

export default abstract class AbstractApiResource<ResponseType, InputType = Partial<ResponseType>> extends AbstractResource {
  abstract readonly prefix: string

  protected loadProps (params: string[], options: GetOneOptions): void {
    if (options.props) {
      params.push(createPropsParams(options.props))
    }
  }

  protected buildSearch (field: string, query: string | number | boolean, type: string | undefined, isArray: boolean = false): string {
    if (type) {
      return `${field}[${type}]=${query}`
    }
    if (isArray) {
      return `${field}[]=${query}`
    }
    return `${field}=${query}`
  }

  protected loadSearches (params: string[], options: GetOptions): void {
    if (options.searches) {
      for (const search of options.searches) {
        let searchArray: (string | number | boolean)[]
        if (['boolean', 'string', 'number'].indexOf(typeof search.query) !== -1) {
          // @ts-ignore
          searchArray = [search.query]
        } else {
          // @ts-ignore
          searchArray = search.query
        }
        searchArray.forEach((item: (string | number | boolean)) => {
          params.push(this.buildSearch(search.field, item, search.type, (searchArray.length > 1)))
        })
      }
    }
  }

  protected loadSort (params: string[], options: GetOptions): void {
    if (options.sort) {
      params.push(`order[${options.sort.field}]=${options.sort.desc ? 'desc' : 'asc'}`)
    }
  }

  protected loadPage (params: string[], options: GetOptions) {
    if (options.page) {
      params.push('pagination=true')
      if (options.page.page) {
        params.push(`page=${options.page.page}`)
      }
      if (options.page.itemsPerPage) {
        params.push(`itemsPerPage=${options.page.itemsPerPage}`)
      }
    } else {
      params.push('pagination=false')
    }
  }

  protected buildParams (options?: GetOptions | GetOneOptions): string[] {
    const params: string[] = []

    if (!options) options = {}

    this.loadProps(params, options)
    this.loadSearches(params, options)
    this.loadSort(params, options)
    this.loadPage(params, options)

    return params
  }

  protected buildUrl (path: string, options?: GetOptions | GetOneOptions): string {
    const params = this.buildParams(options)
    return params && params.length > 0 ? `${path}?${params.join('&')}` : path
  }

  protected preProcessData (item: any): any {
    Object.keys(item).forEach(key => {
      if (item[key] instanceof Date) {
        const date = moment(item[key])
        item[key] = date.format('YYYY-MM-DD HH:mm:ss')
      }
    })
    return item
  }

  async count<GetResponseType = ResponseType> (options?: GetOptions): Promise<number & AxiosResponseExt> {
    const numberOfResultOptions: GetOptions = {
      ...options,
      ...{
        page: {
          page: 1,
          itemsPerPage: 1
        }
      }
    }
    const getNumberOfResults = await this.get(numberOfResultOptions)
    return getNumberOfResults.$hydra['hydra:totalItems']
  }

  getAll<GetResponseType = ResponseType> (options?: GetOptions): Promise<GetResponseType[] & AxiosResponseExt> {
    return this.get(options)
  }

  get<GetResponseType = ResponseType> (options?: GetOptions): Promise<GetResponseType[] & AxiosResponseExt> {
    const url = this.buildUrl(this.prefix, options)
    const axiosConfig = options ? options.axiosConfig : undefined

    const promise = this.wrapPromise(this.axios.get(url, axiosConfig))
    return promise as Promise<GetResponseType[] & AxiosResponseExt>
  }

  getOne<GetResponseType = ResponseType> (id: number | string, options?: GetOneOptions): Promise<GetResponseType & AxiosResponseExt> {
    const url = this.buildUrl(`${this.prefix}/${id}`, options)
    const axiosConfig = options ? options.axiosConfig : undefined

    const promise = this.wrapPromise(this.axios.get(url, axiosConfig))
    return promise as Promise<GetResponseType & AxiosResponseExt>
  }

  post<PostInputType = InputType, PostResponseType = ResponseType> (item: PostInputType, options?: GetOneOptions): Promise<PostResponseType & AxiosResponseExt> {
    const url = this.buildUrl(this.prefix, options)
    const axiosConfig = options ? options.axiosConfig : undefined

    const promise = this.wrapPromise(this.axios.post(url, this.preProcessData(item), axiosConfig))
    return promise as Promise<PostResponseType & AxiosResponseExt>
  }

  delete<DeleteResponseType = ResponseType> (id: number | string, options?: GetOneOptions): Promise<ResponseType & AxiosResponseExt> {
    const url = this.buildUrl(`${this.prefix}/${id}`, options)
    const axiosConfig = options ? options.axiosConfig : undefined

    const promise = this.wrapPromise(this.axios.delete(url, axiosConfig))
    return promise as Promise<ResponseType & AxiosResponseExt>
  }

  put<PutInputType = InputType, PutResponseType = ResponseType> (id: number | string, item: PutInputType, options?: GetOneOptions): Promise<PutResponseType & AxiosResponseExt> {
    const url = this.buildUrl(`${this.prefix}/${id}`, options)
    const axiosConfig = options ? options.axiosConfig : undefined

    const promise = this.wrapPromise(this.axios.put(url, this.preProcessData(item), axiosConfig))
    return promise as Promise<PutResponseType & AxiosResponseExt>
  }

  patch<PatchInputType = InputType, PatchResponseType = ResponseType> (id: number | string, item: PatchInputType, options?: GetOneOptions): Promise<PatchResponseType & AxiosResponseExt> {
    const url = this.buildUrl(`${this.prefix}/${id}`, options)
    const axiosConfig = options && options.axiosConfig ? options.axiosConfig : ({} as AxiosRequestConfig)

    if (!axiosConfig.headers) {
      axiosConfig.headers = {}
    }

    if (!axiosConfig.headers['Content-Type']) {
      axiosConfig.headers['Content-Type'] = 'application/merge-patch+json'
    }

    const promise = this.wrapPromise(this.axios.patch(url, this.preProcessData(item), axiosConfig))
    return promise as Promise<PatchResponseType & AxiosResponseExt>
  }
}

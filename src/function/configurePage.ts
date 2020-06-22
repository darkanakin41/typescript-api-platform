import Page from '../model/Page'
import { AxiosRequestConfig } from 'axios'

export default function configurePage(page?: Page, config?: AxiosRequestConfig) {
  if (!page) {
    return config
  }

  if (!config) {
    config = {}
  }

  if (!config.headers) {
    config.headers = {}
  }

  config.headers['Pagination-Page'] = page.page
  config.headers['Pagination-ItemsPerPage'] = page.itemsPerPage

  return config
}

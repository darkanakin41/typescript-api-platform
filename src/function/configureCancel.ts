import { AxiosRequestConfig, CancelTokenSource } from 'axios'

export default function configureCancel(
  cancelTokenSource?: CancelTokenSource,
  config?: AxiosRequestConfig
) {
  if (!cancelTokenSource) {
    return config
  }

  if (!config) {
    config = {}
  }

  config.cancelToken = cancelTokenSource.token
  return config
}

import { AxiosRequestConfig, CancelTokenSource } from 'axios';
export default function configureCancel(cancelTokenSource?: CancelTokenSource, config?: AxiosRequestConfig): AxiosRequestConfig | undefined;

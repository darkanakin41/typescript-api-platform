import { AxiosResponse } from 'axios';
export default interface AxiosResponseExt {
    $axios: AxiosResponse;
    $hydra?: any;
}

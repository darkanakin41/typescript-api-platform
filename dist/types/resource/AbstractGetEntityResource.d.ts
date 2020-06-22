import { AxiosInstance, CancelTokenSource } from 'axios';
import AbstractResource from './AbstractResource';
import AxiosResponseExt from '../model/AxiosResponseExt';
export default abstract class AbstractGetEntityResource<T, K> extends AbstractResource {
    private prefix;
    constructor(axios: AxiosInstance, prefix: string);
    getPath(id?: K): string;
    getIdPathRepresentation(id: K): string;
    get(id: K, cancelTokenSource?: CancelTokenSource): Promise<T & AxiosResponseExt>;
}

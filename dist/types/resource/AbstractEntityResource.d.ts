import { CancelTokenSource } from 'axios';
import AbstractGetEntityResource from './AbstractGetEntityResource';
import AxiosResponseExt from '../model/AxiosResponseExt';
export default abstract class AbstractEntityResource<T, K> extends AbstractGetEntityResource<T, K> {
    abstract getObjectId(object: T): K;
    getPathFromObject(object?: T): string;
    getFromObject(object: T): Promise<T & AxiosResponseExt>;
    list(cancelTokenSource?: CancelTokenSource): Promise<T[] & AxiosResponseExt>;
    create(object: T): Promise<T & AxiosResponseExt>;
    deleteFromObject(object: T): Promise<T & AxiosResponseExt>;
    delete(id: K): Promise<T & AxiosResponseExt>;
    update(object: T): Promise<T & AxiosResponseExt>;
}

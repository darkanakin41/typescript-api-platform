import { AxiosInstance, AxiosPromise } from 'axios';
/**
 * The basic comportment of a resource which access an API
 *
 * The Axios response stay available using the property `$axios`
 */
export default abstract class AbstractResource {
    protected axios: AxiosInstance;
    protected objectFactory?: (data: any) => any;
    constructor(axios: AxiosInstance, ObjectConstructor?: {
        new (): any;
    });
    protected wrapHydraItem(data: any): any & {
        $hydra: any;
    };
    protected wrapPromise(axiosPromise: AxiosPromise, objectFactory?: (data: any) => any): Promise<unknown>;
}

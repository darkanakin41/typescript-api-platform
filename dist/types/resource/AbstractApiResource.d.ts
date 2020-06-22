import AbstractResource from './AbstractResource';
import AxiosResponseExt from '../model/AxiosResponseExt';
import GetOptions from '../model/GetOptions';
import GetOneOptions from '../model/GetOneOptions';
export default abstract class AbstractApiResource<ResponseType, InputType = Partial<ResponseType>> extends AbstractResource {
    abstract readonly prefix: string;
    private loadProps;
    private buildSearch;
    private loadSearches;
    private loadSort;
    private loadPage;
    private buildParams;
    private buildUrl;
    private preProcessData;
    count<GetResponseType = ResponseType>(options?: GetOptions): Promise<number & AxiosResponseExt>;
    getAll<GetResponseType = ResponseType>(options?: GetOptions): Promise<GetResponseType[] & AxiosResponseExt>;
    get<GetResponseType = ResponseType>(options?: GetOptions): Promise<GetResponseType[] & AxiosResponseExt>;
    getOne<GetResponseType = ResponseType>(id: number | string, options?: GetOneOptions): Promise<GetResponseType & AxiosResponseExt>;
    post<PostInputType = InputType, PostResponseType = ResponseType>(item: PostInputType, options?: GetOneOptions): Promise<PostResponseType & AxiosResponseExt>;
    delete<DeleteResponseType = ResponseType>(id: number | string, options?: GetOneOptions): Promise<ResponseType & AxiosResponseExt>;
    put<PutInputType = InputType, PutResponseType = ResponseType>(id: number | string, item: PutInputType, options?: GetOneOptions): Promise<PutResponseType & AxiosResponseExt>;
    patch<PatchInputType = InputType, PatchResponseType = ResponseType>(id: number | string, item: PatchInputType, options?: GetOneOptions): Promise<PatchResponseType & AxiosResponseExt>;
}

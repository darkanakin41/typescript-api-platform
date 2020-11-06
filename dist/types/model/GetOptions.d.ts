import Page from './Page';
import ApiSearch from './ApiSearch';
import ApiSort from './ApiSort';
import GetOneOptions from './GetOneOptions';
export default interface GetOptions extends GetOneOptions {
    page?: Page;
    searches?: ApiSearch[];
    sort?: ApiSort;
}

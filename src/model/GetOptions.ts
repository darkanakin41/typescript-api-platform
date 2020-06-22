import { GetOneOptions } from '@/service/api-platform/model/GetOneOptions'
import Page from '@/service/api-platform/model/Page'
import ApiSearch from '@/service/api-platform/model/ApiSearch'
import ApiSort from '@/service/api-platform/model/ApiSort'

export interface GetOptions extends GetOneOptions {
  page?: Page
  searches?: ApiSearch[]
  sort?: ApiSort
}

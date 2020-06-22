import { AxiosInstance } from 'axios'
import IdData from '../model/IdData'
import AbstractDataResource from './AbstractDataResource'

export default class DefaultDataResource<T extends IdData<any>> extends AbstractDataResource<T> {
  constructor(axios: AxiosInstance, dataName: string) {
    super(axios, dataName)
  }
}

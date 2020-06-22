/**
 * `field` property is the API Plaftorm prop where the order is applied
 * `desc` property toggle the way to order the results (desc or asc)
 * ?order[property]=<asc|desc>
 */
export default interface ApiSort {
  field: string
  desc: boolean
}

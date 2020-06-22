/**
 * Type property is a syntax for filter the field in API Platform
 * Example for datefilter use after, before, strictly_after, strictly_before
 * @see https://api-platform.com/docs/core/filters/#date-filter
 */
export default interface ApiSearch {
    field: string;
    query: string | number | string[] | number[];
    type?: string;
}

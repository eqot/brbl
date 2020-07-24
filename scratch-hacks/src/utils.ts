import queryString from 'query-string'

export function getQueries(): any {
  return queryString.parse(location.search)
}

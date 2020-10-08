import { getQueries } from './utils'

export function isFullScreen() {
  const queries = getQueries()

  return queries.fullscreen
}

import queryString from 'query-string'

export function getQueries(): any {
  return queryString.parse(location.search)
}

export async function fetchFile(url: string): Promise<any> {
  if (url.startsWith('https://github.com/')) {
    url = url.replace(
      /https:\/\/github.com\/(.+)\/(.+)\/(raw|blob)\/(.+)/,
      'https://raw.githubusercontent.com/$1/$2/$4'
    )
  }

  const request = new Request(url, { mode: 'cors' })

  let response
  try {
    response = await fetch(request)
  } catch (e) {}

  return response
}

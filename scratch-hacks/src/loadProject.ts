import base64js from 'base64-js'

import { getQueries } from './utils'

export async function loadProject(): Promise<ArrayBuffer | void> {
  const queries = getQueries()

  if (queries.prj) {
    return loadProjectByUrl(queries.prj)
  }

  if (queries.prj64) {
    return loadBase64ProjectInUrl(queries.prj64)
  }
}

async function loadProjectByUrl(url: string): Promise<ArrayBuffer | void> {
  const request = new Request(url, { mode: 'cors' })

  const response = await fetch(request)
  if (!response.ok) {
    return
  }

  const buffer = await response.arrayBuffer()

  return buffer
}

function loadBase64ProjectInUrl(base64): ArrayBuffer {
  const { buffer } = base64js.toByteArray(base64) as Uint8Array

  return buffer
}

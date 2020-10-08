import uid from 'scratch-vm/src/util/uid'

export function isEnabled(): boolean {
  return true
}

export function getBackpackContents({ host, username, token, limit, offset }) {
  return new Promise(resolve => {
    const ids = JSON.parse(localStorage.getItem('backpack_ids') || '[]')

    resolve(ids.map(id => loadFromLocalStorage(id)))
  })
}

export function saveBackpackObject({
  host,
  username,
  token,
  type, // Type of object being saved to the backpack
  mime, // Mime-type of the object being saved
  name, // User-facing name of the object being saved
  body, // Base64-encoded body of the object being saved
  thumbnail, // Base64-encoded JPEG thumbnail of the object being saved
}) {
  const id = saveToLocalStorage(type, mime, name, body, thumbnail)

  return new Promise(resolve => {
    resolve(loadFromLocalStorage(id))
  })
}

function saveToLocalStorage(type, mime, name, body, thumbnail): string {
  const id = uid()

  const ids = JSON.parse(localStorage.getItem('backpack_ids') || '[]')
  ids.push(id)
  localStorage.setItem('backpack_ids', JSON.stringify(ids))

  localStorage.setItem(`backpack_${id}_type`, type)
  localStorage.setItem(`backpack_${id}_mime`, mime)
  localStorage.setItem(`backpack_${id}_name`, name)
  localStorage.setItem(`backpack_${id}_body`, `data:${mime};base64,${body}`)
  localStorage.setItem(`backpack_${id}_thumbnail`, `data:image/jpeg;base64,${thumbnail}`)

  return id
}

function loadFromLocalStorage(id: string): any {
  const type = localStorage.getItem(`backpack_${id}_type`)
  const mime = localStorage.getItem(`backpack_${id}_mime`)
  const name = localStorage.getItem(`backpack_${id}_name`)
  const body = localStorage.getItem(`backpack_${id}_body`)
  const thumbnail = localStorage.getItem(`backpack_${id}_thumbnail`)

  return {
    id,
    type,
    mime,
    name,
    body,
    thumbnail,
    bodyUrl: body,
    thumbnailUrl: thumbnail,
  }
}

export function deleteBackpackObject({ host, username, token, id }) {
  localStorage.removeItem(`backpack_${id}_type`)
  localStorage.removeItem(`backpack_${id}_mime`)
  localStorage.removeItem(`backpack_${id}_name`)
  localStorage.removeItem(`backpack_${id}_body`)
  localStorage.removeItem(`backpack_${id}_thumbnail`)

  const ids = JSON.parse(localStorage.getItem('backpack_ids') || '[]')
  const filteredIds = ids.filter(i => i !== id)
  localStorage.setItem('backpack_ids', JSON.stringify(filteredIds))

  return new Promise(resolve => {
    resolve('"ok": "true"')
  })
}

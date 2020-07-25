import { getQueries, fetchFile } from './utils'

if (!window.loadedExtensions) {
  window.loadedExtensions = new Map()
}

export async function loadExtension(vm: any) {
  const queries = getQueries()
  if (!queries.ext) {
    return
  }

  const { extensionManager } = vm

  const extensionUrls = Array.isArray(queries.ext) ? queries.ext : [queries.ext]
  for (const extensionUrl of extensionUrls) {
    // await vm.extensionManager.loadExtensionURL(extensionUrl)

    // TODO: The following code should be replace with loadExtensionURL().
    // However, loadExtensionURL() seems not to be work as expected because of the issue
    // of https://github.com/LLK/scratch-vm/issues/1125. So, as a workaround, this uses
    // _registerInternalExtension() to bypass the issue.

    const response = await fetchFile(extensionUrl)
    if (!response.ok) {
      return
    }

    const code = await response.text()
    // console.log(code)

    const module = eval(code)
    if (!module) {
      return
    }

    const extension = module.default || module
    if (typeof extension !== 'function') {
      return
    }

    const extensionInstance = new extension(extensionManager.runtime)
    const serviceName = extensionManager._registerInternalExtension(extensionInstance)
    extensionManager._loadedExtensions.set(extensionUrl, serviceName)

    window.loadedExtensions.set(extensionInstance.getInfo().id, extensionInstance)
  }
}

export function isExtensionLoaded(extensionUrl: string) {
  return window.loadedExtensions.has(extensionUrl)
}

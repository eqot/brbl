import { getQueries, fetchFile } from './utils'

if (!window.loadedExtensions) {
  window.loadedExtensions = new Map()
}

export async function loadExtension(vm: any, url?: string) {
  const extensionUrls = [getQueries().ext || url].flat()
  if (extensionUrls.length === 0 || !extensionUrls[0]) {
    return
  }

  const { extensionManager } = vm

  for (const extensionUrl of extensionUrls) {
    if (isExtensionLoaded(extensionUrl, vm)) {
      continue
    }

    // await vm.extensionManager.loadExtensionURL(extensionUrl)

    // TODO: The following code should be replace with loadExtensionURL().
    // However, loadExtensionURL() seems not to be work as expected because of the issue
    // of https://github.com/LLK/scratch-vm/issues/1125. So, as a workaround, this uses
    // _registerInternalExtension() to bypass the issue.

    const response = await fetchFile(extensionUrl)
    if (!response || !response.ok) {
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

    const extensionInstance = new extension(extensionManager.runtime, vm.getLocale())
    const serviceName = extensionManager._registerInternalExtension(extensionInstance)
    extensionManager._loadedExtensions.set(extensionUrl, serviceName)

    window.loadedExtensions.set(extensionInstance.getInfo().id, extensionInstance)
  }
}

export function isExtensionLoaded(extensionUrl: string, vm: any) {
  return (
    window.loadedExtensions.has(extensionUrl) ||
    (vm && vm.extensionManager && vm.extensionManager.isExtensionLoaded(extensionUrl))
  )
}

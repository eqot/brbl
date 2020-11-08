import { getQueries, fetchFile } from './utils'
import { Configuration } from './configuration'

if (!window.loadedExtensions) {
  window.loadedExtensions = new Map()
}

export const presetExtensions = Configuration.presetExtensions
  .map(extension => typeof extension.getInfoForGui === 'function' && extension.getInfoForGui())
  .filter(extensionInfo => extensionInfo !== null)

export async function loadPresetExtensions(vm: any, url?: string) {
  for (const extension of Configuration.presetExtensions) {
    doLoadExtension(vm, extension)
  }
}

export async function loadExtension(vm: any, url?: string) {
  const extensionUrls = [getQueries().ext || url].flat()
  if (extensionUrls.length === 0 || !extensionUrls[0]) {
    return
  }

  for (const extensionUrl of extensionUrls) {
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

    doLoadExtension(vm, extension)
  }
}

function doLoadExtension(vm, extension): void {
  const { extensionManager } = vm

  const extensionInstance = new extension(extensionManager.runtime, vm.getLocale())
  const id = extensionInstance.getInfo().id

  if (isExtensionLoaded(id, vm)) {
    return
  }

  const serviceName = extensionManager._registerInternalExtension(extensionInstance)
  extensionManager._loadedExtensions.set(id, serviceName)

  window.loadedExtensions.set(id, extensionInstance)
}

export function isExtensionLoaded(id: string, vm?: any) {
  return (
    window.loadedExtensions.has(id) ||
    (vm && vm.extensionManager && vm.extensionManager.isExtensionLoaded(id))
  )
}

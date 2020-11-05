import base64js from 'base64-js'
import scratchParser from 'scratch-parser'
import updateBlockIds from 'scratch-vm/src/util/new-block-ids'

import { Configuration } from './configuration'
import { getQueries, fetchFile } from './utils'

export async function loadProject(): Promise<ArrayBuffer | void> {
  const queries = getQueries()

  if (queries.project) {
    return loadProjectByUrl(queries.project)
  }

  if (queries.project64) {
    return loadBase64ProjectInUrl(queries.project64)
  }
}

async function loadProjectByUrl(url: string): Promise<ArrayBuffer | void> {
  const response = await fetchFile(url)
  if (!response || !response.ok) {
    return
  }

  const buffer = await response.arrayBuffer()

  return buffer
}

function loadBase64ProjectInUrl(base64): ArrayBuffer {
  const { buffer } = base64js.toByteArray(base64) as Uint8Array

  return buffer
}

export function getDefaultProject() {
  if (!Configuration.defaultProject) {
    return
  }

  const base64string = Configuration.defaultProject.replace('data:;base64,', '')
  const { buffer } = base64js.toByteArray(base64string) as Uint8Array
  return buffer
}

export async function importFile(vm: any, url?: string): Promise<ArrayBuffer | void> {
  const fileUrl = getQueries().import || url
  if (!fileUrl) {
    return
  }

  const fileType = fileUrl.split('.').pop()
  switch (fileType) {
    case 'sb3':
      return await importSb3(vm, fileUrl)

    case 'json':
      return await importJson(vm, fileUrl)

    default:
      break
  }
}

async function importSb3(vm: any, url: string): Promise<ArrayBuffer | void> {
  const response = await fetchFile(url)
  if (!response.ok) {
    return
  }

  const buffer = await response.arrayBuffer()

  const [projectJson, zip] = await parseProject(buffer)
  const { targets, extensions } = await vm.deserializeProject3(projectJson, zip)
  // await vm.installTargets(targets, extensions, true)

  const editingTarget = vm.editingTarget //runtime.getEditingTarget()

  const blocks = targets[1].blocks._blocks
  const importingBlocks = []
  for (const key of Object.keys(blocks)) {
    const block = {
      ...blocks[key],
      id: key,
    }
    importingBlocks.push(block)
  }

  updateBlockIds(importingBlocks)

  for (const block of importingBlocks) {
    editingTarget.blocks.createBlock(block)
  }
  editingTarget.blocks.updateTargetSpecificBlocks(editingTarget.isStage)

  vm.refreshWorkspace()
}

function parseProject(buffer: ArrayBuffer): Promise<object> {
  return new Promise((resolve, reject) => {
    scratchParser(buffer, false, (error, project) => {
      if (error) {
        return reject(error)
      }

      resolve(project)
    })
  })
}

async function importJson(vm: any, url: string): Promise<ArrayBuffer | void> {
  const response = await fetchFile(url)
  if (!response.ok) {
    return
  }

  const data = await response.json()

  for (const type in data) {
    switch (type) {
      case 'list':
        createLists(vm, data[type])
        break

      default:
        break
    }
  }

  vm.refreshWorkspace()
}

function createLists(vm: any, lists): void {
  for (const listName in lists) {
    const list = vm.runtime.createNewGlobalVariable(listName, null, 'list')
    list.value = lists[listName]
    list.isCloud = false
  }
}

export function startProject(vm: any): void {
  const queries = getQueries()
  if (!queries.start) {
    return
  }

  vm.runtime.once('PROJECT_LOADED', () => {
    vm.greenFlag()
  })
}

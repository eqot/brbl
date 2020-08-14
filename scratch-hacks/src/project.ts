import base64js from 'base64-js'

import { getQueries, fetchFile } from './utils'

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
  const response = await fetchFile(url)
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

export async function importProject(vm: any): Promise<ArrayBuffer | void> {
  const queries = getQueries()
  if (!queries.import) {
    return
  }

  const response = await fetchFile(queries.import)
  if (!response.ok) {
    return
  }

  const buffer = await response.arrayBuffer()
  // console.log(buffer)

  const project = await vm.parseProject(buffer)
  // console.log(project)

  const { blocks } = project[0].targets[1]
  // console.log(blocks)

  const editingTarget = vm.editingTarget //runtime.getEditingTarget()
  // console.log(editingTarget)

  const importingBlocks = []
  for (const key of Object.keys(blocks)) {
    const block = {
      ...blocks[key],
      id: key
    }
    importingBlocks.push(block)
  }

  // console.log(importingBlocks)
  // vm.updateBlockIds(importingBlocks)
  // console.log(importingBlocks)

  console.log(editingTarget.blocks._blocks)
  for (const block of importingBlocks) {
    console.log(block)
    editingTarget.blocks.createBlock(block)
  }
  console.log(editingTarget.blocks._blocks)
  editingTarget.blocks.updateTargetSpecificBlocks(editingTarget.isStage)

  // vm.refreshWorkspace()
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

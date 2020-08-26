import base64js from 'base64-js'
import scratchParser from 'scratch-parser'
import updateBlockIds from 'scratch-vm/src/util/new-block-ids'

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

export async function importProject(vm: any, url?: string): Promise<ArrayBuffer | void> {
  const projectUrl = getQueries().import || url
  if (!projectUrl) {
    return
  }

  const response = await fetchFile(projectUrl)
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
      id: key
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

export function startProject(vm: any): void {
  const queries = getQueries()
  if (!queries.start) {
    return
  }

  vm.runtime.once('PROJECT_LOADED', () => {
    vm.greenFlag()
  })
}

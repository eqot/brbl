import React from 'react'
import ReactDOM from 'react-dom'

import { Menu, MenuItemProps } from './components/menu'

import { loadExtension } from './extension'
import { importProject } from './project'
import { canvas } from './canvas'

let initialized = false

const menuItems = vm => {
  return [
    {
      label: '拡張機能を読み込む',
      onClick: () => {
        const url = prompt('拡張機能を読み込む')
        loadExtension(vm, url)
      },
    },
    {
      label: 'プロジェクトを読み込む',
      onClick: () => {
        const url = prompt('プロジェクトを読み込む')
        importProject(vm, url)
      },
    },
    {
      label: 'キャプチャを開始する',
      onClick: () => {
        canvas.toggleCapture(vm)
      },
    },
  ]
}

export function injectMenu(vm: any) {
  if (initialized) {
    return
  }
  initialized = true

  vm.runtime.once('PROJECT_LOADED', () => {
    setTimeout(() => {
      const menuRoot = document.querySelectorAll('[class^=menu-bar_file-group_1]')[0]

      const menuItem = document.createElement('div')
      menuRoot.appendChild(menuItem)

      ReactDOM.render(<Menu items={menuItems(vm)} />, menuItem)
    }, 1000)
  })
}

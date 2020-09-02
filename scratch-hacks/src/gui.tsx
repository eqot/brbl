import React from 'react'
import ReactDOM from 'react-dom'

import { Menu } from './components/menu'

import { loadExtension } from './extension'
import { importProject } from './project'
import { CaptureMenu } from './stage'

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

      const menuItem2 = document.createElement('div')
      menuRoot.appendChild(menuItem2)

      ReactDOM.render(<CaptureMenu vm={vm} />, menuItem2)
    }, 1000)
  })
}

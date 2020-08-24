import React from 'react'
import ReactDOM from 'react-dom'

import { Menu, MenuItemProps } from './components/menu'

let initialized = false

const menuItems: MenuItemProps[] = [
  {
    label: '拡張機能を読み込む',
    onClick: () => {
      console.log('ext')
    }
  },
  {
    label: 'プロジェクトを読み込む',
    onClick: () => {
      console.log('prj')
    }
  }
]

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

      ReactDOM.render(<Menu items={menuItems} />, menuItem)
    }, 1000)
  })
}

import React from 'react'
import ReactDOM from 'react-dom'

import { HackMenu } from './containers/hackMenu'
import { CaptureMenu } from './containers/captureMenu'

export function injectMenu(vm: any) {
  vm.runtime.on('BLOCKSINFO_UPDATE', () => {
    doInjectMenu(vm)
  })
}

function doInjectMenu(vm: any) {
  const element = document.querySelector('.hack-menu')
  if (element) {
    return
  }

  const menuItem = document.createElement('div')
  ReactDOM.render(
    <>
      <HackMenu vm={vm} />
      <CaptureMenu vm={vm} />
    </>,
    menuItem
  )

  const menuRoot = document.querySelector('[class^=menu-bar_file-group_1]')
  for (const item of Array.from(menuItem.children)) {
    menuRoot.appendChild(item)
  }
}

import React from 'react'
import ReactDOM from 'react-dom'

import { HackMenu } from './containers/hackMenu'
import { CaptureMenu } from './containers/captureMenu'

let initialized = false

export function injectMenu(vm: any) {
  if (initialized) {
    return
  }
  initialized = true

  vm.runtime.once('PROJECT_LOADED', () => {
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
  })
}

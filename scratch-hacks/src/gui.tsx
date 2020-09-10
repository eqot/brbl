import React from 'react'
import ReactDOM from 'react-dom'
import Runtime from 'scratch-vm/src/engine/runtime'

import { HacksMenu } from './containers/hacksMenu'
import { CaptureMenu } from './containers/captureMenu'
import { translations } from './translations'

export function injectMenu(vm: any) {
  const element = document.querySelector('.hacks-menu')
  if (element) {
    return
  }

  vm.runtime.on(Runtime.RUNTIME_STARTED, () => doInjectMenu(vm))
  vm.runtime.on('LOCALE_CHANGED', () => doInjectMenu(vm))
}

function doInjectMenu(vm: any) {
  translations.initialize(vm.getLocale())

  const menuRoot = document.querySelector('[class^=menu-bar_file-group_1]')
  const menuItem = document.createElement('div')
  menuRoot.appendChild(menuItem)
  ReactDOM.render(<HacksMenu vm={vm} />, menuItem)

  const controlsRoot = document.querySelector('[class^=controls_controls-container]')
  const controlItem = document.createElement('div')
  controlsRoot.appendChild(controlItem)
  ReactDOM.render(<CaptureMenu vm={vm} />, controlItem)
}

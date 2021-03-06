import React from 'react'
import ReactDOM from 'react-dom'
import Runtime from 'scratch-vm/src/engine/runtime'

import { LabsMenu } from './containers/labsMenu'
import { CaptureMenu } from './containers/captureMenu'
import { translations } from './translations'
import { Configuration } from './configuration'
import { getQueries } from './utils'

export function modifyGui(vm: any) {
  // replace favicon
  const favicon = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;
  favicon.href = Configuration.favicon;

  // replace logo
  const originalLogo = document.querySelector('img[alt="Scratch"]') as HTMLImageElement;
  originalLogo.src = Configuration.logo;

  injectMenu(vm)
}

export function onClickLogoCustomized() {}

function injectMenu(vm: any) {
  const element = document.querySelector('.labs-menu')
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
  ReactDOM.render(<LabsMenu vm={vm} />, menuItem)

  const controlsRoot = document.querySelector('[class^=controls_controls-container]')
  const controlItem = document.createElement('div')
  controlsRoot.appendChild(controlItem)
  ReactDOM.render(<CaptureMenu vm={vm} />, controlItem)
}

export function isFullScreen() {
  const queries = getQueries()

  return queries.fullscreen
}

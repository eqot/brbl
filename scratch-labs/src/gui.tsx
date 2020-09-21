import React from 'react'
import ReactDOM from 'react-dom'
import Runtime from 'scratch-vm/src/engine/runtime'

import { LabsMenu } from './containers/labsMenu'
import { CaptureMenu } from './containers/captureMenu'
import { translations } from './translations'

import logo from '../assets/images/scratch-labs.svg'

export function modifyGui(vm: any, options: any) {
  replaceLogo()
  injectMenu(vm, options)
}

function replaceLogo() {
  const originalLogo = document.querySelector('img[alt="Scratch"]') as HTMLImageElement
  originalLogo.src = logo
}

export function onClickLogoForLabs() {}

function injectMenu(vm: any, options: any) {
  const element = document.querySelector('.labs-menu')
  if (element) {
    return
  }

  vm.runtime.on(Runtime.RUNTIME_STARTED, () => doInjectMenu(vm, options))
  vm.runtime.on('LOCALE_CHANGED', () => doInjectMenu(vm, options))
}

function doInjectMenu(vm: any, options: any) {
  translations.initialize(vm.getLocale())

  const menuRoot = document.querySelector('[class^=menu-bar_file-group_1]')
  const menuItem = document.createElement('div')
  menuRoot.appendChild(menuItem)
  ReactDOM.render(<LabsMenu vm={vm} options={options} />, menuItem)

  const controlsRoot = document.querySelector('[class^=controls_controls-container]')
  const controlItem = document.createElement('div')
  controlsRoot.appendChild(controlItem)
  ReactDOM.render(<CaptureMenu vm={vm} />, controlItem)
}

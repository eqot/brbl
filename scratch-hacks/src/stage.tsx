import React from 'react'

import { MenuItem } from './components/menuItem'

class Stage {
  private capturer = null

  constructor() {
    this.loadScript('static/ccapture/CCapture.all.min.js')
  }

  private loadScript(src: string): void {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
  }

  startCapture(vm: unknown) {
    if (this.capturer) {
      return
    }

    this.capturer = new CCapture({
      format: 'gif',
      workersPath: '/static/gif/',
    })

    this.capturer.start()

    vm.renderer.on('afterDraw', this.doCapture)
  }

  stopCapture(vm: unknown) {
    if (!this.capturer) {
      return
    }

    vm.renderer.off('afterDraw', this.doCapture)

    this.capturer.stop()
    this.capturer.save()
    this.capturer = null
  }

  private doCapture = (canvas: HTMLCanvasElement) => {
    this.capturer.capture(canvas)
  }
}

type Props = {
  vm: object
}

const CaptureMenu: React.FC<Props> = props => {
  const stage = new Stage()

  const handleClick = (isActive: boolean) => {
    if (isActive) {
      stage.startCapture(props.vm)
    } else {
      stage.stopCapture(props.vm)
    }
  }

  return <MenuItem label="キャプチャ開始" labelInActive="キャプチャ停止" onClick={handleClick} />
}

export { CaptureMenu }

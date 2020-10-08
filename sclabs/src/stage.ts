import { CanvasRecord } from 'canvas-record'

class Stage {
  private recorder?: CanvasRecord

  startCapture(vm: any) {
    if (this.recorder) {
      return
    }
    this.recorder = new CanvasRecord()

    vm.renderer.on('afterDraw', this.doCapture)
  }

  stopCapture(vm: any) {
    if (!this.recorder) {
      return
    }

    vm.renderer.off('afterDraw', this.doCapture)

    this.recorder.stop()
    this.recorder = null
  }

  private doCapture = (canvas: HTMLCanvasElement) => {
    if (!this.recorder) {
      return
    }

    this.recorder.capture(canvas)
  }
}

const stage = new Stage()
export { stage }

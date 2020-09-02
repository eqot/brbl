class Canvas {
  private capturer = null

  constructor() {
    this.loadScript('static/ccapture/CCapture.all.min.js')
  }

  private loadScript(src: string): void {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
  }

  toggleCapture(vm): void {
    if (!this.capturer) {
      this.startCapture(vm)
    } else {
      this.stopCapture(vm)
    }
  }

  private startCapture(vm) {
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

  private stopCapture(vm) {
    if (!this.capturer) {
      return
    }

    vm.renderer.off('afterDraw', this.doCapture)

    this.capturer.stop()
    this.capturer.save()
    this.capturer = null
  }

  private doCapture = canvas => {
    this.capturer.capture(canvas)
  }
}

const canvas = new Canvas()
export { canvas }

class Stage {
  private capturer = null

  private framerate = 20
  private readyToCapture = false
  private timer

  constructor() {
    this.loadScript('static/ccapture/CCapture.all.min.js')
  }

  private loadScript(src: string): void {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
  }

  startCapture(vm: any) {
    if (this.capturer) {
      return
    }

    this.capturer = new CCapture({
      format: 'gif',
      workersPath: 'static/gif/',
      framerate: this.framerate,
    })

    this.timer = setInterval(() => {
      this.readyToCapture = true
    }, 1000 / this.framerate)
    this.readyToCapture = true

    this.capturer.start()

    vm.renderer.on('afterDraw', this.doCapture)
  }

  stopCapture(vm: any) {
    if (!this.capturer) {
      return
    }

    vm.renderer.off('afterDraw', this.doCapture)

    this.capturer.stop()
    this.capturer.save()
    this.capturer = null

    clearInterval(this.timer)
    this.timer = null
  }

  private doCapture = (canvas: HTMLCanvasElement) => {
    if (this.readyToCapture) {
      this.capturer.capture(canvas)

      this.readyToCapture = false
    }
  }
}

const stage = new Stage()
export { stage }

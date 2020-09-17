import GIF from 'gif.js'
import download from 'downloadjs'

type Options = {
  framerate?: number
  width?: number
  height?: number
}

export class CanvasRecord {
  private gif: GIF

  private isResized = false
  private canvas?: HTMLCanvasElement
  private context?: any
  private width = 0
  private height = 0

  private requestToCapture = false
  private step = 0
  private timer

  constructor(options?: Options) {
    this.gif = new GIF({
      workers: navigator.hardwareConcurrency || 4,
      workerScript: 'static/gif/gif.worker.js',
    })
    this.gif.on('progress', this.onProgress)
    this.gif.on('finished', this.onFinished)

    if (options && (options.width || options.height)) {
      this.isResized = true

      this.canvas = document.createElement('canvas')
      this.context = this.canvas.getContext('2d')
      this.width = options.width
      this.height = options.height
    } else {
      this.isResized = false
    }

    const framerate = (options && options.framerate) || 30
    this.step = 1000 / framerate

    this.timer = setInterval(() => {
      this.requestToCapture = true
    }, this.step)
    this.requestToCapture = true
  }

  stop() {
    if (!this.gif) {
      return
    }

    this.gif.render()
  }

  capture(canvas: HTMLCanvasElement) {
    if (!this.gif || !this.requestToCapture) {
      return
    }

    const frameOptions = { copy: true, delay: this.step }

    if (this.isResized) {
      if (!this.width || !this.height) {
        if (!this.height) {
          this.height = (this.width * canvas.height) / canvas.width
        } else if (!this.width) {
          this.width = (this.height * canvas.width) / canvas.height
        }

        this.canvas.width = this.width
        this.canvas.height = this.height
      }

      // prettier-ignore
      this.context.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        0, 0, this.width,   this.height
      )

      this.gif.addFrame(this.canvas, frameOptions)
    } else {
      this.gif.addFrame(canvas, frameOptions)
    }

    this.requestToCapture = false
  }

  private onProgress = progress => {
    // console.log(progress)
  }

  private onFinished = blob => {
    const fileName = Date.now()
    download(blob, `${fileName}.gif`, 'image/gif')

    this.destroy()
  }

  private destroy(): void {
    if (this.gif) {
      this.gif.removeAllListeners()
      this.gif = null
    }

    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    this.canvas = null
    this.context = null
  }
}

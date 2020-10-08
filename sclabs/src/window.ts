const TITLE = 'ScLabs Stage'
const Stage = {
  WIDTH: 960,
  HEIGHT: 720,
}

export function openWindowForStage(vm: any) {
  const win = window.open(
    '',
    TITLE,
    `width=${Stage.WIDTH},height=${Stage.HEIGHT},menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no`,
    false
  )

  win.document.title = TITLE

  const style = win.document.createElement('style')
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
    }
  `
  win.document.head.append(style)

  const canvas = win.document.createElement('canvas')
  canvas.width = 960
  canvas.height = 720
  win.document.body.appendChild(canvas)

  const context = canvas.getContext('2d')

  const copyCanvas = (srcCanvas: HTMLCanvasElement) => {
    context.drawImage(srcCanvas, 0, 0)
  }

  vm.renderer.on('afterDraw', copyCanvas)

  window.addEventListener('unload', () => {
    vm.renderer.off('afterDraw', copyCanvas)

    win.close()
  })
}

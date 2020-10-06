import computedStyleToInlineStyle from 'computed-style-to-inline-style'
import download from 'downloadjs'

const IMAGE_URL_REPLACE_FROM = './static/blocks-media/'
const IMAGE_URL_REPLACE_TO = 'https://eqot.github.io/sclabs/static/blocks-media/'

const TARGET_SELECTORS = ['.blocklyBlockCanvas', '.blocklyBubbleCanvas']
const INJECTED_STYLES = [
  'fill',
  'fill-opacity',
  'font-family',
  'font-size',
  'font-weight',
  'background-color',
  'margin',
  'padding',
  'border',
  'resize',
  'overflow',
  'stroke',
  'filter',
]

const XLINK = 'http://www.w3.org/1999/xlink'

export async function saveBlocksAsSvg(vm: any) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  document.body.appendChild(svg)

  const svgDefs = document.querySelector('svg.blocklySvg > defs').cloneNode(true)
  svg.appendChild(svgDefs)

  let xMin = 10000
  let xMax = 0
  let yMin = 10000
  let yMax = 0

  for (const selector of TARGET_SELECTORS) {
    const blockSvg = document.querySelector(selector).cloneNode(true)
    if (!blockSvg) {
      continue
    }

    blockSvg.setAttribute('transform', `translate(${0} ${0})`)
    svg.appendChild(blockSvg)

    const rect = blockSvg.getBBox()
    if (rect.width > 0 && rect.height > 0) {
      xMin = Math.min(xMin, rect.x)
      xMax = Math.max(xMax, rect.x + rect.width)
      yMin = Math.min(yMin, rect.y)
      yMax = Math.max(yMax, rect.y + rect.height)
    }
  }

  const x = xMin
  const y = yMin
  const width = xMax - xMin
  const height = yMax - yMin

  svg.setAttribute('width', `${width}`)
  svg.setAttribute('height', `${height}`)
  svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)

  computedStyleToInlineStyle(svg, {
    recursive: true,
    properties: INJECTED_STYLES,
  })

  modifyNodes(svg, {
    // Add comment texts which is value of textarea
    textarea: node => {
      node.innerText = node.value
    },

    // Replace image source from relative URL to absolute URL
    image: node => {
      const url = node.getAttributeNS(XLINK, 'href')
      const replacedUrl = url.replace(IMAGE_URL_REPLACE_FROM, IMAGE_URL_REPLACE_TO)
      node.setAttributeNS(XLINK, 'href', replacedUrl)
    },
  })

  const svgString = new XMLSerializer().serializeToString(svg)
  // const image = `data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`
  const image2 =
    'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgString)))

  document.body.removeChild(svg)

  const fileName = Date.now()
  download(image2, `${fileName}.svg`, 'image/svg+xml')

  // convertSVGtoPNG(image2, width, height)
}

function modifyNodes(node, modifiers: any) {
  const modifier = modifiers[node.localName]
  if (modifier) {
    modifier(node)
  }

  for (const child of node.childNodes) {
    modifyNodes(child, modifiers)
  }
}

function convertSVGtoPNG(dataUrl: string, width: number, height: number) {
  // console.log(dataUrl, width, height)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  const image = new Image()
  image.onload = () => {
    // context.drawImage(image, 0, 0, image.width, image.height)
    context.drawImage(image, 0, 0)
    const imageData = canvas.toDataURL('image/png')
    // console.log(imageData)

    download(imageData, 'foo.png', 'image/png')
  }
  image.src = dataUrl
}

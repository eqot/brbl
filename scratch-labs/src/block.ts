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
]

const XLINK = 'http://www.w3.org/1999/xlink'

export async function saveBlocksAsSvg(vm: any) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  document.body.appendChild(svg)

  for (const selector of TARGET_SELECTORS) {
    const blockSvg = document.querySelector(selector).cloneNode(true)
    if (blockSvg) {
      svg.appendChild(blockSvg)
    }
  }

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
  const image = `data:image/svg+xml;utf-8,${encodeURIComponent(svgString)}`

  document.body.removeChild(svg)

  const fileName = Date.now()
  download(image, `${fileName}.svg`, 'image/svg+xml')
}

function modifyNodes(node, modifiers: any) {
  const func = modifiers[node.localName]
  if (func) {
    func(node)
  }

  for (const child of node.childNodes) {
    modifyNodes(child, modifiers)
  }
}

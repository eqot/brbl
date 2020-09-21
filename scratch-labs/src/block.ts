import download from 'downloadjs'

const URL_REPLACE_FROM = '/static/blocks-media'
const URL_REPLACE_TO = 'https://eqot.github.io/sclabs/static/blocks-media/'

export async function saveAsSvg(vm: any, blockToImage: any) {
  const blocks = vm.runtime.getEditingTarget().blocks._blocks
  const blockId = Object.keys(blocks)[0]

  const image = await blockToImage(blockId)

  const urlReplaceFrom = new RegExp('\\.' + encodeURIComponent(URL_REPLACE_FROM), 'g')
  const replacedImage = image.replace(urlReplaceFrom, encodeURIComponent(URL_REPLACE_TO))

  const fileName = Date.now()
  download(replacedImage, `${fileName}.svg`, 'image/svg+xml')
}

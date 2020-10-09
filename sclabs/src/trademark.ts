// Scratch trademarks are defined at https://github.com/LLK/scratch-gui/blob/develop/TRADEMARK.
const SCRATCH_SPRITE_NAMES = [
  'Cat',
  'Cat Flying',
  'Gobo',
  'Pico',
  'Pico Walking',
  'Nano',
  'Tera',
  'Giga',
  'Giga Walking',
]

const SCRATCH_COSTUME_NAMES = [
  'Cat-',
  'Cat Flying-',
  'Gobo-',
  'Pico-',
  'Pico Walk',
  'Nano-',
  'Tera-',
  'Giga-',
  'Giga Walk',
]

export function removeTrademarkFromAssets(assets: any[]): any[] {
  return assets.filter((asset: any) => {
    switch (asset.type) {
      case 'sprite':
        return !SCRATCH_SPRITE_NAMES.includes(asset.name)

      case 'costume':
        return !SCRATCH_COSTUME_NAMES.some((costumeName: string) =>
          asset.name.startsWith(costumeName)
        )

      default:
        return true
    }
  })
}

export function removeTrademarkFromLabel(label: string): string {
  return label.replace(/\s?Scratch[\sの]?/g, '')
}

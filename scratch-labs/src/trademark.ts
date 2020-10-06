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

export function removeTrademarks(assets: any[]) {
  return assets.filter((asset: any) => {
    return (
      !SCRATCH_SPRITE_NAMES.includes(asset.name) &&
      !SCRATCH_COSTUME_NAMES.some((costumeName: string) => asset.name.startsWith(costumeName))
    )
  })
}

import React from 'react'

import { MenuItem, MenuItem2ndLayer } from '../components/menuItem'
import { loadExtension } from '../extension'
import { importFile } from '../project'
import { translations } from '../translations'

const DEFAULT_URL = 'https://'

const MENU_ITEMS = (vm: any) => [
  {
    label: translations.label('Load extension', { ellipsis: true }),
    onClick: () => {
      const url = prompt(translations.label('URL for extension to be loaded'), DEFAULT_URL)
      loadExtension(vm, url)
    },
  },
  {
    label: translations.label('Load file', { ellipsis: true }),
    onClick: () => {
      const url = prompt(translations.label('URL for file to be loaded'), DEFAULT_URL)
      importFile(vm, url)
    },
  },
]

const LabsMenu: React.FC<{ vm: any }> = props => (
  <MenuItem
    label={translations.label('Labs')}
    className="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB labs-menu"
  >
    {MENU_ITEMS(props.vm).map(item => (
      <MenuItem2ndLayer label={item.label} onClick={item.onClick} key={item.label} />
    ))}
  </MenuItem>
)

export { LabsMenu }

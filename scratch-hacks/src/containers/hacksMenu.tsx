import React from 'react'

import { MenuItem, MenuItem2ndLayer } from '../components/menuItem'
import { loadExtension } from '../extension'
import { importFile } from '../project'
import { translations } from '../translations'

const DEFAULT_URL = 'https://'

const MENU_ITEMS = (vm: any) => [
  {
    label: translations.label('Load extension'),
    onClick: () => {
      const url = prompt(translations.label('Load extension'), DEFAULT_URL)
      loadExtension(vm, url)
    },
  },
  {
    label: translations.label('Load file'),
    onClick: () => {
      const url = prompt(translations.label('URL for file to be loaded'), DEFAULT_URL)
      importFile(vm, url)
    },
  },
]

const HacksMenu: React.FC<{ vm: any }> = props => (
  <MenuItem label={translations.label('Hacks')} className="hacks-menu">
    {MENU_ITEMS(props.vm).map(item => (
      <MenuItem2ndLayer label={item.label} onClick={item.onClick} key={item.label} />
    ))}
  </MenuItem>
)

export { HacksMenu }

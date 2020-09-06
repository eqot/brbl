import React from 'react'

import { MenuItem, MenuItem2ndLayer } from '../components/menuItem'
import { loadExtension } from '../extension'
import { importProject } from '../project'
import { translations } from '../translations'

const MENU_ITEMS = (vm: any) => [
  {
    label: translations.label('Load extension'),
    onClick: () => {
      const url = prompt(translations.label('Load extension'))
      loadExtension(vm, url)
    },
  },
  {
    label: translations.label('Load project'),
    onClick: () => {
      const url = prompt(translations.label('Load project'))
      importProject(vm, url)
    },
  },
]

const HackMenu: React.FC<{ vm: any }> = props => (
  <MenuItem label={translations.label('Hack')} className="hack-menu">
    {MENU_ITEMS(props.vm).map(item => (
      <MenuItem2ndLayer label={item.label} onClick={item.onClick} key={item.label} />
    ))}
  </MenuItem>
)

export { HackMenu }

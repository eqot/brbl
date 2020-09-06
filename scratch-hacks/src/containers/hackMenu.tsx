import React from 'react'

import { MenuItem, MenuItem2ndLayer } from '../components/menuItem'
import { loadExtension } from '../extension'
import { importProject } from '../project'

const MENU_ITEMS = (vm: any) => [
  {
    label: '拡張機能を読み込む',
    onClick: () => {
      const url = prompt('拡張機能を読み込む')
      loadExtension(vm, url)
    },
  },
  {
    label: 'プロジェクトを読み込む',
    onClick: () => {
      const url = prompt('プロジェクトを読み込む')
      importProject(vm, url)
    },
  },
]

const HackMenu: React.FC<{ vm: any }> = props => (
  <MenuItem label="ハック" className="hack-menu">
    {MENU_ITEMS(props.vm).map(item => (
      <MenuItem2ndLayer label={item.label} onClick={item.onClick} key={item.label} />
    ))}
  </MenuItem>
)

export { HackMenu }

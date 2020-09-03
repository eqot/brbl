import React from 'react'

import { MenuItem } from '../components/menuItem'
import { stage } from '../stage'
import './captureMenu.css'

const CaptureMenu: React.FC<{ vm: any }> = props => {
  const handleClick = (isActive: boolean) => {
    if (isActive) {
      stage.startCapture(props.vm)
    } else {
      stage.stopCapture(props.vm)
    }
  }

  return (
    <MenuItem
      label={<span>キャプチャ</span>}
      labelInActive={<span className="active">キャプチャ</span>}
      onClick={handleClick}
    />
  )
}

export { CaptureMenu }

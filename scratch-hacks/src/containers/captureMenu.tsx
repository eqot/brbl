import React from 'react'

import { MenuItem } from '../components/menuItem'
import { stage } from '../stage'
import './captureMenu.css'
import { translations } from '../translations'

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
      label={<span id="capture">{translations.label('Capture')}</span>}
      labelInActive={
        <span id="capture" className="active">
          {translations.label('Capture')}
        </span>
      }
      onClick={handleClick}
    />
  )
}

export { CaptureMenu }

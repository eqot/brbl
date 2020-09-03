import React from 'react'

import { MenuItem } from '../components/menuItem'
import { stage } from '../stage'

const CaptureMenu: React.FC<{ vm: any }> = props => {
  const handleClick = (isActive: boolean) => {
    if (isActive) {
      stage.startCapture(props.vm)
    } else {
      stage.stopCapture(props.vm)
    }
  }

  return <MenuItem label="キャプチャ開始" labelInActive="キャプチャ停止" onClick={handleClick} />
}

export { CaptureMenu }

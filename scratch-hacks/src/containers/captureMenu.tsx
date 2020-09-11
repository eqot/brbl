import React, { useState } from 'react'

import { stage } from '../stage'
import './captureMenu.css'

import icon from '../../assets/images/record.svg'

const CaptureMenu: React.FC<{ vm: any }> = props => {
  const [isActive, setActive] = useState(false)

  const handleClick = () => {
    if (!isActive) {
      stage.startCapture(props.vm)
    } else {
      stage.stopCapture(props.vm)
    }

    setActive(!isActive)
  }

  const style = {
    padding: '5px',
  }

  return (
    <img
      id="canvas-record"
      className={isActive ? 'active' : ''}
      src={icon}
      width={32}
      height={32}
      style={style}
      onClick={handleClick}
    />
  )
}

export { CaptureMenu }

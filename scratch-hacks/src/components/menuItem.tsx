import React, { useState } from 'react'

type Props = {
  label: string
  labelInActive?: string
  onClick?: (boolean) => void
  children?
}

const MenuItem: React.FC<Props> = props => {
  const [isActive, setActive] = useState(false)

  return (
    <div
      className="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB"
      onClick={() => {
        if (props.onClick) {
          props.onClick(!isActive)
        }

        setActive(!isActive)
      }}
    >
      <div>
        <span>{isActive ? props.labelInActive || props.label : props.label}</span>
      </div>

      {isActive && props.children}
    </div>
  )
}

export { MenuItem }

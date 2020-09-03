import React, { useState } from 'react'

type MenuItemProps = {
  label: string
  labelInActive?: string
  onClick?: (boolean) => void
  children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = props => {
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

      {isActive && props.children && (
        <div className="menu-bar_menu-bar-menu_239MD">
          <ul className="menu_menu_3k7QT menu_right_3PQ4S">{props.children}</ul>
        </div>
      )}
    </div>
  )
}

const MenuItem2ndLayer: React.FC<MenuItemProps> = props => {
  return (
    <li className="menu_menu-item_3EwYA menu_hoverable_3u9dt" onClick={props.onClick}>
      <span>{props.label}</span>
    </li>
  )
}

export { MenuItem, MenuItem2ndLayer }

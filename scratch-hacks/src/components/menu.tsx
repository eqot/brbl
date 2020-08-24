import React, { useState } from 'react'

type MenuProps = {
  items: MenuItemProps[]
}

const Menu: React.FC<MenuProps> = props => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>
        <span>ハック</span>
      </div>

      {isOpen && (
        <div className="menu-bar_menu-bar-menu_239MD">
          <ul className="menu_menu_3k7QT menu_right_3PQ4S">
            {props.items.map(item => (
              <MenuItem label={item.label} onClick={item.onClick} key={item.label} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export type MenuItemProps = {
  label: string
  onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = props => {
  return (
    <li className="menu_menu-item_3EwYA menu_hoverable_3u9dt" onClick={props.onClick}>
      <span>{props.label}</span>
    </li>
  )
}

export { Menu }

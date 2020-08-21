import React from 'react'
import ReactDOM from 'react-dom'

let initialized = false

type MenuItemType = {
  label: string
  onClick: () => void
}

const menuItems: MenuItemType[] = [
  {
    label: '拡張機能を読み込む',
    onClick: () => {
      console.log('ext')
    }
  },
  {
    label: 'プロジェクトを読み込む',
    onClick: () => {
      console.log('prj')
    }
  }
]

class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  render() {
    return (
      <div
        className="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB"
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      >
        <div>
          <span>ハック</span>
        </div>

        {this.state.isOpen && <MenuItems items={menuItems} />}
      </div>
    )
  }
}

class MenuItems extends React.Component {
  render() {
    return (
      <div className="menu-bar_menu-bar-menu_239MD">
        <ul className="menu_menu_3k7QT menu_right_3PQ4S">
          {this.props.items.map(item => (
            <MenuItem label={item.label} onClick={item.onClick} key={item.label} />
          ))}
        </ul>
      </div>
    )
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <li className="menu_menu-item_3EwYA menu_hoverable_3u9dt" onClick={this.props.onClick}>
        <span>{this.props.label}</span>
      </li>
    )
  }
}

export function addMenu(vm: any) {
  if (initialized) {
    return
  }
  initialized = true

  vm.runtime.once('PROJECT_LOADED', () => {
    setTimeout(() => {
      const menuRoot = document.querySelectorAll('[class^=menu-bar_file-group_1]')[0]
      addMenuItem(menuRoot)
    }, 1000)
  })
}

function addMenuItem(root: any) {
  const menuItem = document.createElement('div')
  root.appendChild(menuItem)

  ReactDOM.render(<Menu />, menuItem)
}

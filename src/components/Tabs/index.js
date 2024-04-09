import {Component} from 'react'

import TabItem from '../TabItem'

import './index.css'

class Tabs extends Component {
  render() {
    const {menuCategories, activeTabId, updateActiveId, dishesList} = this.props
    console.log(dishesList)
    return (
      <div className="tabs-container">
        {menuCategories.map(eachMenu => (
          <TabItem
            category={eachMenu.menuCategory}
            tabid={eachMenu.menuCategoryId}
            key={eachMenu.menuCategoryId}
            isActive={activeTabId === eachMenu.menuCategoryId}
            updateActiveId={updateActiveId}
          />
        ))}
      </div>
    )
  }
}

export default Tabs

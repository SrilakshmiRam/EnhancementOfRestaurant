import './index.css'

const TabItem = props => {
  const {category, isActive, tabid, updateActiveId} = props

  const onClickMenuCtegory = () => {
    updateActiveId(tabid)
  }

  const activeStyle = isActive ? 'active-category' : 'menu-category'

  return (
    <button type="button" className={activeStyle} onClick={onClickMenuCtegory}>
      {category}
    </button>
  )
}

export default TabItem

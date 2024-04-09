import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems, restaurantname} = useContext(CartContext)

  const cartListLength = cartList.length

  const removeAllItems = () => {
    removeAllCartItems()
  }

  const renderEmptyView = () => (
    <div className="image-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="emptyimage"
        className="cart-image"
      />
    </div>
  )

  const renderCartItemsView = () => (
    <div>
      <button className="removeallBtn" type="button" onClick={removeAllItems}>
        Remove All
      </button>
      <ul className="cart-list-items">
        {cartList.map(eachItem => (
          <CartItem cartDetails={eachItem} key={eachItem.dishId} />
        ))}
      </ul>
    </div>
  )

  return (
    <div className="cart-details-container">
      <Header restaurantname={restaurantname} />
      {cartListLength === 0 ? renderEmptyView() : renderCartItemsView()}
    </div>
  )
}

export default Cart

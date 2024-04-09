import {useContext} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartDetails} = props

  const {dishName, dishPrice, dishImage, dishId, quantity} = cartDetails

  const {removeCartItem, decrementCartItemQuantity, incrementCartItemQuantity} =
    useContext(CartContext)
  const onClickRemove = () => {
    removeCartItem(dishId)
  }

  const onDecreaseQuantity = () => {
    decrementCartItemQuantity(dishId)
  }

  const onIncreaseQuantity = () => {
    incrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-item">
      <div className="text-container">
        <p className="dishname">{dishName}</p>
        <p className="currency">price: {(dishPrice * quantity).toFixed(2)}</p>
        <div className="buttons-container">
          <button type="button" className="button" onClick={onDecreaseQuantity}>
            -
          </button>
          <p className="dishes-count">{quantity}</p>
          <button type="button" className="button" onClick={onIncreaseQuantity}>
            +
          </button>
        </div>
        <button type="button" className="remove-btn" onClick={onClickRemove}>
          Remove
        </button>
      </div>
      <img className="image-dish" src={dishImage} alt={dishName} />
    </li>
  )
}

export default CartItem

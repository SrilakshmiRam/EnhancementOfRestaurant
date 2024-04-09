import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class DishItem extends Component {
  state = {cartCount: 0, quantity: 1}

  onDecrement = () => {
    const {cartCount} = this.state

    if (cartCount > 0) {
      this.setState(prevState => ({cartCount: prevState.cartCount - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({cartCount: prevState.cartCount + 1}))
  }

  render() {
    const {cartCount, quantity} = this.state
    const {dishDetails} = this.props
    const {
      dishId,
      dishName,
      dishCurrency,
      dishPrice,
      dishImage,
      dishDescription,
      dishCalories,
      addonCart,
      dishAvailability,
    } = dishDetails
    const addOncartsLength = addonCart.length

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onAddCart = () => {
            addCartItem({...dishDetails, quantity})
          }

          return (
            <li className="dish-item">
              <div className="dishes-details-container">
                <p className="dishname">{dishName}</p>
                <p className="currency">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-description">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="buttons-container">
                    <button
                      type="button"
                      className="button"
                      onClick={this.onDecrement}
                    >
                      -
                    </button>
                    <p className="dishes-count">{cartCount}</p>
                    <button
                      type="button"
                      className="button"
                      onClick={this.onIncrement}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="dishes-notavailable">Not available</p>
                )}
                {addOncartsLength > 0 && (
                  <p className="customizations">Customizations available</p>
                )}
                {cartCount > 0 ? (
                  <button type="button" className="addbtn" onClick={onAddCart}>
                    Add to Cart
                  </button>
                ) : (
                  ''
                )}
              </div>
              <p className="dish-calories">{dishCalories} calories</p>
              <img src={dishImage} alt={dishName} className="dish-image" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem

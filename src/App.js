import {Route, Switch, BrowserRouter} from 'react-router-dom'

import {Component} from 'react'

import CartContext from './context/CartContext'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {restaurantname: '', cartList: []}

  componentDidMount() {
    this.getrestaurant()
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  addCartItem = cartItem => {
    console.log('triggered')
    this.setState(prevState => ({
      cartList: [...prevState.cartList, cartItem],
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    this.setState({
      cartList: cartList.filter(cartItem => cartItem.dishId !== id),
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (eachCart.dishId === id) {
          const updatedQuantity = eachCart.quantity + 1
          return {...eachCart, quantity: updatedQuantity}
        }
        return eachCart
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.dishId === id)
    if (product.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.dishId === id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    }
  }

  getrestaurant = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    if (response.ok === true) {
      const restaurant = data[0]
      this.setState({
        restaurantname: restaurant.restaurant_name,
      })
    }
  }

  render() {
    const {restaurantname, cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          restaurantname,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App

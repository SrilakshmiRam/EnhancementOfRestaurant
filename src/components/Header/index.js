import {withRouter, Link} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantname} = props

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="navbar-container">
            <Link to="/" className="nav-link">
              <h1 className="nav-title">{restaurantname}</h1>
            </Link>
            <div className="nav-items">
              <h1 className="my-Orders">My Orders</h1>
              <Link to="/cart" className="nav-link">
                <button
                  type="button"
                  data-testid="cart"
                  className="cart-icon-button"
                >
                  <AiOutlineShoppingCart
                    className="cart-icon"
                    arial-label="close"
                  />
                </button>
              </Link>
              <p className="count">{cartList.length}</p>
              <button type="button" className="logoutbtn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)

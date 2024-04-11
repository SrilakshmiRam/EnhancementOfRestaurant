import {Component} from 'react'

import Loader from 'react-loader-spinner'

import CartContext from '../../context/CartContext'

import Header from '../Header'
import Tabs from '../Tabs'
import DishItem from '../DishItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    menuCategories: [],
    activeTabId: '',
    dishesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDishDetails()
  }

  getDishDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const restaurant = data[0]
      const updatedRestaurant = {
        branchName: restaurant.branch_name,
        restaurantId: restaurant.restaurant_id,
        nextUrl: restaurant.nexturl,
        restaurantName: restaurant.restaurant_name,
        restaurantImage: restaurant.restaurant_image,
        tableId: restaurant.table_id,
        tableName: restaurant.table_name,
        tableMenuList: restaurant.table_menu_list.map(each => ({
          categoryDishes: each.category_dishes.map(eachItem => ({
            dishAvailability: eachItem.dish_Availability,
            dishType: eachItem.dish_Type,
            dishCalories: eachItem.dish_calories,
            dishCurrency: eachItem.dish_currency,
            dishId: eachItem.dish_id,
            dishImage: eachItem.dish_image,
            dishName: eachItem.dish_name,
            dishPrice: eachItem.dish_price,
            dishDescription: eachItem.dish_description,
            nextUrl: eachItem.nexturl,
            addonCart: eachItem.addonCat.map(eachAddon => ({
              addonCategory: eachAddon.addon_category,
              addonCategoryId: eachAddon.addon_category_id,
              addonSelection: eachAddon.addon_selection,
              nextUrl: eachAddon.nexturl,
              addons: eachAddon.addons.map(eachaddonItem => ({
                dishAvailability: eachaddonItem.dish_Availability,
                dishType: eachaddonItem.dish_Type,
                dishCalories: eachaddonItem.dish_calories,
                dishCurrency: eachaddonItem.dish_currency,
                dishId: eachaddonItem.dish_id,
                dishImage: eachaddonItem.dish_image,
                dishName: eachaddonItem.dish_name,
                dishPrice: eachaddonItem.dish_price,
                dishDescription: eachaddonItem.dish_description,
              })),
            })),
          })),
          menuCategory: each.menu_category,
          menuCategoryId: each.menu_category_id,
          menuCategoryImage: each.menu_category_image,
          nextUrl: each.nexturl,
        })),
      }

      this.setState({
        menuCategories: updatedRestaurant.tableMenuList,
        activeTabId: updatedRestaurant.tableMenuList[0].menuCategoryId,
        dishesList: updatedRestaurant.tableMenuList[0].categoryDishes,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  updateActiveId = tabId => {
    const {menuCategories} = this.state
    const filteredDishesArray = menuCategories.filter(
      each => each.menuCategoryId === tabId,
    )
    this.setState({
      activeTabId: tabId,
      dishesList: filteredDishesArray[0].categoryDishes,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {menuCategories, activeTabId, dishesList} = this.state
    return (
      <>
        <Tabs
          menuCategories={menuCategories}
          activeTabId={activeTabId}
          updateActiveId={this.updateActiveId}
        />
        <ul className="dishes-list">
          {dishesList.map(eachDish => (
            <DishItem dishDetails={eachDish} key={eachDish.menuCategoryId} />
          ))}
        </ul>
      </>
    )
  }

  renderDishesList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {menuCategories, activeTabId, dishesList} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {restaurantname} = value
          return (
            <div className="app-container">
              <Header restaurantname={restaurantname} />
              {this.renderDishesList()}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home

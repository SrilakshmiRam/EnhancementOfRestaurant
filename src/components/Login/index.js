import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }

    this.setState({
      username: '',
      password: '',
    })
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    console.log(username)
    console.log(password)
    return (
      <div className="login-section">
        <h1 className="login-heading">Restaurant Login</h1>
        <form className="form-container" onSubmit={this.onSubmitLogin}>
          <div className="input-container">
            <label className="label" htmlFor="username">
              UserName
            </label>
            <input
              id="username"
              placeholder="enter username"
              type="text"
              className="input-text"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="passowrd">
              Password
            </label>
            <input
              id="passowrd"
              placeholder="enter a password"
              type="password"
              className="input-text"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

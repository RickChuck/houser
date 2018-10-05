import React, { Component } from 'react'
import './Auth.css'
import logo from '../../assets/auth_logo.png'
import axios from 'axios'

export default class Auth extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  registerUser = async () => {
    try {
      const {username, password} = this.state
      await axios.post('/api/auth/register', {username, password})
      this.props.history.push('/dashboard')
    } catch(err) {
      console.error('registerUser function failed in Auth.js:', err)
    }
  }
  
  userLogin = async () => {
    try{
      const {username, password} = this.state
      await axios.post('/api/auth/login', {username, password})
      this.props.history.push('/dashboard')
    } catch(err) {
      console.error('userLogin function failed in Auth.js:', err)
    }
  }

  render() {
    return (
      <div id='auth-view'>
        <section id='auth-login-mid'>
          <div id='auth-login-content'>
            <img src={logo} alt='logo' id='auth-logo' />
            <div id='auth-input-section'>
              <h3 className='auth-input-name'>Username</h3>
              <input className='auth-input' onChange={e => this.handleChange('username', e.target.value)} value={this.state.username}/>
              <h3 className='auth-input-name'>Password</h3>
              <input className='auth-input' type='password' onChange={e => this.handleChange('password', e.target.value)} value={this.state.password}/>
            </div>
            <div id='auth-buttons'>
              <button id='auth-login-button' onClick={() => this.userLogin()} style={{ cursor: 'pointer' }}>Login</button>
              <button id='auth-register-button' onClick={() => this.registerUser()} style={{ cursor: 'pointer' }}>Register</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
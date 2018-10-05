import React, { Component } from 'react'
import logo from '../../assets/house_logo.png'
import axios from 'axios'
import './Wizard.css'
import step_active from '../../assets/step_active.png'
import step_inactive from '../../assets/step_inactive.png'
import step_complete from '../../assets/step_completed.png'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {stepTwo} from '../../reducers/newPropertyReducer'

class V2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyAddress: props.propertyAddress,
      propertyState: props.propertyState,
      propertyCity: props.propertyCity,
      propertyZip: props.propertyZip,
    }
  }

  logoutUser = async () => {
    try {
      await axios.post('/api/auth/logout')
      this.props.history.push('/')
    } catch (err) {
      console.error('logoutUser function failed in Dashboard.js:', err)
    }
  }

  handleInput(key, value) {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <div id='wizard-page'>
        <nav id='wizard-nav'>
          <section id='wizard-title'>
            <img src={logo} width='25px' alt='' />
            <h1 className='wizard-nav-text'>Houser</h1>
            <p className='wizard-nav-text'>Wizard</p>
          </section>
          <p onClick={() => this.logoutUser()} style={{ cursor: 'pointer' }}>Logout</p>
        </nav>
        <section id='wizard-mid'>
          <div id='wizard-mid-1'>
            <h2 style={{ fontSize: '20px' }}>Add new listing</h2>
            <Link to='/dashboard'>
              <button id='cancel-button'>Cancel</button>
            </Link>
          </div>
          <div id='wizard-mid-2'>
            <p style={{ marginBottom: '25px' }}>Step 2</p>
            <div id='wizard-steps' style={{ marginBottom: '25px' }}>
              <img src={step_complete} alt='' />
              <img src={step_active} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
            </div>
            <div id='wizard-forum'>
              <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>Address</h3>
              <input onChange={e => this.handleInput('propertyAddress', e.target.value)} value={this.state.propertyAddress} className='wizard-forum-input' style={{ marginBottom: '25px', height: '25px' }} />
              <div id='wizard-forum2'>
                <div>
                  <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>City</h3>
                  <input onChange={e => this.handleInput('propertyCity', e.target.value)} value={this.state.propertyCity} className='wizard-forum-input' style={{ height: '25px', width: '200px' }} />
                </div>
                <div id='wizard-state-forum'>
                  <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>State</h3>
                  <input onChange={e => this.handleInput('propertyState', e.target.value)} value={this.state.propertyState} className='wizard-forum-input' style={{ height: '25px', width: '200px' }} />
                </div>
              </div>
              <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>Zip</h3>
              <input onChange={e => this.handleInput('propertyZip', e.target.value)} value={this.state.propertyZip} className='wizard-forum-input' style={{ width: '200px', height: '25px' }} />
            </div>
            <div id='wizard-step-buttons'>
              <Link to='/wizard/v1'>
                <button className='wizard-step-button' style={{ width: '155px' }}>Previous Step</button>
              </Link>
              <Link to='/wizard/v3'>
                <button className='wizard-step-button' onClick={() => this.props.stepTwo(this.state.propertyAddress, this.state.propertyCity, this.state.propertyState, this.state.propertyZip)}>Next Step</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    propertyAddress: state.propertyAddress,
    propertyCity: state.propertyCity,
    propertyState: state.propertyState,
    propertyZip: state.propertyZip
  }
}

export default connect(mapStateToProps, {stepTwo})(V2)
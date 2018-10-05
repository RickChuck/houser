import React, { Component } from 'react'
import logo from '../../assets/house_logo.png'
import axios from 'axios'
import './Wizard.css'
import step_active from '../../assets/step_active.png'
import step_inactive from '../../assets/step_inactive.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { stepOne } from '../../reducers/newPropertyReducer'

class V1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyName: props.propertyName,
      propertyDescription: props.propertyDescription
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

  addPropertyInfo = () => {
    const { propertyName, propertyDescription } = this.state
    this.props.stepOne(propertyName, propertyDescription)
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
            <p style={{ marginBottom: '25px' }}>Step 1</p>
            <div id='wizard-steps' style={{ marginBottom: '25px' }}>
              <img src={step_active} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
            </div>
            <div id='wizard-forum'>
              <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>Property Name</h3>
              <input onChange={e => this.handleInput('propertyName', e.target.value)} value={this.state.propertyName} className='wizard-forum-input' style={{ marginBottom: '25px', height: '25px' }} />
              <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>Property Description</h3>
              <textarea onChange={e => this.handleInput('propertyDescription', e.target.value)} value={this.state.propertyDescription} className='wizard-forum-input' style={{ height: '100px' }} />
            </div>
            <Link to='/wizard/v2'>
              <button className='wizard-step-button' onClick={() => this.addPropertyInfo()}>Next Step</button>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    propertyName: state.propertyName,
    propertyDescription: state.propertyDescription
  }
}

export default connect(mapStateToProps, { stepOne })(V1)
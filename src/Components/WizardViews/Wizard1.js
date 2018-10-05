import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { stepOne } from '../../reducers/newPropertyReducer'

class Wizard1 extends Component {
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
            <h1 className='wizard-nav-text'>Houser</h1>
            <p className='wizard-nav-text'>Wizard</p>
          </section>
          <p onClick={() => this.logoutUser()} style={{ cursor: 'pointer' }}>Logout</p>
        </nav>
        <section id='wizard-mid'>
          <div id='wizard-mid-1'>
            <Link to='/dashboard'>
              <button id='cancel-button'>Cancel</button>
            </Link>
          </div>
          <div id='wizard-mid-2'>
            <p>Step 1</p>
            <div id='wizard-forum'>
              <h3>Property Name</h3>
              <input onChange={e => this.handleInput('propertyName', e.target.value)} value={this.state.propertyName} className='wizard-forum-input'/>
              <h3>Property Description</h3>
              <textarea onChange={e => this.handleInput('propertyDescription', e.target.value)} value={this.state.propertyDescription} className='wizard-forum-input'/>
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

export default connect(mapStateToProps, { stepOne })(Wizard1)
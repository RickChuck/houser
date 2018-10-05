import React, { Component } from 'react'
import logo from '../../assets/house_logo.png'
import axios from 'axios'
import './Wizard.css'
import step_active from '../../assets/step_active.png'
import step_inactive from '../../assets/step_inactive.png'
import step_complete from '../../assets/step_completed.png'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { stepThree } from '../../reducers/newPropertyReducer'

class V3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyImage: props.propertyImage,
      uploadedImage: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.propertyImage !== '') {
      this.setState({ uploadedImage: true })
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

  handleChange(event) {
    if (event.target.files[0]) {
      this.setState({
        propertyImage: URL.createObjectURL(event.target.files[0]), uploadedImage: true
      })
    }
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
            <p style={{ marginBottom: '25px' }}>Step 3</p>
            <div id='wizard-steps' style={{ marginBottom: '25px' }}>
              <img src={step_complete} alt='' />
              <img src={step_complete} alt='' />
              <img src={step_active} alt='' />
              <img src={step_inactive} alt='' />
              <img src={step_inactive} alt='' />
            </div>
            <div id='wizard-forum'>
              {this.state.uploadedImage ?
                <div>
                  <img src={this.state.propertyImage} id='wizard-image-preview' />
                </div>
                :
                <div id='wizard-image-preview'>
                  <p style={{ color: 'grey' }}>Preview</p>
                </div>
              }
              <h3 style={{ marginBottom: '5px', marginLeft: '15px' }}>Image Upload</h3>
              <input type='file' onChange={this.handleChange} className='wizard-forum-input' style={{ height: '25px', border: 'none' }} />
            </div>
            <div id='wizard-step-buttons'>
              <Link to='/wizard/v2'>
                <button className='wizard-step-button' style={{ width: '155px' }}>Previous Step</button>
              </Link>
              <Link to='/wizard/v4'>
                <button className='wizard-step-button' onClick={() => this.props.stepThree(this.state.propertyImage)}>Next Step</button>
              </Link>
            </div>
          </div>
        </section >
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    propertyImage: state.propertyImage
  }
}

export default connect(mapStateToProps, { stepThree })(V3)
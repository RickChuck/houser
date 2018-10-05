import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { stepThree } from '../../reducers/newPropertyReducer'

class Wizard3 extends Component {
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
            <p>Step 3</p>
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

export default connect(mapStateToProps)(Wizard3)
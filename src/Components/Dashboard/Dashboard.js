import React, { Component } from 'react'
import './Dashboard.css'
import logo from '../../assets/house_logo.png'
import axios from 'axios'
import deleteIcon from '../../assets/delete_icon.png'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
  state = {
    properties: [],
    rentFilter: 0
  }

  getAllProperties = async () => {
    try {
      let { data: properties } = await axios.get('/api/properties')
      this.setState({ properties, rentFilter: '' })
    } catch (err) {
      console.error('getAllProperties failed in Dashboard.js:', err)
    }
  }

  componentDidMount = async () => {
    try {
      this.getAllProperties()
    } catch (err) {
      console.error('componentDidMount failed in Dashboard.js:', err)
    }
  }

  handleChange(key, value) {
    this.setState({ [key]: value })
  }

  filterProperties = async () => {
    try {
      const { rentFilter } = this.state
      let { data: properties } = await axios.get(`/api/properties?rentFilter=${rentFilter}`)
      this.setState({ properties })
    } catch (err) {
      console.error('filterProperties function failed in Dashboard.js:', err)
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

  deleteProperty = async (id) => {
    try {
      const { data: properties } = await axios.delete(`/api/properties/${id}`)
      this.setState({ properties })
    } catch (err) {
      console.error('deleteProperty function failed in Dashboard.js:', err)
    }
  }

  render() {
    const properties = this.state.properties.map(e => {
      return (
        <div key={e.property_id} id='dashboard-house-details-container'>
          <img src={e.property_image} width='150px' height='150px' alt='' />
          <div id='dashboard-house-details-container-left'>
            <h2 id='property-name'>{e.property_name}</h2>
            <section id='property-desc-container'>
              <p id='property-desc'>{e.property_description}</p>
            </section>
          </div>
          <hr id='hr-seperator' />
          <div id='dashboard-house-details-container-right'>
            <p id='loan-text'>Loan: ${e.property_loan_amount}</p>
            <p className='house-details'>Monthly Mortgage: ${e.property_monthly_mortgage}</p>
            <p className='house-details'>Desired Rent: ${e.property_desired_rent}</p>
            <p className='house-details'>Address: {e.property_address}</p>
            <p className='house-details'>City: {e.property_city}</p>
          </div>
          <img style={{ cursor: 'pointer' }} src={deleteIcon} alt='' width='10px' height='12px' id='delete-icon' onClick={() => this.deleteProperty(e.property_id)} />
        </div>
      )
    })

    return (
      <div id='dashboard-page'>
        <nav id='dashboard-nav'>
          <section id='dashboard-title'>
            <img src={logo} width='25px' alt='' />
            <h1 className='dashboard-nav-text'>Houser</h1>
            <p className='dashboard-nav-text'>Dashboard</p>
          </section>
          <p onClick={() => this.logoutUser()} style={{ cursor: 'pointer' }}>Logout</p>
        </nav>
        <section id='dashboard-mid'>
          <Link to='/wizard/v1'>
            <button id='dashboard-add-propertyBtn' style={{ cursor: 'pointer' }}>Add new property</button>
          </Link>
          <div id='dashboard-property-filter'>
            <p>List properties with "desired rent" greater then: $</p>
            <input id='dashboard-filter-input' placeholder='0' onChange={e => this.handleChange('rentFilter', e.target.value)} value={this.state.rentFilter} />
            <button style={{ cursor: 'pointer' }} className='dashboard-filter-controls' onClick={() => this.filterProperties()}>Filter</button>
            <button style={{ cursor: 'pointer' }} className='dashboard-filter-controls' onClick={() => this.getAllProperties()}>Reset</button>
          </div>
          <hr />
          <div id='dashboard-mid-bottom'>
            <h2 id='dashboard-homelist-title'>Home Listings</h2>
            {properties}
          </div>
        </section>
      </div>
    )
  }
}
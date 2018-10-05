import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard';
import V1 from './Components/WizardViews/V1'
import V2 from './Components/WizardViews/V2'
import V3 from './Components/WizardViews/V3'
import V4 from './Components/WizardViews/V4'
import V5 from './Components/WizardViews/V5'

export default (
  <Switch>
    <Route exact path='/' component={Auth} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/wizard/v1' component={V1} />
    <Route path='/wizard/v2' component={V2} />
    <Route path='/wizard/v3' component={V3} />
    <Route path='/wizard/v4' component={V4} />
    <Route path='/wizard/v5' component={V5} />
  </Switch>
)
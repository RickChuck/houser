import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard';
import Wizard1 from './Components/WizardViews/Wizard1'
import Wizard2 from './Components/WizardViews/Wizard2'
import Wizard3 from './Components/WizardViews/Wizard3'

export default (
  <Switch>
    <Route path='/Dashboard' component={Dashboard} />
    <Route path='/wizard/wizard1' component={Wizard1} />
    <Route path='/wizard/wizard2' component={Wizard2} />
    <Route path='/wizard/wizard3' component={Wizard3} />
  </Switch>
)
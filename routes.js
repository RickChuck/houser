import { Switch, Route } from 'react-router-dom';
import Dashboard from './src/Component/Dashboard/Dashboard';
import Wizard from './src/Component/Wizard/Wizard';

export default(
    <Switch>
        <Route component={Dashboard} exact path = '/'/>
        <Route component={Wizard} exact path = '/wizard'/>
    </Switch>
)
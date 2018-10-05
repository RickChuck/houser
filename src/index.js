import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import './reset.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'

ReactDOM.render(
  <Provider routes={routes}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>, document.getElementById('root'));

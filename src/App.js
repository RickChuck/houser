import React, { Component } from 'react';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import Wizard from './Component/Wizard/Wizard';
import Header from './Component/Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard/>
        <Wizard />
        <Header/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap-grid.css';

// IMPORT COMPONENTS
import { Header } from './Components/Header/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap-grid.css';

// IMPORT COMPONENTS
import { Header } from './Components/Header/Header';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {currentStep: 2, steps: [
            {
                stepName: "service details",
                visited: true,
                correct: false
            },
            {
                stepName: "personal details",
                visited: false,
                correct: true
            },
            {
                stepName: "your visit",
                visited: false
            },
            {
                stepName: "payment",
                visited: false
            }
        ]}


        /******BINDING*****/
        this.changeCurrentStep = this.changeCurrentStep.bind(this);
  }

  // METHODS
    changeCurrentStep(stepIndex){
      this.setState({currentStep: stepIndex})
    }

  render() {
    let state = this.state;
    return (
      <div className="App">
        <Header changeCurrentStep={this.changeCurrentStep} steps={state.steps} currentStep={state.currentStep}/>
      </div>
    );
  }
}

export default App;

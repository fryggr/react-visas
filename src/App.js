import React, { Component } from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

/********* IMPORT COMPONENTS ********/
import { Header } from "./Components/Header/Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 2,
      currency:  { value: "gbp", label: "£ - GBP" },
      currencies: [
        { value: "gbp", label: "£ - GBP" },
        { value: "usd", label: "$ - USD" },
        { value: "eur", label: "€ - EUR" }
      ],
      steps: [
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
      ]
    };

    /******BINDING*****/
    this.changeCurrentStep = this.changeCurrentStep.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }

  // METHODS
  changeCurrentStep(stepIndex) {
    let updatedSteps = this.state.steps;
    updatedSteps[stepIndex].visited = true;
    this.setState({ currentStep: stepIndex, steps: updatedSteps });
  }

  changeCurrency(currency){
    this.setState({currency: currency})
  }

  render() {
    let state = this.state;
    return (
      <div className="App">
        <Header
          changeCurrentStep={this.changeCurrentStep}
          steps={state.steps}
          currentStep={state.currentStep}
          currencies={state.currencies}
          currency={state.currency}
          changeCurrency={this.changeCurrency}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

/********* IMPORT COMPONENTS ********/
import { Header } from "./Components/Header/Header";
import { RadioGroup } from "./Components/RadioGroup/RadioGroup";
import { ToggleTab } from "./Components/ToggleTab/ToggleTab";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 2,
            price: 15.4,
            currency: { value: "gbp", label: "£ - GBP" },
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
            ],
            //For RadioGroup test
            sex: {
                value: "",
                error: "Please select one"
            }
            
        };

        /******BINDING*****/
        this.changeCurrentStep = this.changeCurrentStep.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);
    }

    // METHODS
    changeCurrentStep(stepIndex) {
        let updatedSteps = this.state.steps;
        updatedSteps[stepIndex].visited = true;
        this.setState({ currentStep: stepIndex, steps: updatedSteps });
    }

    changeCurrency(currency) {
        this.setState({ currency: currency });
    }

    handleSexChange(value) {
        this.setState({ sex: value, error: "" });
    }

    render() {
        let state = this.state;
        return (
            <div className="App text-center text-md-left">
                <Header
                    changeCurrentStep={this.changeCurrentStep}
                    steps={state.steps}
                    currentStep={state.currentStep}
                    currencies={state.currencies}
                    currency={state.currency}
                    changeCurrency={this.changeCurrency}
                    price={state.price}
                />

                {/*RadioGroup GROUP EXAMPLE*/}
                <RadioGroup
                    handleChange={this.handleSexChange}
                    error={this.state.sex.error}
                    title="Gender"
                    options={[
                        { value: "Male", text: "Male" },
                        { value: "Female", text: "Female" }
                    ]}
                    name="gender"
                />

                {/*ToggleTab example*/}
                <ToggleTab label="Вкладка">
                    <div>ДА ПОШЕЛ ТЫ НАХУЙ</div>
                    <div>ДА ПОШЕЛ ТЫ НАХУЙ</div>
                    <div>ДА ПОШЕЛ ТЫ НАХУЙ</div>
                    <div>ДА ПОШЕЛ ТЫ НАХУЙ</div>
                    <div>ДА ПОШЕЛ ТЫ НАХУЙ</div>
                </ToggleTab>
            </div>
        );
    }
}

export default App;

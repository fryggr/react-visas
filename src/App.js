import React, { Component } from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

/********* IMPORT COMPONENTS ********/
import { Header } from "./Components/Header/Header";
import { RadioGroup } from "./Components/RadioGroup/RadioGroup";
import { ToggleTab } from "./Components/ToggleTab/ToggleTab";
import { Input } from "./Components/Input/Input";
import { Button } from "./Components/Button/Button";
import { Step } from "./Components/Step/Step";

//For Validation
let Validator = require("validatorjs");
const plugins = {
  dvr: Validator
};

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
            },
            //For Input testing
            email: {
                value: "",
                visited: false,
                error: ""
            }
        };

        /******BINDING*****/
        this.changeCurrentStep = this.changeCurrentStep.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.handleSexChange = this.handleSexChange.bind(this);

        /**** INPUT BINDING *******/
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.updateError = this.updateError.bind(this);
        this.updateVisited = this.updateVisited.bind(this);
        this.validate = this.validate.bind(this);
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

    //INPUT METHODS
    handleFieldChange(fieldName, value) {
        let updatedField = this.state[fieldName];
        updatedField.value = value;

        let newState = this.state;
        newState[fieldName] = updatedField;

        this.setState(newState);
        this.validate();
    }

    updateVisited(fieldName) {
        let updatedField = this.state[fieldName];
        updatedField.visited = true;

        let newState = this.state;
        newState[fieldName] = updatedField;

        this.setState(newState);
    }

    updateError(fieldName, value) {
        let updatedField = this.state[fieldName];
        updatedField.error = value;

        let newState = this.state;
        newState[fieldName] = updatedField;

        this.setState(newState);
    }

    validate() {
        let data = {
            email: this.state.email.value
        };

        let rules = {
            email: "required|email"
        };

        let validation = new Validator(data, rules);

        validation.fails(); // true
        validation.passes(); // false

        // Error messages
        if (validation.errors.first("email"))
            this.updateError("email", validation.errors.first("email"));
        else this.updateError("email", "");
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
                {/*INPUT example*/}
                <Input
                    type="email"
                    updateVisited={this.updateVisited}
                    handleFieldChange={this.handleFieldChange}
                    fieldName="email"
                    value={state.email.value}
                    visited={state.email.visited}
                    label="Email"
                    placeholder="Enter email"
                    error={state.email.error}
                />
                <Input
                    type="select"
                    updateVisited={this.updateVisited}
                    handleFieldChange={this.handleFieldChange}
                    fieldName="email"
                    value={state.email.value}
                    visited={state.email.visited}
                    label="Email"
                    error={state.email.error}
                />
                </ToggleTab>



                {/*Button example*/}
                <Button label="next step" className="Button_red-border" text="Save your current progress"/>

                {/*Step Example*/}
                <Step number={4} hidden={false}/>
            </div>
        );
    }
}

export default App;

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
            currentStep: 0,
            price: 15.4,
            currency: { value: "gbp", label: "£ - GBP" },
            currencies: [{ value: "gbp", label: "£ - GBP" }, { value: "usd", label: "$ - USD" }, { value: "eur", label: "€ - EUR" }],
            //this data for StepsNavigation Component
            steps: [
                {
                    stepName: "service details",
                    visited: true,
                    correct: true
                },
                {
                    stepName: "personal details",
                    visited: false
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

            /*************USER'S INPUT STEP 1************/

            groupsize: {
                value: 1,
                error: "",
                visited: false
            },
            numberOfEntries: {
                value: "",
                error: "",
                visited: false
            },
            purpose: {
                value: "",
                error: "",
                visited: false
            },
            registration: {
                value: "",
                error: "",
                visited: false
            },
            countryApplyIn: {
                value: "",
                error: "",
                visited: false
            },
            registration: {
                value: "",
                error: "",
                visited: false
            },
            delivery: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 2************/
            visitors: [
                {
                    "firstName": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "middleName": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "surName": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "sex": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "birthDate": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "citizenship": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "passportNumber": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "passportIssued": {
                        value: "",
                        error: "",
                        visited: false
                    },
                    "passportExpired": {
                        value: "",
                        error: "",
                        visited: false
                    }
                }

            ],
            email: {
                value: "",
                error: "",
                visited: false
            },
            phone: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 3************/

            arrivalDate1: {
                value: "",
                error: "",
                visited: false
            },
            arrivalDate2: {
                value: "",
                error: "",
                visited: false
            },
            departureDate1: {
                value: "",
                error: "",
                visited: false
            },
            departureDate2: {
                value: "",
                error: "",
                visited: false
            },
            locations: [
                {
                    city: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    hotel: {
                        value: "",
                        error: "",
                        visited: false
                    }
                }
            ],
            userNeedsNewsletter: {
                value: "",
                error: "",
                visited: false
            },
            userNeedsJoinMailingList: {
                value: "",
                error: "",
                visited: false
            },
            userReadTerms: {
                value: "",
                error: "",
                visited: false
            },

            /*************USER'S INPUT STEP 4************/

            userCompleteForm: {
                value: "",
                error: "",
                visited: false
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


        this.updateField = this.updateField.bind(this);
    }

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value){
        let arr = path.split('.');
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']"
        });
        let state = this.state;
        eval('state'+ code+'.value=value');
        this.setState(state);
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
        if (validation.errors.first("email")) this.updateError("email", validation.errors.first("email"));
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
                {/*<RadioGroup
                    handleChange={this.handleSexChange}
                    error={this.state.sex.error}
                    title="Gender"
                    options={[{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]}
                    name="gender"
                />*/}

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
                <Button label="next step" className="Button_red-border" text="Save your current progress" />

                {/*Step Example*/}
                <Step number={4} hidden={false} />
            </div>
        );
    }
}

export default App;

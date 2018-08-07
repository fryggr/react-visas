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

            groupSize: {
                value: "",
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
                    firstName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    middleName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    surName: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    sex: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    birthDate: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    citizenship: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportNumber: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportIssued: {
                        value: "",
                        error: "",
                        visited: false
                    },
                    passportExpired: {
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
            },

            /*******DATA FROM SERVER**********/
            OptionsGroupSize: [{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }],
            OptionsNumberOfEntries: [{ value: "1", label: "Single" }, { value: "2", label: "Double" }],
            OptionsPurpose: [{ value: "1", label: "Tourist" }, { value: "2", label: "Auto" }],
            OptionsRegistration: [{ value: "1", label: "No registration services needed" }, { value: "2", label: "Registration in Moscow" }],
            OptionsDelivery: [{ value: "1", label: "Email" }, { value: "2", label: "Another option" }]
        };

        /******BINDING*****/
        this.updateField = this.updateField.bind(this);
        this.updateError = this.updateError.bind(this);
        this.validate = this.validate.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    // METHODS

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value) {
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });
        let state = this.state;
        eval("state" + code + "=value");
        this.setState(state);
        this.validate();
    }

    updateError(fieldName, value) {
        let updatedField = this.state[fieldName];
        updatedField.error = value;

        let newState = this.state;
        newState[fieldName] = updatedField;

        this.setState(newState);
    }

    validate() {
        let inputFields = {
            groupSize: this.state.groupSize.value.value,
            numberOfEntries: this.state.numberOfEntries.value.value,
            purpose: this.state.purpose.value.value,
            registration: this.state.registration.value.value,
            countryApplyIn: this.state.countryApplyIn.value,
            delivery: this.state.delivery.value.value
        };

        let rules = {
            groupSize: "required",
            numberOfEntries: "required",
            purpose: "required",
            registration: "required",
            countryApplyIn: "required",
            delivery: "required",
        };

        let validation = new Validator(inputFields, rules);

        validation.fails(); // true
        validation.passes(); // false

        // Error messages
        Object.keys(inputFields).forEach(inputField => {
            if (validation.errors.first(inputField)) {
                this.updateError(inputField, validation.errors.first(inputField));
            } else {
                this.updateError(inputField, "");
            }
        });
    }

    render() {
        let state = this.state;
        return (
            <div className="App text-center text-md-left">
                <Header
                    updateField={this.updateField}
                    steps={state.steps}
                    currentStep={state.currentStep}
                    currencies={state.currencies}
                    currency={state.currency}
                    price={state.price}
                />

                <div className="App__container container">
                    <div className="container px-0 mr-auto ml-0">
                        <div className="row py-3">
                            <div className="d-flex col-md-6 flex-column flex-md-row">
                                <Button label="retrieve saved application" className="mr-3" text="CONTINUE a saved existing application" />
                                <Button label="save progress" text="SAVE your current progress" />
                            </div>
                            <div className="ml-auto col-md-4">
                                <Button
                                    label="I am returning client"
                                    className="Button_red-border"
                                    text="RECOVER your personal details quickly to pre-fill your application"
                                />
                            </div>
                        </div>
                        <Step number={0} hidden={state.currentStep !== 0}>
                            <Input
                                type="select"
                                updateField={this.updateField}
                                fieldName="groupSize"
                                visited={state.groupSize.visited}
                                label="Group Size"
                                error={state.groupSize.error}
                                options={state.OptionsGroupSize}
                            />
                            <Input
                                className="mt-4"
                                type="select"
                                updateField={this.updateField}
                                fieldName="numberOfEntries"
                                visited={state.numberOfEntries.visited}
                                label="Number of entries"
                                error={state.numberOfEntries.error}
                                options={state.OptionsNumberOfEntries}
                            />
                            <Input
                                className="mt-4"
                                type="select"
                                updateField={this.updateField}
                                fieldName="purpose"
                                visited={state.purpose.visited}
                                label="Purpose of visit"
                                error={state.purpose.error}
                                options={state.OptionsPurpose}
                            />
                            <Input
                                className="mt-4"
                                type="select"
                                updateField={this.updateField}
                                fieldName="registration"
                                visited={state.registration.visited}
                                label="Registration"
                                error={state.registration.error}
                                options={state.OptionsRegistration}
                            />
                            <Input
                                className="mt-4"
                                type="country"
                                updateField={this.updateField}
                                fieldName="countryApplyIn"
                                visited={state.countryApplyIn.visited}
                                label="Country appling in"
                                error={state.countryApplyIn.error}
                            />
                            <Input
                                className="mt-4"
                                type="select"
                                updateField={this.updateField}
                                fieldName="delivery"
                                visited={state.delivery.visited}
                                label="Delivery option"
                                error={state.delivery.error}
                                options={state.OptionsDelivery}
                            />

                        </Step>
                        <Step number={1} hidden={state.currentStep !== 1}>

                        </Step>>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row" style={{maxWidth: "710px"}}>
                        <div className="col-sm-6">
                            <Button className="align-self-md-start align-self-center" label="Save progress" />
                        </div>
                        <div className="col-sm-6">
                            <Button className="Button_red align-self-md-end align-self-center" label="Next step >" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
//
// {/*RadioGroup GROUP EXAMPLE*/}
// {/*<RadioGroup
//     handleChange={this.handleSexChange}
//     error={this.state.sex.error}
//     title="Gender"
//     options={[{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]}
//     name="gender"
// />*/}
//
// {/*ToggleTab example*/}
// <ToggleTab label="Вкладка">
//     {/*INPUT example*/}
//     <Input
//         type="date"
//         updateVisited={this.updateVisited}
//         updateField={this.updateField}
//         fieldName="email"
//         value={state.email.value}
//         visited={state.email.visited}
//         label="Email"
//         placeholder="Enter email"
//         error={state.email.error}
//     />
//     <Input
//         type="select"
//         updateVisited={this.updateVisited}
//         updateField={this.updateField}
//         fieldName="email"
//         value={state.email.value}
//         visited={state.email.visited}
//         label="Email"
//         error={state.email.error}
//     />
// </ToggleTab>
//
// {/*Button example*/}
// <Button label="next step" className="Button_red-border" text="Save your current progress" />

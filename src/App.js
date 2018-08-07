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

let visitorTemplate = {
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
                value: "1",
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
        this.renderVisitors = this.renderVisitors.bind(this);
        this.updateVisitorsArray = this.updateVisitorsArray.bind(this);
    }

    // METHODS

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value) {

        //generate code like [path][path]
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });


        //updateState
        let state = this.state;
        eval("state" + code + "=value");
        this.setState(state);
        this.updateVisitorsArray();
        this.validate();
    }

    updateVisitorsArray(){
        let state = this.state;

        let oldVisitorsCount = this.state.visitors.length;
        let newVisitorsCount = this.state.groupSize.value.value;
        console.log("oldVisitorsCount = ",this.state.visitors.length);
        console.log("newVisitorsCount = ",this.state.groupSize.value.value);

        if (oldVisitorsCount < newVisitorsCount){
            for (let i = oldVisitorsCount; i < newVisitorsCount; i++)
                state.visitors.push(JSON.parse(JSON.stringify(visitorTemplate)));
        }
        else {
            for (let i = oldVisitorsCount; i > newVisitorsCount; i--)
                state.visitors.pop();
        }


        this.setState(state, ()=>console.log(this.state))
    }

    updateError(path, value) {
        console.log(path);
        //generate code like [path][path]
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });

        //updateState
        let state = this.state;
        if (path.indexOf('firstName') !== -1){
            // eval("console.log('SUKA ===' ,state" + code + ")")
            console.log('SUKA =',code)
        }
        eval("state" + code + ".error=value");
        this.setState(state);
    }

    validate() {
        let state = this.state;
        let inputFields = {
            groupSize: state.groupSize.value.value,
            numberOfEntries: state.numberOfEntries.value.value,
            purpose: state.purpose.value.value,
            registration: state.registration.value.value,
            countryApplyIn: state.countryApplyIn.value,
            delivery: state.delivery.value.value
        };

        //add inputFields for visitors
        for (let i = 0; i < state.visitors.length; i++)
        {
            inputFields['visitors.' + i + '.firstName'] = state.visitors[i].firstName.value;
        }

        let rules = {
            groupSize: "required",
            numberOfEntries: "required",
            purpose: "required",
            registration: "required",
            countryApplyIn: "required",
            delivery: "required"
        };

        for (let i = 0; i < state.visitors.length; i++)
        {
            rules['visitors.' + i + '.firstName'] = 'required';
        }

        let validation = new Validator(inputFields, rules);

        validation.fails(); // true
        validation.passes(); // false

        // Error messages
        Object.keys(inputFields).forEach(inputField => {
            if (validation.errors.first(inputField)) {
                // if (inputField === 'visitors.0.firstName') alert(validation.errors.first(inputField))
                this.updateError(inputField, validation.errors.first(inputField));
            } else {
                this.updateError(inputField, "");
            }
        });
    }

    renderVisitors() {
        let state = this.state;
        // let arr = [];
        // for (let i = 0; i < state.groupSize.value; i++)
        //     arr[i] = i;

        // return arr.map(visitorIndex => {
        return (
            <ToggleTab label="Visitor">
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName="visitors.0.firstName"
                    value={state.visitors[0].firstName.value}
                    visited={state.visitors[0].firstName.visited}
                    label="First name"
                    placeholder="Please enter First name"
                    error={state.visitors[0].firstName.error}
                />
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName="visitors.0.middleName"
                    value={state.visitors[0].middleName.value}
                    visited={state.visitors[0].middleName.visited}
                    label="Middle name"
                    placeholder="Please enter Middle name"
                    error={state.visitors[0].middleName.error}
                />
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName="visitors.0.surName"
                    value={state.visitors[0].surName.value}
                    visited={state.visitors[0].surName.visited}
                    label="Surname"
                    placeholder="Please enter Surname"
                    error={state.visitors[0].surName.error}
                />
                <RadioGroup
                    className="mt-3"
                    handleChange={this.updateField}
                    fieldName="visitors.0.sex"
                    error={state.visitors[0].sex.error}
                    title="Gender"
                    options={[{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]}
                    name="gender"
                />
                <Input
                    type="date"
                    updateField={this.updateField}
                    fieldName="visitors.0.birthDate"
                    value={state.visitors[0].birthDate.value}
                    visited={state.visitors[0].birthDate.visited}
                    label="Date of birth"
                    placeholder=""
                    error={state.visitors[0].birthDate.error}
                />
                <div className="row" style={{ maxWidth: "655px" }}>
                    <div className="col-md-6">
                        <Input
                            className="mt-4"
                            type="country"
                            updateField={this.updateField}
                            fieldName="visitors.0.citizenship"
                            visited={state.visitors[0].citizenship.visited}
                            label="Citizenship"
                            error={state.visitors[0].citizenship.error}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            className="mt-4"
                            type="text"
                            updateField={this.updateField}
                            fieldName="visitors.0.middleName"
                            value={state.visitors[0].passportNumber.value}
                            visited={state.visitors[0].passportNumber.visited}
                            label="Passport number"
                            placeholder="Please enter passport number"
                            error={state.visitors[0].passportNumber.error}
                        />
                    </div>
                </div>

                <div className="row" style={{ maxWidth: "655px" }}>
                    <div className="col-md-6">
                        <Input
                            type="date"
                            className="mt-4"
                            updateField={this.updateField}
                            fieldName="visitors.0.passportIssued"
                            value={state.visitors[0].passportIssued.value}
                            visited={state.visitors[0].passportIssued.visited}
                            label="Date passport issued"
                            placeholder=""
                            error={state.visitors[0].passportIssued.error}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="date"
                            className="mt-4"
                            updateField={this.updateField}
                            fieldName="visitors.0.passportExpired"
                            value={state.visitors[0].passportExpired.value}
                            visited={state.visitors[0].passportExpired.visited}
                            label="Date passport expired"
                            placeholder=""
                            error={state.visitors[0].passportExpired.error}
                        />
                    </div>
                </div>

                <Input
                    type="email"
                    className="mt-4"
                    updateField={this.updateField}
                    fieldName="email"
                    value={state.email.value}
                    visited={state.email.visited}
                    label="Email"
                    placeholder="Please enter email"
                    error={state.email.error}
                />
                <Input
                    type="phone"
                    className="mt-4"
                    updateField={this.updateField}
                    fieldName="phone"
                    value={state.phone.value}
                    visited={state.phone.visited}
                    label="Telephone"
                    error={state.phone.error}
                />
            </ToggleTab>
        );
        // })
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
                            {this.renderVisitors()}
                        </Step>
                        <Step number={2} hidden={state.currentStep !== 2} />
                        <Step number={3} hidden={state.currentStep !== 3} />
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="row" style={{ maxWidth: "710px" }}>
                        <div className="col-sm-6">
                            <Button className="align-self-md-start align-self-center" label="Save progress" />
                        </div>

                        <div className={"col-sm-3 " + (state.currentStep === 0 ? "d-none" : "d-block")}>
                            <Button
                                handleClick={() => this.updateField("currentStep", state.currentStep - 1)}
                                className={"Button_red-border align-self-md-end align-self-center"}
                                label="Previous step"
                            />
                        </div>
                        <div className={"col-sm-3 " + (state.currentStep === 3 ? "d-none" : "d-block")}>
                            <Button
                                handleClick={() => this.updateField("currentStep", state.currentStep + 1)}
                                className="Button_red align-self-md-end align-self-center"
                                label="Next step >"
                            />
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

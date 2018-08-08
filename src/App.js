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

let locationTemplate = {
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
                value: {value: "1", label: "1"},
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
            OptionsNumberOfEntries: [{ value: "Single", label: "Single" }, { value: "Double", label: "Double" }],
            OptionsPurpose: [{ value: "1", label: "Tourist" }, { value: "2", label: "Auto" }],
            OptionsRegistration: [{ value: "1", label: "No registration services needed" }, { value: "2", label: "Registration in Moscow" }],
            OptionsDelivery: [{ value: "1", label: "Email" }, { value: "2", label: "Another option" }],
            OptionsCities: [{ value: "1", label: "Moscow" }, { value: "2", label: "Magadan" }],
            OptionsHotels: [{ value: "1", label: "Vzlyot" }, { value: "2", label: "Park inn" }],
        };

        /******BINDING*****/
        this.updateField = this.updateField.bind(this);
        this.updateError = this.updateError.bind(this);
        this.validate = this.validate.bind(this);
        this.updateField = this.updateField.bind(this);
        this.renderVisitors = this.renderVisitors.bind(this);
        this.updateVisitorsArray = this.updateVisitorsArray.bind(this);
        this.renderArrivalAndDeparture = this.renderArrivalAndDeparture.bind(this);
        this.renderLocations = this.renderLocations.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
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
        if (path === "email.visited") console.log(state);
        eval("state" + code + "=value");
        this.setState(state);
        this.updateVisitorsArray();
        this.validate();
    }

    updateVisitorsArray(){
        let state = this.state;

        let oldVisitorsCount = this.state.visitors.length;
        let newVisitorsCount = this.state.groupSize.value.value;


        if (oldVisitorsCount < newVisitorsCount){
            for (let i = oldVisitorsCount; i < newVisitorsCount; i++)
                state.visitors.push(JSON.parse(JSON.stringify(visitorTemplate)));
        }
        else {
            for (let i = oldVisitorsCount; i > newVisitorsCount; i--)
                state.visitors.pop();
        }

        this.setState(state)
    }

    updateError(path, value) {
        //generate code like [path][path]
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });

        //updateState
        let state = this.state;
        eval("state" + code + ".error=value");
        this.setState(state);
    }

    removeLocation(index){
        if (this.state.locations.length > 1){
            let state = this.state;
            state.locations.splice(index,1);
            this.setState(state);
        }
    }
    addLocation(){
        if (this.state.locations.length < 10){
            let state = this.state;
            state.locations.push(locationTemplate);
            this.setState(state);
        }
    }

    validate() {
        let state = this.state;
        let inputFields = {
            groupSize: state.groupSize.value.value,
            numberOfEntries: state.numberOfEntries.value.value,
            purpose: state.purpose.value.value,
            registration: state.registration.value.value,
            countryApplyIn: state.countryApplyIn.value,
            delivery: state.delivery.value.value,
            email: state.email.value,
            phone: state.phone.value
        };

        //add inputFields for visitors
        for (let i = 0; i < state.visitors.length; i++)
        {
            inputFields['visitors.' + i + '.firstName'] = state.visitors[i].firstName.value;
            inputFields['visitors.' + i + '.middleName'] = state.visitors[i].middleName.value;
            inputFields['visitors.' + i + '.surName'] = state.visitors[i].surName.value;
            inputFields['visitors.' + i + '.sex'] = state.visitors[i].sex.value;
            inputFields['visitors.' + i + '.birthDate'] = state.visitors[i].birthDate.value;
            inputFields['visitors.' + i + '.citizenship'] = state.visitors[i].citizenship.value;
            inputFields['visitors.' + i + '.passportNumber'] = state.visitors[i].passportNumber.value;
            inputFields['visitors.' + i + '.passportIssued'] = state.visitors[i].passportIssued.value;
            inputFields['visitors.' + i + '.passportExpired'] = state.visitors[i].passportExpired.value;

        }

        let rules = {
            groupSize: "required",
            numberOfEntries: "required",
            purpose: "required",
            registration: "required",
            countryApplyIn: "required",
            delivery: "required",
            email:'required|email',
            phone: 'required|regex:/[0-9\-\S]{4,}/i'
        };

        for (let i = 0; i < state.visitors.length; i++)
        {
            rules['visitors.' + i + '.firstName'] = 'required|alpha';
            rules['visitors.' + i + '.middleName'] = 'required|alpha';
            rules['visitors.' + i + '.surName'] = 'required|alpha';
            rules['visitors.' + i + '.sex'] = 'required';
            rules['visitors.' + i + '.birthDate'] = 'required|date';
            rules['visitors.' + i + '.citizenship'] = 'required';
            rules['visitors.' + i + '.passportNumber'] = 'required|alpha_dash';
            rules['visitors.' + i + '.passportIssued'] = 'required|date';
            rules['visitors.' + i + '.passportExpired'] = 'required|date';
        }

        let validation = new Validator(inputFields, rules);

        validation.fails(); // true
        validation.passes(); // false

        // Error messages
        Object.keys(inputFields).forEach(inputField => {
            if (validation.errors.first(inputField)) {
                //we need regex, to replace fieldName (which can be f.e = visitor.1.sex) to just 'This field'
                this.updateError(inputField, validation.errors.first(inputField).replace(/The [a-z0-9\.]+/i, "This"));

            } else {
                this.updateError(inputField, "");
            }
        });
    }

    renderVisitors() {
        let state = this.state;
        let arr = [];
        for (let i = 0; i < state.groupSize.value.value; i++)
            arr[i] = i;

        return arr.map(visitorIndex => {
        return (
            <ToggleTab className="mt-4" label={"Visitor " + (visitorIndex + 1) + (visitorIndex === 0 ? " (Main Applicant)" : "")}>
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".firstName"}
                    value={state.visitors[visitorIndex].firstName.value}
                    visited={state.visitors[visitorIndex].firstName.visited}
                    label="First name"
                    placeholder="Please enter First name"
                    error={state.visitors[visitorIndex].firstName.error}
                />
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".middleName"}
                    value={state.visitors[visitorIndex].middleName.value}
                    visited={state.visitors[visitorIndex].middleName.visited}
                    label="Middle name"
                    placeholder="Please enter Middle name"
                    error={state.visitors[visitorIndex].middleName.error}
                />
                <Input
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".surName"}
                    value={state.visitors[visitorIndex].surName.value}
                    visited={state.visitors[visitorIndex].surName.visited}
                    label="Surname"
                    placeholder="Please enter Surname"
                    error={state.visitors[visitorIndex].surName.error}
                />
                <RadioGroup

                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".sex"}
                    error={state.visitors[visitorIndex].sex.error}
                    title="Gender"
                    options={[{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]}
                    name="sex"
                />
                <Input
                    type="date"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".birthDate"}
                    value={state.visitors[visitorIndex].birthDate.value}
                    visited={state.visitors[visitorIndex].birthDate.visited}
                    label="Date of birth"
                    placeholder=""
                    error={state.visitors[visitorIndex].birthDate.error}
                />
                <div className="row" style={{ maxWidth: "655px" }}>
                    <div className="col-md-6">
                        <Input
                            className="mt-4 mr-2"
                            type="country"
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".citizenship"}
                            visited={state.visitors[visitorIndex].citizenship.visited}
                            label="Citizenship"
                            error={state.visitors[visitorIndex].citizenship.error}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            className="mt-4"
                            type="text"
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".passportNumber"}
                            value={state.visitors[visitorIndex].passportNumber.value}
                            visited={state.visitors[visitorIndex].passportNumber.visited}
                            label="Passport number"
                            placeholder="Please enter passport number"
                            error={state.visitors[visitorIndex].passportNumber.error}
                        />
                    </div>
                </div>

                {visitorIndex === 0 ?
                    [
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
                        />,

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
                    ]
                    :
                    []
                }


            </ToggleTab>
        );
        })
    }

    renderArrivalAndDeparture(){
        let state = this.state;
        let arr = [0];
        if (state.numberOfEntries.value.value === 'Double')
            arr[1] = 1;

        return arr.map(visitorIndex => {
            return (
                <div className="row" style={{ maxWidth: "655px" }}>
                    <div className="col-md-6">
                        <Input
                            type="date"
                            className="mt-4"
                            updateField={this.updateField}
                            fieldName={"arrivalDate" + (visitorIndex + 1)}
                            value={state["arrivalDate" + (visitorIndex + 1)].value}
                            visited={state["arrivalDate" + (visitorIndex + 1)].visited}
                            label={"Entry " + (visitorIndex + 1) + " - Arrival date"}
                            placeholder=""
                            error={state["arrivalDate" + (visitorIndex + 1)].error}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="date"
                            className="mt-4"
                            updateField={this.updateField}
                            fieldName={"departureDate" + (visitorIndex + 1)}
                            value={state["departureDate" + (visitorIndex + 1)].value}
                            visited={state["departureDate" + (visitorIndex + 1)].visited}
                            label={"Entry " + (visitorIndex + 1) + " - Departure date"}
                            placeholder=""
                            error={state["departureDate" + (visitorIndex + 1)].error}
                        />
                    </div>
                </div>
            )
        })
    }

    renderLocations(){
        let state = this.state;
        return [
                state.locations.map((location, locationIndex) => {
                    return [
                        <ToggleTab className="mt-4" label={"Location " + (locationIndex + 1)}>
                            <Input
                                type="select"
                                className="mt-4"
                                updateField={this.updateField}
                                fieldName={"locations[" + locationIndex + "].city"}
                                visited={state.locations[locationIndex].city.visited}
                                label="City"
                                error={state.locations[locationIndex].city.error}
                                options={state.OptionsCities}
                            />
                            <Input
                                type="select"
                                className="mt-4"
                                updateField={this.updateField}
                                fieldName={"locations[" + locationIndex + "].hotel"}
                                visited={state.locations[locationIndex].hotel.visited}
                                label="Hotel"
                                error={state.locations[locationIndex].hotel.error}
                                options={state.OptionsHotels}
                            />
                        </ToggleTab>,
                        <Button className="Button_red-label ml-auto mr-5" handleClick={locationIndex => this.removeLocation(locationIndex)} label={"remove location " + (locationIndex + 1)} />
                    ]
                }),
                <Button className="Button_red-border mr-auto" handleClick={() => this.addLocation()} label={"+add another location"} />
        ]
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
                        <Step number={2} hidden={state.currentStep !== 2}>
                            {this.renderArrivalAndDeparture()}
                            {this.renderLocations()}

                            <RadioGroup

                                updateField={this.updateField}
                                fieldName="userNeedsNewsletter"
                                error={state.userNeedsNewsletter.error}
                                title="Would you like to join our monthly newsletter list"
                                options={[{ value: "1", text: "Yes" }, { value: "2", text: "No" }]}
                                name="userNeedsNewsletter"
                            />
                            <RadioGroup

                                updateField={this.updateField}
                                fieldName="userNeedsJoinMailingList"
                                error={state.userNeedsJoinMailingList.error}
                                title="Would you like to join our mailing list for special offers, news and information"
                                options={[{ value: "1", text: "Yes" }, { value: "2", text: "No" }]}
                                name="userNeedsJoinMailingList"
                            />
                            <RadioGroup

                                updateField={this.updateField}
                                fieldName="userNeedsNewsletter"
                                error={state.userNeedsNewsletter.error}
                                title="I have read and understood the terms and conditions"
                                options={[{ value: "1", text: "Yes" }, { value: "2", text: "No" }]}
                                name="userReadTerms"
                            />
                        </Step>
                        <Step number={3} hidden={state.currentStep !== 3}>
                            <RadioGroup

                                updateField={this.updateField}
                                fieldName="userCompleteForm"
                                error={state.userCompleteForm.error}
                                title="Having completed my application, I agree that the above visa application is suitable."
                                options={[{ value: "1", text: "Yes" }, { value: "2", text: "No" }]}
                                name="userCompleteForm"
                            />
                        </Step>
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

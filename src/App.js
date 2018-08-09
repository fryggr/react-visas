import React, {Component} from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

/********* IMPORT COMPONENTS ********/
import {Header} from "./Components/Header/Header";
import {RadioGroup} from "./Components/RadioGroup/RadioGroup";
import {ToggleTab} from "./Components/ToggleTab/ToggleTab";
import {Input} from "./Components/Input/Input";
import {Button} from "./Components/Button/Button";
import {Step} from "./Components/Step/Step";
import Moment from "moment";

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
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            price: 15.4,
            currency: {
                value: "gbp",
                label: "£ - GBP"
            },
            currencies: [
                {
                    value: "gbp",
                    label: "£ - GBP"
                }, {
                    value: "usd",
                    label: "$ - USD"
                }, {
                    value: "eur",
                    label: "€ - EUR"
                }
            ],
            //this data for StepsNavigation Component
            steps: [
                {
                    stepName: "service details",
                    visited: false
                }, {
                    stepName: "personal details",
                    visited: false
                }, {
                    stepName: "your visit",
                    visited: false
                }, {
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
            OptionsGroupSize: [
                {
                    value: "1",
                    label: "1"
                }, {
                    value: "2",
                    label: "2"
                }, {
                    value: "3",
                    label: "3"
                }
            ],
            OptionsNumberOfEntries: [
                {
                    value: "Single",
                    label: "Single"
                }, {
                    value: "Double",
                    label: "Double"
                }
            ],
            OptionsPurpose: [
                {
                    value: "1",
                    label: "Tourist"
                }, {
                    value: "2",
                    label: "Auto"
                }
            ],
            OptionsRegistration: [
                {
                    value: "1",
                    label: "No registration services needed"
                }, {
                    value: "2",
                    label: "Registration in Moscow"
                }
            ],
            OptionsDelivery: [
                {
                    value: "1",
                    label: "Email"
                }, {
                    value: "2",
                    label: "Another option"
                }
            ],
            OptionsCities: [
                {
                    value: "1",
                    label: "Moscow"
                }, {
                    value: "2",
                    label: "Magadan"
                }
            ],
            OptionsHotels: [
                {
                    value: "1",
                    label: "Vzlyot"
                }, {
                    value: "2",
                    label: "Park inn"
                }
            ]
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
        this.getRestrictForDate = this.getRestrictForDate.bind(this);
        this.showCurrentStep = this.showCurrentStep.bind(this);
        this.makeFieldsVisited = this.makeFieldsVisited.bind(this);
        this.checkIsStepCorrect = this.checkIsStepCorrect.bind(this);
    }

    getRestrictForDate(datePickerName) {
        let state = this.state;
        //prepare data
        let today = Moment();
        var sixMonthAfterToday = Moment().add(182, "day");
        var arrivalDate1 = Moment(state.arrivalDate1.value);
        var arrivalDate2 = Moment(state.arrivalDate2.value);
        var departureDate1 = Moment(state.departureDate1.value);
        var departureDate2 = Moment(state.departureDate2.value);
        var arrivalDate1Plus6Months = Moment(state.arrivalDate1.value).add(6, "month");
        var arrivalDate2Plus6Months = Moment(state.arrivalDate2.value).add(6, "month");
        var departureDate1Plus6Months = Moment(state.departureDate1.value).add(6, "month");
        var departureDate2Plus6Months = Moment(state.departureDate2.value).add(6, "month");
        var thirtyDaysAfterArrival1 = Moment(state.arrivalDate1.value).add(30, "day");
        var thirtyDaysBeforeDeparture1 = Moment(state.departureDate1.value).subtract(30, "day");
        var thirtyDaysAfterArrival2 = Moment(state.arrivalDate2.value).add(30, "day");
        var thirtyDaysBeforeDeparture2 = Moment(state.departureDate2.value).subtract(30, "day");
        var sixMonthBeforePassportExpired = Moment(state.visitors[0].passportExpired.value).subtract(6, "month");

        if (datePickerName === "birthDate" || datePickerName === "passportIssued") {
            return function(current) {
                //должна быть позже сегодня
                return current.isBefore(today);
            };
        } else if (datePickerName === "passportExpired") {
            return function(current) {
                //дожна быть через 6 месяцев после сегодня
                //должна быть после даты первого вьезда + 6 месяцев
                //должна быть после даты первого выезда + 6 месяцев
                //должна быть после даты второго вьезда + 6 месяцев
                //должна быть после даты второго выезда + 6 месяцев
                return (current.isAfter(sixMonthAfterToday) && (current.isAfter(arrivalDate1Plus6Months) || state.arrivalDate1.value === "") && (current.isAfter(arrivalDate2Plus6Months) || state.arrivalDate2.value === "") && (current.isAfter(departureDate1Plus6Months) || state.departureDate1.value === "") && (current.isAfter(departureDate2Plus6Months) || state.departureDate2.value === ""));
            };
        } else if (datePickerName === "arrivalDate1") {
            //должна быть позже сегодня
            //должна быть до даты первого отьезда
            //должна быть до даты второго вьезда
            //должна быть до даты второго выезда
            //должна быть минимум на 6 месяцев раньше даты истечения паспорта
            //должна быть не раньше чем 30 дней с момента даты первого выезда
            return function(current) {
                return (current.isAfter(today) && (current.isBefore(departureDate1) || state.departureDate1.value === "") && (current.isBefore(arrivalDate2) || state.arrivalDate2.value === "") && (current.isBefore(departureDate2) || state.departureDate2.value === "") && (current.isBefore(sixMonthBeforePassportExpired) || state.visitors[0].passportExpired.value === "") && (current.isAfter(thirtyDaysBeforeDeparture1) || state.departureDate1.value === ""));
            };
        } else if (datePickerName === "departureDate1") {
            //должна быть позже сегодня
            //должна быть после даты первого вьезда
            //должна быть до даты второго вьезда
            //должна быть до даты второго выезда
            //должна быть минимум на 6 месяцев раньше даты истечения паспорта
            //должна быть не позже чем на 30 дней после даты первого вьезда
            return function(current) {
                return (current.isAfter(today) && (current.isAfter(arrivalDate1) || state.arrivalDate1.value === "") && (current.isBefore(arrivalDate2) || state.arrivalDate2.value === "") && (current.isBefore(departureDate2) || state.departureDate2.value === "") && (current.isBefore(thirtyDaysAfterArrival1) || state.arrivalDate1.value === "") && (current.isBefore(sixMonthBeforePassportExpired) || state.visitors[0].passportExpired.value === ""));
            };
        } else if (datePickerName === "arrivalDate2") {
            //должна быть после сегодня
            //должна быть после даты первого вьезда
            //должна быть после даты первого выезда
            //дожна быть до даты второго выезда
            //должна быть минимум на 6 месяцев раньше даты истечения паспорта
            //должна быть не раньше чем 30 дней с момента даты второго выезда
            return function(current) {
                return (current.isAfter(today) && (current.isAfter(arrivalDate1) || state.arrivalDate1.value === "") && (current.isAfter(departureDate1) || state.departureDate1.value === "") && (current.isBefore(departureDate2) || state.departureDate2.value === "") && (current.isBefore(sixMonthBeforePassportExpired) || state.visitors[0].passportExpired.value === "") && (current.isAfter(thirtyDaysBeforeDeparture2) || state.departureDate2.value === ""));
            };
        } else if (datePickerName === "departureDate2") {
            //должна быть после сегодня
            //должна быть после даты первого вьезда
            //должна быть после даты первого выезда
            //дожна быть после даты второго въезда
            //должна быть минимум на 6 месяцев раньше даты истечения паспорта
            //должна быть не позже чем на 30 дней после даты второго вьезда
            return function(current) {
                return (current.isAfter(today) && (current.isAfter(arrivalDate1) || state.arrivalDate1.value === "") && (current.isAfter(departureDate1) || state.departureDate1.value === "") && (current.isAfter(arrivalDate2) || state.arrivalDate2.value === "") && (current.isBefore(sixMonthBeforePassportExpired) || state.visitors[0].passportExpired.value === "") && (current.isBefore(thirtyDaysAfterArrival2) || state.arrivalDate2.value === ""));
            };
        }
    }

    // METHODS

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value) {
        let state = this.state;
        //generate code like [path][path]
        let arr = path.split(".");
        let code = "";
        arr.forEach(item => {
            code += "['" + item + "']";
        });

        //updateState

        //make currentStep visited
        let visitedStepIndex;
        if (path.indexOf("currentStep") !== -1) {
            visitedStepIndex = this.state.currentStep;
            console.log("INITIAL ", visitedStepIndex);
            state.steps[visitedStepIndex].visited = true;
            //make fields of visited steps visited
            this.makeFieldsVisited(visitedStepIndex);
        }

        eval("state" + code + "=value");
        this.setState(state);
        if (path.indexOf("groupSize") !== -1)
            this.updateVisitorsArray();
        this.validate();

        if (path.indexOf("currentStep") !== -1) {
            if (!this.checkIsStepCorrect(visitedStepIndex)) {
                console.log("ERROR visitedStepIndex = ", visitedStepIndex);
                state.steps[visitedStepIndex].correct = false;
            } else {
                console.log(" NICE! visitedStepIndex = ", visitedStepIndex);
                state.steps[visitedStepIndex].correct = true;
            }
            this.setState(state);
        }
    }

    makeFieldsVisited(stepIndex) {
        let state = this.state;
        if (stepIndex === 0) {
            state.groupSize.visited = true;
            state.numberOfEntries.visited = true;
            state.purpose.visited = true;
            state.registration.visited = true;
            state.purpose.visited = true;
            state.countryApplyIn.visited = true;
            state.delivery.visited = true;
        }
        if (stepIndex === 1) {
            for (let i = 0; i < this.state.visitors.length; i++) {
                state.visitors[i].firstName.visited = true;
                state.visitors[i].middleName.visited = true;
                state.visitors[i].surName.visited = true;
                state.visitors[i].sex.visited = true;
                state.visitors[i].birthDate.visited = true;
                state.visitors[i].citizenship.visited = true;
                state.visitors[i].passportNumber.visited = true;
                state.visitors[i].passportIssued.visited = true;
                state.visitors[i].passportExpired.visited = true;
            }

            state.email.visited = true;
            state.phone.visited = true;
        }
        if (stepIndex === 2) {
            state.arrivalDate1.visited = true;
            state.departureDate1.visited = true;

            if (state.numberOfEntries.value.value === 'Double') {
                state.arrivalDate2.visited = true;
                state.departureDate2.visited = true;
            }

            for (let i = 0; i < this.state.visitors.length; i++) {
                this.state.locations[i].city.visited = true;
                this.state.locations[i].hotel.visited = true;
            }
        }

        this.setState(state);
    }

    checkIsStepCorrect(stepIndex) {
        let state = this.state;
        let correct = true;
        if (stepIndex === 0) {
            correct = state.groupSize.error == "" && state.numberOfEntries.error == "" && state.purpose.error == "" && state.registration.error == "" && state.purpose.error == "" && state.countryApplyIn.error == "" && state.delivery.error == ""
        }
        if (stepIndex === 1) {
            for (let i = 0; i < this.state.visitors.length; i++) {
                correct = correct && this.state.visitors[i].firstName.error === "";
                correct = correct && this.state.visitors[i].middleName.error === "";
                correct = correct && this.state.visitors[i].surName.error === "";
                correct = correct && this.state.visitors[i].sex.error === "";
                correct = correct && this.state.visitors[i].birthDate.error === "";
                correct = correct && this.state.visitors[i].citizenship.error === "";
                correct = correct && this.state.visitors[i].passportNumber.error === "";
                correct = correct && this.state.visitors[i].passportIssued.error === "";
                correct = correct && this.state.visitors[i].passportExpired.error === "";
            }

            correct = correct && this.state.email.error === "";
            correct = correct && this.state.phone.error === "";
        }

        if (stepIndex === 2) {
            correct = correct && this.state.arrivalDate1.error === "";
            correct = correct && this.state.departureDate1.error === "";

            if (state.numberOfEntries.value.value === 'Double') {
                correct = correct && this.state.departureDate2.error === "";
                correct = correct && this.state.arrivalDate2.error === "";
            }

            for (let i = 0; i < this.state.visitors.length; i++) {
                correct = correct && this.state.locations[i].city.error === "";
                correct = correct && this.state.locations[i].hotel.error === "";
            }
            correct = correct && this.state.userReadTerms.error === "";
        }

        return correct;
    }

    updateVisitorsArray() {
        let state = this.state;

        let oldVisitorsCount = this.state.visitors.length;
        let newVisitorsCount = this.state.groupSize.value.value;

        if (oldVisitorsCount < newVisitorsCount) {
            for (let i = oldVisitorsCount; i < newVisitorsCount; i++)
                state.visitors.push(JSON.parse(JSON.stringify(visitorTemplate)));
            }
        else {
            for (let i = oldVisitorsCount; i > newVisitorsCount; i--)
                state.visitors.pop();
            }

        this.setState(state);
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

    removeLocation(index) {
        if (this.state.locations.length > 1) {
            let updateLocations = JSON.parse(JSON.stringify(this.state.locations));
            updateLocations.splice(index, 1);
            this.setState({locations: updateLocations});
        }
    }
    addLocation() {
        if (this.state.locations.length < 10) {
            let updateLocations = JSON.parse(JSON.stringify(this.state.locations));
            updateLocations.push({
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
            });
            this.setState({locations: updateLocations});
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
            phone: state.phone.value,
            arrivalDate1: state.arrivalDate1.value,
            arrivalDate2: state.arrivalDate2.value,
            departureDate1: state.departureDate1.value,
            departureDate2: state.departureDate2.value,
            userReadTerms: state.userReadTerms.value,
            userCompleteForm: state.userCompleteForm.value
        };

        //add inputFields for visitors
        for (let i = 0; i < state.visitors.length; i++) {
            inputFields["visitors." + i + ".firstName"] = state.visitors[i].firstName.value;
            inputFields["visitors." + i + ".middleName"] = state.visitors[i].middleName.value;
            inputFields["visitors." + i + ".surName"] = state.visitors[i].surName.value;
            inputFields["visitors." + i + ".sex"] = state.visitors[i].sex.value;
            inputFields["visitors." + i + ".birthDate"] = state.visitors[i].birthDate.value;
            inputFields["visitors." + i + ".citizenship"] = state.visitors[i].citizenship.value;
            inputFields["visitors." + i + ".passportNumber"] = state.visitors[i].passportNumber.value;
            inputFields["visitors." + i + ".passportIssued"] = state.visitors[i].passportIssued.value;
            inputFields["visitors." + i + ".passportExpired"] = state.visitors[i].passportExpired.value;
        }

        //add inputFields for location
        for (let i = 0; i < state.locations.length; i++) {
            inputFields["locations." + i + ".city"] = state.locations[i].city.value.value;
            inputFields["locations." + i + ".hotel"] = state.locations[i].hotel.value.value;
        }

        let rules = {
            groupSize: "required",
            numberOfEntries: "required",
            purpose: "required",
            registration: "required",
            countryApplyIn: "required",
            delivery: "required",
            email: "required|email",
            phone: "required|regex:/[0-9-S]{4,}/i",
            arrivalDate1: "required|date",
            arrivalDate2: "required|date",
            departureDate1: "required|date",
            departureDate2: "required|date",
            userReadTerms: "accepted",
            userCompleteForm: "accepted"
        };

        //add rules for visitors
        for (let i = 0; i < state.visitors.length; i++) {
            rules["visitors." + i + ".firstName"] = "required|alpha";
            rules["visitors." + i + ".middleName"] = "required|alpha";
            rules["visitors." + i + ".surName"] = "required|alpha";
            rules["visitors." + i + ".sex"] = "required";
            rules["visitors." + i + ".birthDate"] = "required|date";
            rules["visitors." + i + ".citizenship"] = "required";
            rules["visitors." + i + ".passportNumber"] = "required|alpha_dash";
            rules["visitors." + i + ".passportIssued"] = "required|date";
            rules["visitors." + i + ".passportExpired"] = "required|date";
        }

        //add rules for locations
        for (let i = 0; i < state.locations.length; i++) {
            rules["locations." + i + ".city"] = "required";
            rules["locations." + i + ".hotel"] = "required";
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
        let arr = [];
        for (let i = 0; i < this.state.groupSize.value.value; i++)
            arr[i] = i;

        return arr.map(visitorIndex => {
            return (<ToggleTab className="mt-4" label={"Visitor " + (
                visitorIndex + 1) + (
                    visitorIndex === 0
                    ? " (Main Applicant)"
                    : "")}>
                <Input className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".firstName"} value={this.state.visitors[visitorIndex].firstName.value} visited={this.state.visitors[visitorIndex].firstName.visited} label="First name" placeholder="Please enter First name" error={this.state.visitors[visitorIndex].firstName.error}/>
                <Input className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".middleName"} value={this.state.visitors[visitorIndex].middleName.value} visited={this.state.visitors[visitorIndex].middleName.visited} label="Middle name" placeholder="Please enter Middle name" error={this.state.visitors[visitorIndex].middleName.error}/>
                <Input className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".surName"} value={this.state.visitors[visitorIndex].surName.value} visited={this.state.visitors[visitorIndex].surName.visited} label="Surname" placeholder="Please enter Surname" error={this.state.visitors[visitorIndex].surName.error}/>
                <RadioGroup updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".sex"} error={this.state.visitors[visitorIndex].sex.error} value={this.state.visitors[visitorIndex].sex.value} title="Gender" options={[
                        {
                            value: "Male",
                            text: "Male"
                        }, {
                            value: "Female",
                            text: "Female"
                        }
                    ]} name="sex"/>
                <Input type="date" dateValidator={this.getRestrictForDate("birthDate")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".birthDate"} value={this.state.visitors[visitorIndex].birthDate.value} visited={this.state.visitors[visitorIndex].birthDate.visited} label="Date of birth" placeholder="" error={this.state.visitors[visitorIndex].birthDate.error}/>
                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input className="mt-4 mr-2" type="country" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".citizenship"} value={this.state.visitors[visitorIndex].citizenship.value} visited={this.state.visitors[visitorIndex].citizenship.visited} label="Citizenship" error={this.state.visitors[visitorIndex].citizenship.error}/>
                    </div>
                    <div className="col-md-6">
                        <Input className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportNumber"} value={this.state.visitors[visitorIndex].passportNumber.value} visited={this.state.visitors[visitorIndex].passportNumber.visited} label="Passport number" placeholder="Please enter passport number" error={this.state.visitors[visitorIndex].passportNumber.error}/>
                    </div>
                </div>

                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input type="date" className="mt-4 mr-2" dateValidator={this.getRestrictForDate("passportIssued")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportIssued"} value={this.state.visitors[visitorIndex].passportIssued.value} visited={this.state.visitors[visitorIndex].passportIssued.visited} label="Date passport issued" placeholder="" error={this.state.visitors[visitorIndex].passportIssued.error}/>
                    </div>

                    <div className="col-md-6">
                        <Input type="date" className="mt-4" dateValidator={this.getRestrictForDate("passportExpired")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportExpired"} value={this.state.visitors[visitorIndex].passportExpired.value} visited={this.state.visitors[visitorIndex].passportExpired.visited} label="Date passport expired" placeholder="" error={this.state.visitors[visitorIndex].passportExpired.error}/>
                    </div>
                </div>

                {
                    visitorIndex === 0
                        ? [
                            <Input type="email" className="mt-4" updateField={this.updateField} fieldName="email" value={this.state.email.value} visited={this.state.email.visited} label="Email" placeholder="Please enter email" error={this.state.email.error}/>,

                            <Input type="phone" className="mt-4" updateField={this.updateField} fieldName="phone" value={this.state.phone.value} visited={this.state.phone.visited} label="Telephone" error={this.state.phone.error}/>
                        ]
                        : []
                }
            </ToggleTab>);
        });
    }

    renderArrivalAndDeparture() {
        let arr = [0];
        if (this.state.numberOfEntries.value.value === "Double")
            arr[1] = 1;

        return arr.map(inputIndex => {
            return (<div className="row" style={{
                    maxWidth: "655px"
                }}>
                <div className="col-md-6">
                    <Input dateValidator={this.getRestrictForDate("arrivalDate" + (
                        inputIndex + 1))} type="date" className="mt-4 mr-2" updateField={this.updateField} fieldName={"arrivalDate" + (
                        inputIndex + 1)} value={this.state["arrivalDate" + (
                            inputIndex + 1)].value} visited={this.state["arrivalDate" + (
                            inputIndex + 1)].visited} label={"Entry " + (
                        inputIndex + 1) + " - Arrival date"} placeholder="" error={this.state["arrivalDate" + (
                            inputIndex + 1)].error}/>
                </div>
                <div className="col-md-6">
                    <Input dateValidator={this.getRestrictForDate("departureDate" + (
                        inputIndex + 1))} type="date" className="mt-4" updateField={this.updateField} fieldName={"departureDate" + (
                        inputIndex + 1)} value={this.state["departureDate" + (
                            inputIndex + 1)].value} visited={this.state["departureDate" + (
                            inputIndex + 1)].visited} label={"Entry " + (
                        inputIndex + 1) + " - Departure date"} placeholder="" error={this.state["departureDate" + (
                            inputIndex + 1)].error}/>
                </div>
            </div>);
        });
    }

    renderLocations() {
        let state = this.state;
        return [
            state.locations.map((location, locationIndex) => {
                return [
                    <ToggleTab className="mt-4" label={"Location " + (
                        locationIndex + 1)}>
                        <Input type="select" className="mt-4" updateField={this.updateField} value={state.locations[locationIndex].city.value} fieldName={"locations." + locationIndex + ".city"} visited={state.locations[locationIndex].city.visited} label="City" error={state.locations[locationIndex].city.error} options={state.OptionsCities}/>
                        <Input type="select" className="mt-4" updateField={this.updateField} value={state.locations[locationIndex].hotel.value} fieldName={"locations." + locationIndex + ".hotel"} visited={state.locations[locationIndex].hotel.visited} label="Hotel" error={state.locations[locationIndex].hotel.error} options={state.OptionsHotels}/>
                    </ToggleTab>,
                    <Button className="Button_red-label ml-auto mr-5 mt-3" handleClick={() => this.removeLocation(locationIndex)} label={"remove location " + (
                        locationIndex + 1)}/>
                ];
            }),
            <Button className="Button_red-border mr-auto" handleClick={() => this.addLocation()} label={"+add another location"}/>
        ];
    }

    showCurrentStep() {
        if (this.state.currentStep === 0) {
            return (<Step number={0} hidden={this.state.currentStep !== 0}>
                <Input type="select" updateField={this.updateField} fieldName="groupSize" value={this.state.groupSize.value} visited={this.state.groupSize.visited} label="Group Size" error={this.state.groupSize.error} options={this.state.OptionsGroupSize}/>
                <Input className="mt-4" type="select" updateField={this.updateField} fieldName="numberOfEntries" value={this.state.numberOfEntries.value} visited={this.state.numberOfEntries.visited} label="Number of entries" error={this.state.numberOfEntries.error} options={this.state.OptionsNumberOfEntries}/>
                <Input className="mt-4" type="select" updateField={this.updateField} fieldName="purpose" value={this.state.purpose.value} visited={this.state.purpose.visited} label="Purpose of visit" error={this.state.purpose.error} options={this.state.OptionsPurpose}/>
                <Input className="mt-4" type="select" updateField={this.updateField} fieldName="registration" value={this.state.registration.value} visited={this.state.registration.visited} label="Registration" error={this.state.registration.error} options={this.state.OptionsRegistration}/>
                <Input className="mt-4" type="country" updateField={this.updateField} fieldName="countryApplyIn" value={this.state.countryApplyIn.value} visited={this.state.countryApplyIn.visited} label="Country appling in" error={this.state.countryApplyIn.error}/>
                <Input className="mt-4" type="select" updateField={this.updateField} fieldName="delivery" value={this.state.delivery.value} visited={this.state.delivery.visited} label="Delivery option" error={this.state.delivery.error} options={this.state.OptionsDelivery}/>
            </Step>);
        } else if (this.state.currentStep === 1)
            return (<Step number={1} hidden={this.state.currentStep !== 1}>
                {this.renderVisitors()}
            </Step>);
        else if (this.state.currentStep === 2)
            return (<Step number={2} hidden={this.state.currentStep !== 2}>
                {this.renderArrivalAndDeparture()}
                {this.renderLocations()}

                <RadioGroup updateField={this.updateField} fieldName="userNeedsNewsletter" error={this.state.userNeedsNewsletter.error} title="Would you like to join our monthly newsletter list" options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userNeedsNewsletter"/>
                <RadioGroup updateField={this.updateField} fieldName="userNeedsJoinMailingList" error={this.state.userNeedsJoinMailingList.error} title="Would you like to join our mailing list for special offers, news and information" options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userNeedsJoinMailingList"/>
                <RadioGroup updateField={this.updateField} fieldName="userReadTerms" error={this.state.userReadTerms.error} value={this.state.userReadTerms.value} title="<b>I have read and understood the <a style='color:black;text-decoration:underline' href='http://realrussia.co.uk/Portals/0/files/Visa-Terms.pdf'>terms and conditions</a></b>" options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userReadTerms"/>
            </Step>);
        else if (this.state.currentStep === 3)
            return (<Step number={3} hidden={this.state.currentStep !== 3}>
                <RadioGroup updateField={this.updateField} fieldName="userCompleteForm" error={this.state.userCompleteForm.error} value={this.state.userCompleteForm.value} title="Having completed my application, I agree that the above visa application is suitable." options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userCompleteForm"/>
            </Step>);
        }

    render() {
        return (<div className="App text-center text-md-left">
            <Header updateField={this.updateField} steps={this.state.steps} currentStep={this.state.currentStep} currencies={this.state.currencies} currency={this.state.currency} price={this.state.price}/>

            <div className="App__container container">
                <div className="container px-0 mr-auto ml-0">
                    <div className="row py-3">
                        <div className="d-flex col-md-6 flex-column flex-md-row">
                            <Button
                                label="retrieve saved application"
                                className={
                                    "mr-3 " + (
                                        this.state.currentStep !== 0
                                        ? "d-none"
                                        : "d-block")
                                    }
                                text={
                                    (
                                        this.state.currentStep !== 0
                                        ? ""
                                        : "CONTINUE a saved existing application")
                                    }
                            />
                            <Button
                                label="save progress"
                                text="SAVE your current progress"
                            />
                        </div>
                        <div className="ml-auto col-md-4">
                            <Button label="I am returning client" className="Button_red-border" text="RECOVER your personal details quickly to pre-fill your application"/>
                        </div>
                    </div>

                    {this.showCurrentStep()}
                </div>
            </div>
            <div className="container mt-4">
                <div className="row" style={{
                        maxWidth: "710px"
                    }}>
                    <div className="col-sm-6">
                        <Button className="align-self-md-start align-self-center" label="Save progress"/>
                    </div>

                    <div className={
                            ((this.state.currentStep === 3) ? "col-sm-6 d-block" : (this.state.currentStep !== 0) ? "col-sm-3 d-block"  : "d-none")
                        }>
                        <Button
                            handleClick={() => this.updateField("currentStep", this.state.currentStep - 1)}
                            className={"Button_red-border align-self-md-end align-self-center"}
                            label="Previous step"
                        />
                    </div>
                    <div className={
                            ((this.state.currentStep === 0) ? "col-sm-6 d-block" : (this.state.currentStep !== 3) ? "col-sm-3 d-block"  : "d-none")
                        }>
                        <Button
                            handleClick={() => this.updateField("currentStep", this.state.currentStep + 1)}
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

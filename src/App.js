import React, {Component} from "react";
/******** STYLES IMPORT *********/
import "./App.css";
import "./Components/Select/Select.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";


/*************FOR GET REQUESTS*************/
import axios from 'axios';

/********* IMPORT COMPONENTS ********/
import { Header } from "./Components/Header/Header";
import { RadioGroup } from "./Components/RadioGroup/RadioGroup";
import { ToggleTab } from "./Components/ToggleTab/ToggleTab";
import { Input } from "./Components/Input/Input";
import { Info } from "./Components/Info/Info";
import { Button } from "./Components/Button/Button";
import { Step } from "./Components/Step/Step";
import { Sticky } from "./Components/Sticky/Sticky";
import Moment from "moment";
import _ from 'lodash';
import visitorTemplate from './utils/visitorTemplate';
import state from './utils/state';
// import Inputmask from "inputmask";
// import InputMask from 'react-input-mask';
import $ from "jquery";

/**********HELPERS FUNCTIONS**************/
import daysBetween from './utils/daysBetweenDates';

/**********IMAGES*******/
import americanExpress from "./Components/Step/img/AE.jpg";
import mastercard from "./Components/Step/img/mastercard.gif";
import visaDebit from "./Components/Step/img/visa-debit.png";
import visa from "./Components/Step/img/Verified-Visa.gif";
import clocksImg from "./Components/Step/img/clocks.png";
import successIcon from "./Components/Step/img/success-icon.png";
import loadIcon from "./Components/Step/img/progressbar2.gif";

/************FOR VALIDATION***********/
let Validator = require("validatorjs");
const plugins = {
    dvr: Validator
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = state;

        document.body.onclick = (e) => {
            if(!e.target.closest('.Input') && !e.target.closest('.hint') && !e.target.closest('.RadioGroup')){
                this.updateCurrentHint("");
            }
        }

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
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.renderAuto = this.renderAuto.bind(this);
        this.priceCalculate = this.priceCalculate.bind(this);
        this.updateCurrentHint = this.updateCurrentHint.bind(this);
        this.validateVisitedStep = this.validateVisitedStep.bind(this);
        this.customValidation = this.customValidation.bind(this);
        this.saveApplication = this.saveApplication.bind(this);
        this.retrieveApplication = this.retrieveApplication.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.registration7Days = this.registration7Days.bind(this);
        this.createPaymentService = this.createPaymentService.bind(this);
        this.scrollPage = this.scrollPage.bind(this);
        this.showSavePopup = this.showSavePopup.bind(this);
        this.closeSavePopup = this.closeSavePopup.bind(this);
        this.returningClient = this.returningClient.bind(this);
    }

    scrollPage(){
        window.scrollTo(0,0);
    }

    registration7Days(date, days){
        date = Moment(date);
        while (days > 0) {
          date = date.add(1, 'days');
          // decrease "days" only if it's a weekday.
          if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
            days -= 1;
          }
        }
        return date;
    }

    componentWillMount(){
      this.getDataFromServer();
      axios.get('https://ipinfo.io')
           .then(response =>{
               this.setState({usersCountry: response.data.country});
               this.setState({countryApplyIn: {value: this.state.usersCountry}})
               visitorTemplate.citizenship =  {value: this.state.usersCountry};

           });

    }

    returningClient(returnPassportNumber, returnBirthDate){
        window.Visas.Russian.TVSD.TouristVSDWebService.Current.getApplicant(returnPassportNumber, returnBirthDate, (applicant) => {
            alert("success");
            let returnState = applicant;
            let client = [];
            let groupSize = {};
            let visitorTemplate2 = JSON.parse(JSON.stringify(visitorTemplate));
            groupSize.value = {};
            groupSize.value.value = "1";
            groupSize.value.label = "1";
            groupSize.error = '';
            groupSize.visited = '';
            visitorTemplate2.birthDate.value = Moment(returnState.BirthDate).format("DD MMM YYYY");
            visitorTemplate2.passportIssued.value = Moment(returnState.Passport.IssueDate).format("DD MMM YYYY");
            visitorTemplate2.passportExpired.value = Moment(returnState.Passport.ExpireDate).format("DD MMM YYYY");
            visitorTemplate2.citizenship.value = returnState.Passport.Citizenship;
            visitorTemplate2.passportNumber.value = returnState.Passport.PassportNumber;
            visitorTemplate2.firstName.value = returnState.Firstname;
            visitorTemplate2.middleName.value = returnState.Middlename;
            visitorTemplate2.surName.value = returnState.Surname;
            visitorTemplate2.sex.value = returnState.Gender;
            client.push(visitorTemplate2);
            this.setState({visitors: client, groupSize: groupSize});
            console.log(this.state.visitors, this.state.groupSize);
        },
        ()=> {
            alert("Error");
        });
        this.setState({showReturnForm: 0});
    }

    createOrder(){
        if(this.state.userCompleteForm.value === "1"){
            var Payments = window.Payments;
            var paymentService = new Payments.PaymentService({
                proxyOptions: {
                    hostUrl: "https://devsecurepay.realrussia.devserver"
                }
            });

            let data = this.sendFormData();

            var TouristVSDWebService = new Promise((resolve, reject) => {
                window.Visas.Russian.TVSD.TouristVSDWebService.Current.createOrder(data, (order)=>{
                    this.order = order;
                    this.state.referenceNumber = this.order.ReferenceNumber;
                    console.log(JSON.stringify(order, null, '\t'));
                    console.log('success');
                    // return order;
                    resolve(order);
                })

            });

            TouristVSDWebService.then(order => {
                var paymentRequest = {
                    orderId: "SSSD-15311-BBDEF877-TT",
                    source: "visas",
                    amount: order.Price.Total,
                    currency: order.Currency.toUpperCase(),
                    description: "test order"
                };
                paymentService.getPaymentMethodMetadata(paymentRequest, (metadata) => {
                    alert("Success");
                    this.state.valdationData = metadata;
                    this.setState(this.state);
                },
                ()=> {
                    alert("Error");
                })
            })
        }
    }

    sendFormData(){
        let formData = {};

        function getISOName(country){
            let countryApplyIn = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(country);
            return countryApplyIn;
        }
            formData["Application"] = {
                "GroupCount": this.state.visitors.length,
                "Applicants": [],
                "ConsulateCountry": getISOName(this.state.usersCountry),
            }
            formData["ServiceDetails"] = {
                "RegistrationType": this.state.registration.value.value
            }
            let delivery = {};

            delivery["DeliveryType"] = this.state.delivery.value.value;
            delivery["OtherAddress"] = "OtherAddress";
            formData["ServiceDetails"]["Delivery"] = delivery;

            formData["Currency"] = this.state.currency.value.toUpperCase();
            formData["PartnerId"] = "";
                // if(prop === 'visitors'){

            for (let i = 0; i < this.state.visitors.length; i++) {
                let newApplicant = {};
                let newApplicantPassport = {};

                newApplicant["Firstname"] = this.state.visitors[i].firstName.value;
                newApplicant["Middlename"] = this.state.visitors[i].middleName.value;
                newApplicant["Surname"] = this.state.visitors[i].surName.value;
                newApplicant["Gender"] = this.state.visitors[i].sex.value;
                newApplicant["BirthDate"] = Moment(this.state.visitors[i].birthDate.value).format("DD MMMM YYYY");

                newApplicantPassport["Citizenship"] = getISOName(this.state.visitors[i].citizenship.value);
                newApplicantPassport["IssueDate"] = Moment(this.state.visitors[i].passportIssued.value).format("DD MMMM YYYY");
                newApplicantPassport["ExpireDate"] = Moment(this.state.visitors[i].passportExpired.value).format("DD MMMM YYYY");
                newApplicantPassport["PassportNumber"] = this.state.visitors[i].passportNumber.value;
                newApplicant["Passport"] = newApplicantPassport;

                formData["Application"]["Applicants"].push(newApplicant);
            }
            let newVisitDetails = {};
            let visit1 = {};
            newVisitDetails["EntryType"] = this.state.numberOfEntries.value.value;
            newVisitDetails["EntryTypeId"] = 1;
            newVisitDetails["PurposeOfVisit"] = this.state.purpose.value.value;
            visit1["EntryDate"] = Moment(this.state.arrivalDate1.value).format("DD MMMM YYYY");
            visit1["ExitDate"] = Moment(this.state.departureDate1.value).format("DD MMMM YYYY");
            if(this.state.numberOfEntries.value.value === "Double entry visa") {
                newVisitDetails["EntryTypeId"] = 2;
                let visit2 = {};
                visit2["EntryDate"] = Moment(this.state.arrivalDate2.value).format("DD MMMM YYYY");
                visit2["ExitDate"] = Moment(this.state.departureDate2.value).format("DD MMMM YYYY");
                newVisitDetails["Visit2"] = visit2;
            }
            newVisitDetails["Visit1"] = visit1;
            let newItineraryLegs = [];
            for (let i = 0; i < this.state.locations.length; i++) {
                let newLeg = {};
                newLeg["Hotel"] = this.state.locations[i].hotel.value.value
                newLeg["City"] = this.state.locations[i].city.value.value
                newItineraryLegs.push(newLeg);
            }
            let newAutoTourismDetails = {};
            newAutoTourismDetails["VehicleMake"] = this.state.autoModel.value.value;
            newAutoTourismDetails["VehicleColor"] = this.state.autoColor.value.value;
            newAutoTourismDetails["VehiclePlateNumber"] = this.state.autoNumber.value;
            newAutoTourismDetails["VehicleType"] = this.state.autoType.value;
            formData["Application"]["VisitDetails"] = newVisitDetails;
            newVisitDetails["ItineraryLegs"] = newItineraryLegs;
            newVisitDetails["AutoTourismDetails"] = newAutoTourismDetails;

            let newContacts = {};
            newContacts["Email"] = this.state.email.value;
            newContacts["Phone"] = this.state.phone.value;
            formData["Application"]["Contacts"] = newContacts;


        // console.log(formData);
        return formData;
        // axios({
        //     method: 'post',
        //     url: 'https://ipinfo.io/',
        //     data: formData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        // .then(function(response){
        //     console.log(response);
        // })
        // .catch(function(response){
        //     console.log(response);
        // })
    }

    retrieveApplication() {
        let retrievedState = JSON.parse(localStorage['state']);
        console.log(retrievedState);

        retrievedState.arrivalDate1.value !== '' ? retrievedState.arrivalDate1.value = Moment(retrievedState.arrivalDate1.value).format("DD MMM YYYY") : '';
        retrievedState.arrivalDate2.value !== '' ? retrievedState.arrivalDate2.value = Moment(retrievedState.arrivalDate2.value).format("DD MMM YYYY") : '';
        retrievedState.departureDate1.value !== '' ? retrievedState.departureDate1.value = Moment(retrievedState.departureDate1.value).format("DD MMM YYYY") : '';
        retrievedState.departureDate2.value !== '' ? retrievedState.departureDate2.value = Moment(retrievedState.departureDate2.value).format("DD MMM YYYY") : '';
        for (let i = 0; i < retrievedState.visitors.length; i++) {
            retrievedState.visitors[i].birthDate.value !== '' ? retrievedState.visitors[i].birthDate.value = Moment(retrievedState.visitors[i].birthDate.value).format("DD MMM YYYY") : '';
            retrievedState.visitors[i].passportIssued.value !== '' ? retrievedState.visitors[i].passportIssued.value = Moment(retrievedState.visitors[i].passportIssued.value).format("DD MMM YYYY") : '';
            retrievedState.visitors[i].passportExpired.value !== '' ? retrievedState.visitors[i].passportExpired.value = Moment(retrievedState.visitors[i].passportExpired.value).format("DD MMM YYYY") : '';
        }
        this.setState(retrievedState);
    }

    saveApplication() {
        let state = JSON.stringify(this.state);
        localStorage.setItem('state', state);
    }

    showSavePopup(){
        this.setState({showPopup: 1});
        document.body.style.overflow = "hidden";
        document.querySelector(".App").style.position = "relative";
    }

    closeSavePopup(){
        document.body.style.overflow = "auto";
        this.setState({showPopup: 0});
        document.querySelector(".App").style.position = "static";
    }

    showLoader(){
        this.setState({showLoader: 1});
        document.body.style.overflow = "hidden";
        document.querySelector(".App").style.position = "relative";
    }

    hideLoader(){
        document.body.style.overflow = "auto";
        this.setState({showLoader: 0});
        document.querySelector(".App").style.position = "static";
    }

    updateCurrentHint(fieldName){
        this.setState({currentHint: fieldName})
    }

    getDataFromServer(){
        let state = this.state;

        var groupSize = document.querySelectorAll('.input-group-size option');
        var visitPurpose = document.querySelectorAll('.input-purpose option');
        var entriesNumber = document.querySelectorAll('.input-entries option');
        var registration = document.querySelectorAll('.input-registration option');
        var optionsDelivery = document.querySelectorAll('.input-delivery option');
        var optionsCities = document.querySelectorAll('datalist#browsers option');
        var autoModel = document.querySelectorAll('.input-vehicle-make option');
        var autoColor = document.querySelectorAll('.input-vehicle-color option');
        var currencyRates = document.querySelectorAll('[name="currency"] option');


        var newGroup = [],
            newVisitPurpose = [],
            newEntriesNumber = [],
            newRegistration = [],
            newOptionsDelivery = [],
            newOptionsCities = [],
            newAutoModel = [],
            newAutoColor= [],
            newCurrencyRates = [];

        getData(groupSize, newGroup);
        getData(visitPurpose, newVisitPurpose);
        getData(entriesNumber, newEntriesNumber);
        getDataInsideTag(registration, newRegistration);
        getDataInsideTag(optionsDelivery, newOptionsDelivery);
        getData(optionsCities, newOptionsCities);
        getData(autoModel, newAutoModel);
        getData(autoColor, newAutoColor);
        getData(autoColor, newAutoColor);
        getData(currencyRates, newCurrencyRates);
        state.OptionsGroupSize = newGroup.slice();
        state.OptionsPurpose = newVisitPurpose.slice();
        state.OptionsNumberOfEntries = newEntriesNumber.slice();
        state.OptionsRegistration = newRegistration.slice();
        state.OptionsDelivery = newOptionsDelivery.slice();
        state.OptionsCities = newOptionsCities.slice();
        state.OptionsAutoModels = newAutoModel.slice();
        state.OptionsAutoColors = newAutoColor.slice();
        state.OptionsCurrenciesRate = newCurrencyRates.slice();

        function getData(obj, array) {
          obj.forEach(function (domItem) {
            var newObj = {};
            newObj.value = domItem.value;
            newObj.label = domItem.innerHTML;
            array.push(newObj);
          });
        }

        function getDataInsideTag(obj, array) {
          obj.forEach(function (domItem) {
            var newObj = {};
            newObj.value = domItem.value;
            newObj.label = domItem.innerHTML;
            array.push(newObj);
          });
        }
    }

    createPaymentService() {
        let state = this.state;
        let paymentId = '';
        var Payments = window.Payments;

        var paymentService = new Payments.PaymentService({
            proxyOptions: {
                hostUrl: "https://devsecurepay.realrussia.devserver"
            }
        });

        var data = {
            paymentRequest: {
                orderId: this.order.ReferenceNumber,
                source: "visas",
                amount: this.order.Price.Total,
                currency: this.order.Currency.toUpperCase(),
                description: "test order"
            },
            card: {
                number: this.state.cardNumber.value,
                cardholderName: this.state.cardholderName.value,
                expirationDate: this.state.cardExpirationDate.value,
                cvv: this.state.cardCVV.value,
                postCode: this.state.cardpostCode.value,
                streetAddress: this.state.cardstreetAddress.value
            }
        };

        paymentService.pay({
            data: data,
            onResult: (payment) => {
                alert("Success payment " + payment.Id);
                state.paymentId = payment.Id;
                this.setState({paymentId: payment.Id});
                this.hideLoader();
            },
            onError: (errorMessage, modelState) => {
                alert("Error has occured: " + errorMessage);
            }
        });
    }

    getRestrictForDate(datePickerName, visitorIndex) {
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
        if (state.visitors.length > 0)
          var sixMonthBeforePassportExpired = Moment(state.visitors[0].passportExpired.value).subtract(6, "month");
        else
          sixMonthBeforePassportExpired = new Date().setFullYear(3000);

        if (datePickerName === "cardExpirationDate") {
            return function(current) {
                return current.isAfter(today);
            }
        }
        else if (datePickerName === "returnBirthDate") {
            return function(current) {
                return current.isBefore(today);
            }
        }
        else if (datePickerName === "passportIssued") {
            return function(current) {
                // дата открытия паспорта должна быть позже даты рождения и раньше сегодняшней даты
                return current.isBefore(today) && (current.isAfter(Moment(state.visitors[visitorIndex].birthDate.value)) || state.visitors[visitorIndex].birthDate.value === "")
            }
        }
        else if (datePickerName === "birthDate") {
            return function(current) {
                // дата рождения должна быть раньше сегодняшней даты и раньше даты открытия паспорта
                return (current.isBefore(today) && (current.isBefore(Moment(state.visitors[visitorIndex].passportIssued.value)) || state.visitors[visitorIndex].passportIssued.value === ""))
            }
        }
        else if (datePickerName === "passportExpired") {
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

    validateVisitedStep(path){
        let state = this.state;
      //make currentStep visited
      let visitedStepIndex;
      if (path.indexOf("currentStep") !== -1) {
          visitedStepIndex = this.state.currentStep;
          state.steps[visitedStepIndex].visited = true;
          //make fields of visited steps visited
          this.makeFieldsVisited(visitedStepIndex);
          this.validate();
          if (!this.checkIsStepCorrect(visitedStepIndex)) {
              state.steps[visitedStepIndex].correct = false;
          } else {
              state.steps[visitedStepIndex].correct = true;
          }
          this.setState(state);
      }
    }

    customValidation(path, value) {
     let state = this.state;

     // validation for payment fields
      if (path.indexOf("cardExpirationDate") !== -1 && path.indexOf("visited") === -1) {
          state.cardExpirationDate.value !== '' ? state.cardExpirationDate.value = Moment(state.cardExpirationDate.value).format("MM/YY") : '';
      }

     // console.log(state.cardExpirationDate.value);
     // this.setState(state, () => {console.log(state.cardExpirationDate.value);});

     if(path.indexOf("visited") === -1) {
         if(state.cardNumber.value !== "" && !window.cardValidator.number(state.cardNumber.value).isValid){
             console.log('cardNumber not valid');
             state.cardNumber.error = this.state.valdationData.Properties.Number.ValidationRules.brainTreeNumber.ErrorMessage;
             this.updateError(state.cardNumber.value, state.cardNumber.error);

         }
         if(state.cardCVV.value !== "" && !window.cardValidator.cvv(state.cardCVV.value).isValid){
             console.log('cardCVV not valid');
             state.cardCVV.error = this.state.valdationData.Properties.Cvv.ValidationRules.brainTreeCVV.ErrorMessage;
             this.updateError(state.cardCVV.value, state.cardCVV.error);

         }

         // if(state.cardExpirationDate.value !== ""){
         //     var customExpiryDate = Moment(state.cardExpirationDate.value).format("MM/YY");
         //     state.cardExpirationDate.value = customExpiryDate;
         //     console.log(customExpiryDate);
             if(state.cardExpirationDate.value !== "" && !window.cardValidator.expirationDate(state.cardExpirationDate.value).isValid){
                 console.log(state.cardExpirationDate.value);
                 console.log('cardExpirationDate not valid');
                 state.cardExpirationDate.error = this.state.valdationData.Properties.ExpirationDate.ValidationRules.brainTreeExpirationDate.ErrorMessage;
                 this.updateError(state.cardExpirationDate.value, state.cardExpirationDate.error);

             }
         // }

         if(state.cardpostCode.value !== "" && !window.cardValidator.postalCode(state.cardpostCode.value).isValid){
             console.log('cardpostCode not valid');
             state.cardpostCode.error = this.state.valdationData.Properties.PostalCode.ValidationRules.brainTreePostalCode.ErrorMessage;
             this.updateError(state.cardpostCode.value, state.cardpostCode.error);

         }
         this.setState(state);
     }


     if (path.indexOf("city") !== -1 && path.indexOf("visited") === -1) {
       window.Visas.Russian.HotelsServiceProxy.Current.getHotels(value.value, data => {
         state.OptionsHotels = [];
         data.forEach(hotel => {
           state.OptionsHotels.push({
             value: hotel.hotelName,
             label: hotel.hotelName
           });

         });


         let locationIndex = path.split(".")[1];
         state.locations[locationIndex].OptionsHotels = [];

         data.forEach(hotel => {
             state.locations.forEach((item,index) => {
                state.locations[index].OptionsHotels.push({
                  value: hotel.hotelName,
                  label: hotel.hotelName
                });
            })
         });


         state.locations[locationIndex].hotel.value = {};
         if (state.locations[locationIndex].hotel.visited) state.locations[locationIndex].hotel.error = "This field is required";
         this.setState(state);
       });
    }

     if (path.indexOf("groupSize") !== -1) this.updateVisitorsArray();

     //проверяем, заполнил ли пользователь все предыдущие поля
     if (path.indexOf("userCompleteForm") !== -1 && value === "1") {

       this.makeFieldsVisited(1);
       this.makeFieldsVisited(2);
       this.makeFieldsVisited(3);
       // this.makeFieldsVisited(4);
       this.validate();
       state["steps"][1].correct = this.checkIsStepCorrect(1);
       state["steps"][2].correct = this.checkIsStepCorrect(2);
       state["steps"][3].correct = this.checkIsStepCorrect(3);
       // state["steps"][4].correct = this.checkIsStepCorrect(4);
       if (!state["steps"][1].correct || !state["steps"][2].correct || !state["steps"][3].correct) {
         alert("You have errors!");
         state["userCompleteForm"].value = "2";
         state["userCompleteForm"].error = "You must accept the terms and conditions to complete your order.";
         this.setState(state);
       } else {
         state["userCompleteForm"].value = value;
         this.setState(state);
       }
     }

     // console.log(path, value);

     if (path.indexOf("makePayment") !== -1 && value === 4) {
         // console.log(path, value);
         this.makeFieldsVisited(4);
         this.validate();
         state["steps"][4].correct = this.checkIsStepCorrect(4);
         if (!state["steps"][4].correct) {
             alert("You have errors!");
             this.setState(state);
         }
         else {
             this.createPaymentService();
             state.completePayment = 1;
         }
     }

     if (path.indexOf("countryApplyIn") !== -1 && path.indexOf("visited") === -1) {

       let countryApplyIn = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(state.countryApplyIn.value);
       let textcountryApplyIn = window.Visas.Russian.RussianConsulateSettignsRepository.Current.GetTouristNoteByCountry(countryApplyIn);
       state.countryApplyInNotesText = textcountryApplyIn;
       state.countryApplyInFullName = countryApplyIn;



       this.setState(state);
     }

     if (path.indexOf("citizenship") !== -1 && path.indexOf("visited") === -1){
         let arr = [];
         for (let i = 0; i < this.state.groupSize.value.value; i++)
             arr[i] = i;

             // let citizenship = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(state.countryApplyIn.value);
             // let citizenshipText = window.Visas.Russian.RussianConsulateSettignsRepository.Current.GetTouristNoteByCountry(countryApplyIn);
             // console.log(countryApplyIn);
             // console.log(textcountryApplyIn);
             // state.citizenshipText = textcountryApplyIn;
             // state.citizenship = countryApplyIn;



          arr.forEach(visitorIndex => {

              // state.visitors[visitorIndex].citizenshipCountryText = 'Some text about citizenship';
            // console.log(visitorIndex);
            // console.log(state.visitors[visitorIndex].citizenship.value);
            let citizenship = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(state.visitors[visitorIndex].citizenship.value);
            // let citizenship = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(state.countryApplyIn.value);
            // let citizenshipText = window.Visas.Russian.RussianConsulateSettignsRepository.Current.GetTouristNoteByCountry(citizenship);
            // console.log("citizenship: ", citizenship);
            if(citizenship === null){
                state.visitors[visitorIndex].citizenship.error = "You can not apply for a visa"
            }
            // console.log(citizenshipText);
            // state.visitors[visitorIndex].citizenshipCountry = citizenship;
            // state.visitors[visitorIndex].citizenshipCountryText = citizenshipText;

            window.Visas.Russian.TVSD.TouristVSDWebService.Current.GetCitizenshipSpecificMessage(citizenship, (message) => {
                // console.log(message);
                // console.log("citizenship: ", citizenship);
                state.visitors[visitorIndex].citizenshipCountryText = message;
                // console.log(state.visitors[visitorIndex].citizenshipCountryText);
                 this.setState(state);
             });

            window.Visas.Russian.Rules.RuleChecker.Current.IsTouristVSDServiceAvailable(citizenship, (isAvailable ) => {
                // console.log("citizenship: ", citizenship);
                // console.log("isAvailable: ", isAvailable);
                if(isAvailable === false ){
                    state.visitors[visitorIndex].citizenship.error = "You can not apply for a visa"
                }
                 this.setState(state);

            }, () => {
                // console.log("fail");
                state.visitors[visitorIndex].citizenship.error = "You can not apply for a visa";
                this.setState(state);
            })

          })
     }

     if (path.indexOf("groupSize") !== -1 || path.indexOf("registration") !== -1 || path.indexOf("numberOfEntries") !== -1 || path.indexOf("currency") !== -1)
       this.priceCalculate();

     if ((path.indexOf("registration") !== -1 || path.indexOf("arrivalDate") !== -1 || path.indexOf("departureDate") !== -1) && path.indexOf("visited") === -1) {
       //если регистрация выбрана
       if (typeof this.state.registration.value.value !== "undefined") {
         //если регистрация нужна
         if (this.state.registration.value.value !== "NO") {
           //ДЛЯ ПЕРВОЙ ДАТЫ
           if ((typeof this.state.arrivalDate1.value === "object" && typeof this.state.departureDate1.value === "object")) {
             //если между датами меньше 7 дней
             let arrivalDate1 = this.registration7Days(this.state.arrivalDate1.value.toDate(), 8);
             // let arrivalDate2 = Moment();
             if (typeof this.state.arrivalDate2.value === "object" && typeof this.state.departureDate2.value === "object"){
                 let arrivalDate2 = this.registration7Days(this.state.arrivalDate2.value.toDate(), 8);
                 if ((this.state.departureDate1.value.toDate() <= arrivalDate1.toDate()) || (this.state.departureDate2.value.toDate() <= arrivalDate2.toDate())) {
                   //вывести alert о том, что регистрация необязательна

                   alert("According to Russian law, you do not need to register your visa if you are staying in any one city for less than 7 working days during each visit.");
                 }
             }
             else {
                 if ((this.state.departureDate1.value.toDate() <= arrivalDate1.toDate())) {
                   //вывести alert о том, что регистрация необязательна

                   alert("According to Russian law, you do not need to register your visa if you are staying in any one city for less than 7 working days during each visit.");
                 }
             }
             // if ((daysBetween(this.state.arrivalDate1.value.toDate(), this.state.departureDate1.value.toDate()) < 7) || (daysBetween(this.state.arrivalDate2.value.toDate(), this.state.departureDate2.value.toDate()) < 7)) {


             //ДЛЯ ВТООРОЙ ДАТЫ
             // if (typeof this.state.arrivalDate2.value === "object" && typeof this.state.departureDate2.value === "object") {
             //   //если между датами меньше 7 дней
             //   let arrivalDate2 = this.registration7Days(this.state.arrivalDate2.value.toDate(), 8);
             //   if (this.state.departureDate2.value.toDate() <= arrivalDate2.toDate()) {
             //     //вывести alert о том, что регистрация необязательна
             //
             //     alert("Your tourney less than 7 days, registration is not required");
             //   }
             // }
           }
         }
       }
     }

     if (path.indexOf("city") !== -1 && path.indexOf("visited") === -1) {
       if (value.value === "Makhachkala" || value.value === "Pyatigorsk" || value.value === "Vladikavkaz" || value.value === "Magas") {
         alert(`Please note that if you are travelling to ${value.value}, it might take longer than usual to process your visa. Please check with your local Russian consulate before applying.`);
       }
     }

     if ((path.indexOf("registration") !== -1 || path.indexOf("country") !== -1) && path.indexOf("visited") === -1) {
       let country = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(this.state.countryApplyIn.value);
       if (this.state.registration.value != "NO") {
         if (country === "Malaysia" || country === "Singapore") {
           // alert(country + " can't register in Saint Petersburg");
         }
       }
     }

     if (path.indexOf("purpose") !== -1 && path.indexOf("visited") === -1 && value.value === "Auto Tourist") {
       if (this.state.arrivalDate1.visited) {
         state.autoType.visited = true;
         state.autoModel.visited = true;
         state.autoColor.visited = true;
         state.autoNumber.visited = true;
         let step3Correct = true;
         if (this.state.autoType.error !== "") {
           step3Correct = false;
           state.errors.push({ name: "autoType", text: "Auto type", step: 1 });
         }
         if (this.state.autoModel.error !== "") {
           step3Correct = false;
           state.errors.push({ name: "autoModel", text: "Vechicle make", step: 1 });
         }
         if (this.state.autoColor.error !== "") {
           step3Correct = false;
           state.errors.push({ name: "autoColor", text: "Auto color", step: 1 });
         }
         if (this.state.autoNumber.error !== "") {
           step3Correct = false;
           state.errors.push({ name: "autoNumber", text: "Licence Plate number", step: 1 });
         }

         state.steps[2].correct = step3Correct;
         this.setState(state);
       }
     }
   }

    //updates any field in state. path - is path to field. example: visitors.1.sex = this.state['visitors']['1']['sex'].value
    updateField(path, value) {
        let state = this.state;

        this.validateVisitedStep(path);

        //updateState
        _.set(state, path, value);
        this.setState(state, () => {
            this.validate();
            this.customValidation(path,value);
        });


    }

    priceCalculate(){

        window.Visas.Russian.EntryTypeId.parseFrom = function(val) {
            val = val.toLowerCase();
            if (val.indexOf("single") >= 0) {
                return window.Visas.Russian.EntryTypeId.Single;
            }

            if (val.indexOf("double") >= 0) {
                return window.Visas.Russian.EntryTypeId.Double;
            }
            // throw new Error();
        };

        window.Visas.Russian.RegistrationTypeId.parseFrom = function(val) {
            switch (val) {
                case "NO":
                    return null;
                case "YES":
                    return window.Visas.Russian.RegistrationTypeId.RegistrationInMoscow;
                case "YES_Piter":
                    return window.Visas.Russian.RegistrationTypeId.RegistrationInStPetersburg;
                // default:
                    // throw new Error();
            }
        };

        let state = this.state;
        //PRICE CALCULATING

        let defaultNumberOfEntries = state.numberOfEntries.value.value || 'Single Entry Visa';
        let defaultRegistration = state.registration.value.value || "NO";
        let defaultGroupSize = state.groupSize.value.value || 1;

        window.Visas.Russian.Prices.CurrentPriceServiceProxy.GetTouristVSDOrderPrice(window.Visas.Russian.EntryTypeId.parseFrom(defaultNumberOfEntries), window.Visas.Russian.RegistrationTypeId.parseFrom(defaultRegistration), defaultGroupSize, (data) => {
            state.priceInPounds = parseFloat(data.Total.toFixed(2));
            state.OptionsCurrenciesRate.forEach(item => {
                if (item.label === state.currency.label){
                    state.totalPrice = parseFloat(item.value * state.priceInPounds)
                    this.setState(state);
                }

            })

        });

    }

    makeFieldsVisited(stepIndex) {
        let state = this.state;
        if (stepIndex === 1) {
            state.groupSize.visited = true;
            state.numberOfEntries.visited = true;
            state.purpose.visited = true;
            state.registration.visited = true;
            state.purpose.visited = true;
            state.countryApplyIn.visited = true;
            state.delivery.visited = true;
        }
        if (stepIndex === 2) {
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
        if (stepIndex === 3) {
            state.arrivalDate1.visited = true;
            state.departureDate1.visited = true;
            if (state.numberOfEntries.value.value === 'Double entry visa') {
                state.arrivalDate2.visited = true;
                state.departureDate2.visited = true;
            }

            if (this.state.purpose.value.value === "Auto Tourist"){
                state.autoType.visited = true;
                state.autoModel.visited = true;
                state.autoColor.visited = true;
                state.autoNumber.visited = true;
            }

            for (let i = 0; i < this.state.locations.length; i++) {
                state.locations[i].city.visited = true;
                state.locations[i].hotel.visited = true;
            }
        }
        if (stepIndex === 4) {
          // state.userCompleteForm.visited = true;
          state.cardNumber.visited = true;
          state.cardholderName.visited = true;
          state.cardExpirationDate.visited = true;
          state.cardCVV.visited = true;
          state.cardpostCode.visited = true;
          state.cardstreetAddress.visited = true;
        }

        this.setState(state);
    }

    checkIsStepCorrect(stepIndex) {
        let state = this.state;
        let correct = true;
        if (stepIndex === 1) {
          state.errors = state.errors.filter(item => item.step !== 1);
          if (state.groupSize.error !== ""){
            correct = false;
            state.errors.push({name:"groupSize" ,text: "Group Size", step: 1})
          }
          if (state.numberOfEntries.error !== ""){
            correct = false;
            state.errors.push({name:"numberOfEntries" ,text: "Number of Entries", step: 1})
          }
          if (state.purpose.error !== ""){
            correct = false;
            state.errors.push({name:"purpose" ,text: "Purpose of Visit", step: 1})
          }
          if (state.registration.error !== ""){
            correct = false;
            state.errors.push({name:"registration" ,text: "Registration", step: 1})
          }
          if (state.countryApplyIn.error !== ""){
            correct = false;
            state.errors.push({name:"countryApplyIn" ,text: "Country Apply In", step: 1})
          }
          if (state.delivery.error !== ""){
            correct = false;
            state.errors.push({name:"delivery" ,text: "Delivery", step: 1})
          }
        }
        if (stepIndex === 2) {
          state.errors = state.errors.filter(item => item.step !== 2);
            for (let i = 0; i < this.state.visitors.length; i++){
                if (this.state.visitors[i].firstName.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".firstName",text: "Visitor " + (i + 1) + "'s First name", step: 2})
                }
                if (this.state.visitors[i].middleName.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".middleName",text: "Visitor " + (i + 1) + "'s Middle name", step: 2})
                }
                if (this.state.visitors[i].surName.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".surName",text: "Visitor " + (i + 1) + "'s Surname", step: 2})
                }
                if (this.state.visitors[i].sex.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".sex",text: "Visitor " + (i + 1) + "'s Gender", step: 2})
                }
                if (this.state.visitors[i].birthDate.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".birthDate",text: "Visitor " + (i + 1) + "'s Birth date", step: 2})
                }
                if (this.state.visitors[i].citizenship.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".citizenship",text: "Visitor " + (i + 1) + "'s Citizenship", step: 2})
                }
                if (this.state.visitors[i].passportNumber.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportNumber",text: "Visitor " + (i + 1) + "'s Passport number", step: 2})
                }
                if (this.state.visitors[i].passportIssued.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportIssued",text: "Visitor " + (i + 1) + "'s Date passport issued", step: 2})
                }
                if (this.state.visitors[i].passportExpired.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportExpired",text: "Visitor " + (i + 1) + "'s Date passport expired", step: 2})
                }            }
              if (this.state.email.error !== ""){
                  correct = false;
                  state.errors.push({name: "email", text: "email", step: 2})
              }
              if (this.state.phone.error !== ""){
                  correct = false;
                  state.errors.push({name: "phone", text: "phone", step: 2})
              }
              // if (this.state.purpose ) autoType  autoModel autoColor

        }

        if (stepIndex === 3) {
          state.errors = state.errors.filter(item => item.step !== 3);
            if (this.state.arrivalDate1.error !== ""){
              correct = false;
                state.errors.push({name: "arrivalDate1", text: "Entry 1 Arrival Date", step: 3})
            }
            if (this.state.departureDate1.error !== ""){
              correct = false;
                state.errors.push({name: "departureDate1", text: "Entry 1 Departure Date", step: 3})
            }
            if (state.numberOfEntries.value.value === 'Double'){
              if (this.state.arrivalDate2.error !== ""){
                correct = false;
                  state.errors.push({name: "arrivalDate2", text: "Entry 2 Arrival Date", step: 3})
              }
              if (this.state.departureDate2.error !== ""){
                correct = false;
                  state.errors.push({name: "departureDate2", text: "Entry 2 Departure Date", step: 3})
              }
            }


            for (let i = 0; i < this.state.locations.length; i++){
              if (this.state.locations[i].city.error !== ""){
                  correct = false;
                  state.errors.push({name: "locations." + i + ".city", text: "Location's " + (i + 1) + " city", step: 3})
              }
              if (this.state.locations[i].hotel.error !== ""){
                  correct = false;
                  state.errors.push({name: "locations." + i + ".city", text: "Location's " + (i + 1) + " hotel", step: 3})
              }
            }

            if (this.state.purpose.value.value === "Auto Tourist"){
                if (this.state.autoType.error !== ""){
                    correct = false;
                    state.errors.push({name: "autoType", text: "Auto type", step: 3})
                }
                if (this.state.autoModel.error !== ""){
                    correct = false;
                    state.errors.push({name: "autoModel", text: "Vechicle make", step: 3})
                }
                if (this.state.autoColor.error !== ""){
                    correct = false;
                    state.errors.push({name: "autoColor", text: "Auto color", step: 3})
                }
                if (this.state.autoNumber.error !== ""){
                    correct = false;
                    state.errors.push({name: "autoNumber", text: "Licence Plate number", step: 3})
                }
            }

        }
        if (stepIndex === 4) {
          state.errors = state.errors.filter(item => item.step !== 4);
          // if (state.userCompleteForm.value !== 1){
          //   correct = false;
          //   state.errors.push({name:"userCompleteForm" ,text: "userCompleteForm", step: 4})
          // }
          if (state.cardNumber.error !== ""){
            correct = false;
            state.errors.push({name:"cardNumber" ,text: "Card number", step: 4})
          }
          if (state.cardholderName.error !== ""){
            correct = false;
            state.errors.push({name:"cardholderName" ,text: "Cardholder name", step: 4})
          }
          if (state.cardExpirationDate.error !== ""){
            correct = false;
            state.errors.push({name:"cardExpirationDate" ,text: "Expiry date", step: 4})
          }
          if (state.cardCVV.error !== ""){
            correct = false;
            state.errors.push({name:"cardCVV" ,text: "CCV", step: 4})
          }
          if (state.cardpostCode.error !== ""){
            correct = false;
            state.errors.push({name:"cardpostCode" ,text: "Postcode", step: 4})
          }
          if (state.cardstreetAddress.error !== ""){
            correct = false;
            state.errors.push({name:"cardstreetAddress" ,text: "House number/name", step: 4})
          }
      }


        //remove duplicates
        state.errors = _.uniqBy(state.errors, 'name')
        this.setState(state);

        return correct;
    }

    updateVisitorsArray() {
        let state = this.state;

        let oldVisitorsCount = this.state.visitors.length;
        let newVisitorsCount = this.state.groupSize.value.value;

        if (oldVisitorsCount < newVisitorsCount) {
            for (let i = oldVisitorsCount; i < newVisitorsCount; i++){
                state.visitors.push(JSON.parse(JSON.stringify(visitorTemplate)));
                // state.visitors[i].citizenship.value.value = this.state.usersCountry;
            }
            this.setState(state);
            }
        else if (oldVisitorsCount > newVisitorsCount){
            for (let i = oldVisitorsCount; i > newVisitorsCount; i--)
                state.visitors.pop();
            this.setState(state);
            }


    }

    updateError(path, value) {
        let state = this.state;
        _.set(state, path + ".error", value);
        this.setState(state);
    }

    removeLocation(index) {
        if (this.state.locations.length > 1) {
            let updateLocations = JSON.parse(JSON.stringify(this.state.locations));
            updateLocations.splice(index, 1);
            this.setState({locations: updateLocations}, () => this.validate());
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
            userCompleteForm: state.userCompleteForm.value,
            autoType: state.autoType.value,
            autoModel: state.autoModel.value,
            autoColor: state.autoColor.value,
            autoNumber: state.autoNumber.value,
            cardNumber: state.cardNumber.value,
            cardholderName: state.cardholderName.value,
            cardExpirationDate: state.cardExpirationDate.value,
            cardCVV: state.cardCVV.value,
            cardpostCode: state.cardpostCode.value,
            cardstreetAddress: state.cardstreetAddress.value,
            returnPassportNumber: state.returnPassportNumber.value,
            returnBirthDate: state.returnBirthDate.value
        };

        //add inputFields for visitors
        for (let i = 0; i < state.visitors.length; i++) {
            inputFields["visitors." + i + ".firstName"] = state.visitors[i].firstName.value;
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
            phone: "required|regex:/^[0-9\\s\\-\\(\\)\\+]{4,}$/ig",
            arrivalDate1: "required|date",
            arrivalDate2: "required|date",
            departureDate1: "required|date",
            departureDate2: "required|date",
            userCompleteForm: "accepted",
            autoType: "required",
            autoModel: "required",
            autoColor: "required",
            autoNumber: "required",
            cardNumber:  "required",
            cardholderName:  "required|regex:/^[a-z\\-\\s]+$/ig",
            cardExpirationDate:  "required",
            cardCVV:  "required",
            returnPassportNumber: "required",
            returnBirthDate: "required|date"
        };

        //add rules for visitors
        for (let i = 0; i < state.visitors.length; i++) {
            rules["visitors." + i + ".firstName"] = "required|regex:/^[a-z\\-\\s]+$/ig";
            rules["visitors." + i + ".middleName"] = "regex:/^[a-z\\-\\s]+$/ig";
            rules["visitors." + i + ".surName"] = "required|regex:/^[a-z\\-\\s]+$/ig";
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

        //custom validation
        //не допускать повторяющихся городов
        this.state.locations.forEach((item1, index1) => {
            let error = false;
            this.state.locations.forEach((item2, index2) => {
                if (index1 != index2 && item1.city.value.value === item2.city.value.value && item1.hotel.value.value === item2.hotel.value.value && typeof item1.city.value !== 'string'){
                    this.updateError("locations." + index1 + ".hotel", "You have chosen this hotel somewhere");
                    error = true;
                }

            })
            if (!error &&  this.state.locations[index1].error === "")
                this.updateError("locations." + index1+ ".hotel", "");
        })

        //trans-siberan не может быть единственной локацией
        let onlyTransSiberian = true;
        this.state.locations.forEach((item,index) => {
            onlyTransSiberian = onlyTransSiberian && this.state.locations[index].city.value.value === "Trans Siberian Railway";
        })

        if (onlyTransSiberian)
            this.updateError("locations.0.city", "You must choose at least two unique locations!");
        else if (typeof this.state.locations[0].city.value.value !== "undefined")
            this.updateError("locations.0.city", "");
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
                <Input
                    hintText="This is the help text for field 'First name'"
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".firstName"}
                    value={this.state.visitors[visitorIndex].firstName.value}
                    visited={this.state.visitors[visitorIndex].firstName.visited}
                    label="First name"
                    placeholder="Please enter your first name as it appears in your passport"
                    error={this.state.visitors[visitorIndex].firstName.error}/>
                <Input
                    hintText="This is the help text for field 'Middle name'"
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".middleName"}
                    value={this.state.visitors[visitorIndex].middleName.value}
                    visited={this.state.visitors[visitorIndex].middleName.visited}
                    label="Middle name"
                    placeholder="Please enter your middle name as it appears in your passport (if applicable)"
                    error={this.state.visitors[visitorIndex].middleName.error}/>
                <Input
                    hintText="This is the help text for field 'Surname'"
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="text"
                    updateField={this.updateField}
                    fieldName={"visitors." + visitorIndex + ".surName"}
                    value={this.state.visitors[visitorIndex].surName.value}
                    visited={this.state.visitors[visitorIndex].surName.visited}
                    label="Surname"
                    placeholder="Please enter your surname as it appears in your passport"
                    error={this.state.visitors[visitorIndex].surName.error}/>

                <div className="row align-items-center" style={{"maxWidth": "655px", "marginTop": "10px"}}>
                    <div className="col-md-6">
                        <RadioGroup
                            hintText="This is the help text for field 'Gender'"
                            updateCurrentHint={this.updateCurrentHint}
                            currentHint={this.state.currentHint}
                            className="mb-3 Input_half"
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".sex"}
                            error={this.state.visitors[visitorIndex].sex.error}
                            value={this.state.visitors[visitorIndex].sex.value}
                            title="Gender"
                            options={[
                                {
                                    value: "Male",
                                    text: "Male"
                                }, {
                                    value: "Female",
                                    text: "Female"
                                }
                            ]} name={"visitors." + visitorIndex + ".sex"} />
                    </div>
                    <div className="col-md-6">
                        <Input
                            hintText="This is the help text for field 'Date of birth'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            type="date"
                            dateValidator={this.getRestrictForDate("birthDate", visitorIndex)}
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".birthDate"}
                            value={this.state.visitors[visitorIndex].birthDate.value}
                            viewDate={new Date().setFullYear(new Date().getFullYear() - 40)}
                            visited={this.state.visitors[visitorIndex].birthDate.visited}
                            label="Date of birth"
                            placeholder=""
                            error={this.state.visitors[visitorIndex].birthDate.error}/>
                    </div>

                </div>


                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input
                            hintText="This is the help text for field 'Citizenship'"
                            currentHint={this.state.currentHint}
                            usersCountry={this.state.usersCountry}
                            updateCurrentHint={this.updateCurrentHint}
                            className="mt-4 mr-2 Input_half"
                            type="country"
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".citizenship"}
                            value={this.state.visitors[visitorIndex].citizenship.value}
                            visited={this.state.visitors[visitorIndex].citizenship.visited}
                            label="Citizenship"
                            error={this.state.visitors[visitorIndex].citizenship.error}/>

                    </div>
                    <div className="col-md-6">
                        <Input
                            hintText="This is the help text for field 'Passport number'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            className="mt-4"
                            type="text"
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".passportNumber"}
                            value={this.state.visitors[visitorIndex].passportNumber.value}
                            visited={this.state.visitors[visitorIndex].passportNumber.visited}
                            label="Passport number"
                            placeholder="Please enter your passport number"
                            error={this.state.visitors[visitorIndex].passportNumber.error}/>
                    </div>
                </div>

                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-12">
                        {/*this.state.countryApplyInNotesText !== "" ? <Info text={this.state.countryApplyInNotesText} data=''/> : ""*/}
                        {this.state.visitors[visitorIndex].citizenshipCountryText !== "" ? <Info text={this.state.visitors[visitorIndex].citizenshipCountryText} data=''/> : ""}
                    </div>
                </div>

                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input
                            hintText="This is the help text for field 'Date passport issued'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            type="date"
                            className="mt-4 mr-2 Input_half"
                            dateValidator={this.getRestrictForDate("passportIssued", visitorIndex)}
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".passportIssued"}
                            value={this.state.visitors[visitorIndex].passportIssued.value}
                            visited={this.state.visitors[visitorIndex].passportIssued.visited}
                            label="Date passport issued"
                            placeholder=""
                            error={this.state.visitors[visitorIndex].passportIssued.error}/>
                    </div>

                    <div className="col-md-6">
                        <Input
                            hintText="This is the help text for field 'Date passport expired'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            type="date"
                            className="mt-4"
                            dateValidator={this.getRestrictForDate("passportExpired", visitorIndex)}
                            updateField={this.updateField}
                            fieldName={"visitors." + visitorIndex + ".passportExpired"}
                            value={this.state.visitors[visitorIndex].passportExpired.value}
                            visited={this.state.visitors[visitorIndex].passportExpired.visited}
                            label="Date passport expired"
                            placeholder=""
                            error={this.state.visitors[visitorIndex].passportExpired.error}/>
                    </div>
                </div>

                {
                    visitorIndex === 0
                        ? [
                            <Input
                                hintText="This is the help text for field 'Email'"
                                currentHint={this.state.currentHint}
                                updateCurrentHint={this.updateCurrentHint}
                                type="email"
                                className="mt-4"
                                updateField={this.updateField}
                                fieldName="email"
                                value={this.state.email.value}
                                visited={this.state.email.visited}
                                label="Email"
                                placeholder="example@mail.com"
                                error={this.state.email.error}/>,

                            <Input
                                hintText="This is the help text for field 'Telephone'"
                                usersCountry={this.state.usersCountry}
                                currentHint={this.state.currentHint}
                                updateCurrentHint={this.updateCurrentHint}
                                type="phone"
                                className="mt-4"
                                updateField={this.updateField}
                                fieldName="phone"
                                value={this.state.phone.value}
                                visited={this.state.phone.visited}
                                label="Telephone"
                                error={this.state.phone.error}/>
                        ]
                        : []
                }
            </ToggleTab>);
        });
    }

    renderAuto(){
        return [
            <RadioGroup hintText="This is the help text for field 'Vehicle type'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} updateField={this.updateField} fieldName="autoType" error={this.state.autoType.error} value={this.state.autoType.value} title="Vehicle type" options={[
                    {
                        value: "car",
                        text: "Car"
                    }, {
                        value: "moto",
                        text: "Motorcycle"
                    }
            ]}/>,

        <Input
            hintText="This is the help text for field 'Vehicle make'"
            currentHint={this.state.currentHint}
            updateCurrentHint={this.updateCurrentHint}
            type="select"
            className="mt-4"
            updateField={this.updateField}
            value={this.state.autoModel.value}
            fieldName="autoModel"
            visited={this.state.autoModel.visited}
            label="Vehicle make"
            placeholder="Please select the make of the vehicle you will bring to Russia"
            error={this.state.autoModel.error}
            options={this.state.OptionsAutoModels}/>,
        <Input
            hintText="This is the help text for field 'Vehicle color'"
            currentHint={this.state.currentHint}
            updateCurrentHint={this.updateCurrentHint}
            type="select"
            className="mt-4"
            updateField={this.updateField}
            value={this.state.autoColor.value}
            fieldName="autoColor"
            visited={this.state.autoColor.visited}
            label="Vehicle color"
            placeholder="Please select the colour of the vehicle you will bring to Russia"
            error={this.state.autoColor.error}
            options={this.state.OptionsAutoColors}/>,
        <Input
            hintText="This is the help text for field 'Licence Plate number'"
            currentHint={this.state.currentHint}
            updateCurrentHint={this.updateCurrentHint}
            type="text"
            className="mt-4"
            updateField={this.updateField}
            value={this.state.autoNumber.value}
            fieldName="autoNumber"
            visited={this.state.autoNumber.visited}
            label="Licence Plate number"
            error={this.state.autoNumber.error}/>
        ]
    }

    renderArrivalAndDeparture() {
        let arr = [0];
        if (this.state.numberOfEntries.value.value === "Double entry visa")
            arr[1] = 1;

        return arr.map(inputIndex => {
            return (<div className="row" style={{
                    maxWidth: "655px"
                }}>
                <div className="col-md-6">
                    <Input
                        hintText="This is the help text for field 'Arrival date'"
                        currentHint={this.state.currentHint}
                        updateCurrentHint={this.updateCurrentHint}
                        dateValidator={this.getRestrictForDate("arrivalDate" + (
                        inputIndex + 1))}
                        type="date"
                        className="mt-4 mr-2 Input_half"
                        updateField={this.updateField}
                        fieldName={"arrivalDate" + (
                        inputIndex + 1)}
                        value={this.state["arrivalDate" + (
                            inputIndex + 1)].value}
                        visited={this.state["arrivalDate" + (
                            inputIndex + 1)].visited}
                        label={"Entry " + (
                        inputIndex + 1) + " - Arrival date in Russia"}
                        placeholder=""
                        error={this.state["arrivalDate" + (
                            inputIndex + 1)].error}/>
                </div>
                <div className="col-md-6">
                    <Input
                        hintText="This is the help text for field 'Departure date'"
                        currentHint={this.state.currentHint}
                        updateCurrentHint={this.updateCurrentHint}
                        dateValidator={this.getRestrictForDate("departureDate" + (
                        inputIndex + 1))}
                        type="date"
                        className="mt-4"
                        updateField={this.updateField}
                        fieldName={"departureDate" + (
                        inputIndex + 1)}
                        value={this.state["departureDate" + (
                            inputIndex + 1)].value}
                        visited={this.state["departureDate" + (
                            inputIndex + 1)].visited}
                        label={"Entry " + (
                        inputIndex + 1) + " - Departure date from Russia"}
                        placeholder=""
                        error={this.state["departureDate" + (
                            inputIndex + 1)].error}/>
                </div>
            </div>);
        });
    }

    renderLocations() {
        let state = this.state;
        return [
            state.locations.map((location, locationIndex) => {
                // console.log(state.locations[locationIndex].OptionsHotels);
                // console.log(state.OptionsHotels);
                return [
                    <ToggleTab className="mt-4" label={"Location " + (
                        locationIndex + 1)}>
                        <Input
                            hintText="This is the help text for field 'City'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            type="select"
                            className="mt-4"
                            updateField={this.updateField}
                            value={state.locations[locationIndex].city.value}
                            fieldName={"locations." + locationIndex + ".city"}
                            visited={state.locations[locationIndex].city.visited}
                            label="City"
                            placeholder="Please select a city"
                            error={state.locations[locationIndex].city.error}
                            options={state.OptionsCities}/>
                        <Input
                            hintText="This is the help text for field 'Hotel'"
                            currentHint={this.state.currentHint}
                            updateCurrentHint={this.updateCurrentHint}
                            type="select"
                            className="mt-4"
                            updateField={this.updateField}
                            value={state.locations[locationIndex].hotel.value}
                            fieldName={"locations." + locationIndex + ".hotel"}
                            visited={state.locations[locationIndex].hotel.visited}
                            label="Hotel"
                            placeholder="Please select a hotel or hostel"
                            error={state.locations[locationIndex].hotel.error}
                            options={state.locations[locationIndex].OptionsHotels}
                        />
                    </ToggleTab>,
                    <div>
                    {state.locations.length > 1 ?
                        <Button removeLocation="true" className="Button_red-border ml-auto mt-4" handleClick={() => this.removeLocation(locationIndex)} label={"remove location " + (locationIndex + 1)}/> : ""
                    }
                    </div>
                ];
            }),
            <Button className="Button_red-border mr-auto mt-4" handleClick={() => this.addLocation()} label={"+add another location"}/>
        ];
    }

    showCurrentStep() {

        /**************INTRO************/
        if (this.state.currentStep === 0) {
            return (
                <div className="Step-intro pt-4">
                    <div className="Step Step_intro">
                        <div className="Step__need">
                            <h4 className="Step__need-title my-3">To complete this application, you will need:</h4>
                            <div className="Step__need-body row">
                                <div className="Step__need-list col-md-7">
                                    <ul>
                                        <li>Passport(s) of everybody in your group</li>
                                        <li>Personal details of everybody in your group</li>
                                        <li>Your travel dates (preferably confirmed)</li>
                                    </ul>
                                </div>
                                <div className="Step__description col-md-4">
                                    <img className="mr-4" src={clocksImg} alt="" />
                                    <div className="Step__text"><b>You will need approximately</b> <span className="Step__text_red">40 minutes</span> to complete this application</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row py-4 px-5 my-4">
                        <div className="d-flex col-md-6 flex-column flex-xl-row col-md-7">
                            <Button
                                label="retrieve saved application"
                                className="mr-3"
                                text="Load a previously saved existing application."
                                handleClick={() => this.retrieveApplication()}
                            />
                            <Button
                                handleClick={() => this.updateField("currentStep", this.state.currentStep + 1)}
                                className="Button_red"
                                label="NEXT STEP >"
                                text="Start a new application."
                            />
                        </div>
                        <div className="Step__intro-text ml-auto col-md-5">
                            Our simple, step-by-step form will show you exactly how far along you are in the ordering process and whether any information is missing in any of the sections. It also allows you to save your progress so you can return later if needed.
                        </div>
                    </div>

                    <div className="Step__intro-img"></div>

                </div>
            )
        }

        /*********1*******/

        if (this.state.currentStep === 1) {
            return (<Step number={1} hidden={this.state.currentStep !== 1}>
                <Input
                    hintText="If you are travelling with at least one other person who has the same travel plans as you, you may include everybody on one visa support document rather than applying for individual ones."
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    type="select"
                    updateField={this.updateField}
                    fieldName="groupSize"
                    value={this.state.groupSize.value}
                    visited={this.state.groupSize.visited}
                    label="Group size - how many people are in your group?"
                    error={this.state.groupSize.error}
                    options={this.state.OptionsGroupSize}/>
                <Input
                    hintText={`
                        A single-entry visa allows the visa holder one entry and one exit from Russia and a double-entry visa allows for two entries and two exits within the validity period of the visa.</br>&nbsp;</br>
                        If you have a group where some individuals require a single-entry visa and others require a double-entry visa, then you should apply for the appropriate visa support documents for these individuals separately to avoid higher consular fees.
                        `}
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="select"
                    updateField={this.updateField}
                    fieldName="numberOfEntries"
                    value={this.state.numberOfEntries.value}
                    visited={this.state.numberOfEntries.visited}
                    label="Number of entries"
                    error={this.state.numberOfEntries.error}
                    options={this.state.OptionsNumberOfEntries}/>
                <Input
                    hintText={`
                        The "Purpose of Visit" of a visa is effectively a sub-category of your visa which provides more information about the specific reason of your visit to Russia. </br>&nbsp;</br>
                        AUTO TOURIST - This is for general tourist purposes where you will be taking your own private vehicle into Russia. You should provide a cover letter with your application pack indicating the route of your journey and vehicle details such as make, registration and colour, in addition to a copy of the vehicle registration document and your driving licence. Please note that, in addition to the auto-tourist visa, there will be other requirements to take your vehicle into and out of Russia which you will be responsible for. Please contact our visa team if you have further questions on these requirements.</br>&nbsp;</br>
                        AIM TOURISM - This is for people travelling to Russia to participate in short negotiations, exhibitions and auctions, or to establish business links or investigate the economic climate for future business opportunities. Once these business links are in place, you should travel on a full business visa. To use a visa with the "AIM TOURISM" purpose of visit, you should be staying in a hotel and know the exact dates you are going to visit Russia. The Russian consulate where you apply for the visa decides how long the visa will be valid for and, in the case of a visa with the "AIM TOURISM" purpose of visit, this will be no more than 30 days.</br>&nbsp;</br>
                        TOURIST - This is for general tourism purposes. Most tourist visas will have this purpose of visit.
                        `}
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="select"
                    updateField={this.updateField}
                    fieldName="purpose"
                    value={this.state.purpose.value}
                    visited={this.state.purpose.visited}
                    label="Purpose of visit"
                    error={this.state.purpose.error}
                    options={this.state.OptionsPurpose}/>
                <Input
                    hintText={`
                        <b>What is registration?</b> - Registration is a legally required form of migration control in Russia, whereby foreign citizens staying in any Russian city for 7 working days or more have to register with the local migration authorities. This may sound daunting, but hotels and many hostels in Russia will automatically register you upon arrival. Moreover, Real Russia can register your visa for you in certain cities if needed, as described below.</br>&nbsp;</br>
                        <b>No registration service needed</b> - Select this option if you are staying in a hotel or other accommodation where your visa will be registered for you, or if you staying in each Russian city you will be visiting for fewer than seven working days. In case of the latter, you should keep your tickets proving travel between the cities you visit in Russia until you leave the country.</br>&nbsp;</br>
                        <b>Registration in Moscow for up to 30 days</b> - Select this option if you are staying in Moscow for more than 7 working days and up to 30 days and wish to pre-pay for our registration service. Please note that the registration cost is per person and applied to the total number of people applying. If you wish you may select "No registration service needed" and pay our office in Moscow directly for your registration. The price of the registration service is subject to change depending on fluctuations in the exchange rate of the Russian Ruble.</br>&nbsp;</br>
                        <b>Registration in Moscow for longer than 1 month and up to 1 year</b> - Select this option if you are staying in Moscow for longer than 1 month and wish to pre-pay for our registration service. Please note that the registration cost is per person and applied to the total number of people applying. If you wish you may select "No registration service needed" and pay our office in Moscow directly for your registration. The price of the registration service is subject to change depending on fluctuations in the exchange rate of the Russian Ruble.</br>&nbsp;</br>
                        <b>Registration in St. Petersburg</b> - Select this option if you are staying in St. Petersburg but not staying in a hotel and wish to pre-pay for a registration service with our partners. Please note that the registration cost is per person and applied to the total number of people applying.</br>&nbsp;</br>
                        We have created a handy online guide about registration, which can be found <a target="_blank" href="https://realrussia.co.uk/visas/russian/registration">here</a>.
                        `}
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="select"
                    updateField={this.updateField}
                    fieldName="registration"
                    value={this.state.registration.value}
                    visited={this.state.registration.visited}
                    label="Registration - do you need our registration in Russia service?"
                    error={this.state.registration.error}
                    options={this.state.OptionsRegistration}/>
                <Input
                    hintText={`
                        Please let us know in which country you will apply for your Russian visa, so that we can advise you if the Russian consulates in the country where you will apply have any special conditions that we are aware of.
                        `}
                    usersCountry={this.state.usersCountry}
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="country"
                    updateField={this.updateField}
                    fieldName="countryApplyIn"
                    value={this.state.countryApplyIn.value}
                    visited={this.state.countryApplyIn.visited}
                    label="In which country will you apply for your Russian visa?"
                    error={this.state.countryApplyIn.error}/>
                {this.state.countryApplyInNotesText !== "" ? <Info text={this.state.countryApplyInNotesText} data={[this.state.countryApplyInFullName]} replaceStr="{Country}"/> : ""}
                <Input
                    hintText={`
                        Your invitation (visa support) will be sent to you by email once you submit this online form and make the payment.</br>&nbsp;</br>
                        Most consulates will accept a clear faxed or emailed copy of the visa support when you apply for a visa. However, some consulates may require the original document. It is your responsibility to check whether the consulate where you intend to apply for your visa has any special requirements, e.g. original visa support documents only rather than copies.</br>&nbsp;</br>
                        If you need the original paper visa support documents then you can select 'Other courier - contact our visa support team for price' as the delivery option. The paper invitation will be sent to your requested address by DHL or similar courier directly from our Moscow office. The cost and delivery time will depend upon country of destination. Please contact us for more details.
                        `}
                    currentHint={this.state.currentHint}
                    updateCurrentHint={this.updateCurrentHint}
                    className="mt-4"
                    type="select"
                    updateField={this.updateField}
                    fieldName="delivery"
                    value={this.state.delivery.value}
                    visited={this.state.delivery.visited}
                    label="Delivery option"
                    error={this.state.delivery.error}
                    options={this.state.OptionsDelivery}/>
            </Step>);
        } else if (this.state.currentStep === 2)
            return (<Step number={2} hidden={this.state.currentStep !== 2}>
                {this.renderVisitors()}
            </Step>);

        /******2*********/
        else if (this.state.currentStep === 3)
            return (<Step number={3} hidden={this.state.currentStep !== 3}>
                {this.renderArrivalAndDeparture()}
                {this.renderLocations()}
                <div hidden={this.state.purpose.value.value !== "Auto Tourist"}>
                    {this.renderAuto()}
                </div>
                <RadioGroup
                    hintText="This is the help text for field 'userNeedsNewsletter'"
                    updateCurrentHint={this.updateCurrentHint}
                    currentHint={this.state.currentHint}
                    updateField={this.updateField}
                    fieldName="userNeedsNewsletter"
                    error={this.state.userNeedsNewsletter.error}
                    value={this.state.userNeedsNewsletter.value}
                    title="Would you like to receive our monthly newsletter?"
                    options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userNeedsNewsletter"/>
                <RadioGroup
                    hintText="This is the help text for field 'userNeedsJoinMailingList'"
                    updateCurrentHint={this.updateCurrentHint}
                    currentHint={this.state.currentHint}
                    updateField={this.updateField}
                    fieldName="userNeedsJoinMailingList"
                    error={this.state.userNeedsJoinMailingList.error}
                    value={this.state.userNeedsJoinMailingList.value}
                    title="Would you like to join our mailing list for special offers, news and other travel inspiration?"
                    options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userNeedsJoinMailingList"/>

            </Step>);
        /****3****/
        else if (this.state.currentStep === 4)
            return [
                <Step number={4}>
                    <div className="mt-4">
                        Thank you <b>PAUL BRADLEY</b>, your Real Russian Tourist Visa Support application has been submitted to our database and is ready for processing.
                    </div>
                    <div className="Step__payment-info mt-4">
                        <div className="row my-2">
                            <div className="col-md-6">Single entry visa</div>
                            <div className="col-md-6">
                                <span class="Step__payment-info-currency">{this.state.currency.label.slice(0, 1)}</span>
                                <span class="Step__payment-info-sum-value">15.30</span>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6">No registration service needed</div>
                            <div className="col-md-6">
                                <span class="Step__payment-info-currency">{this.state.currency.label.slice(0, 1)}</span>
                                <span class="Step__payment-info-sum-value">0.00</span>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-6"><b>TOTAL PRICE</b></div>
                            <div className="col-md-6">
                                <span class="Step__payment-info-currency"><b>{this.state.currency.label.slice(0, 1)}</b></span>
                                <span class="Step__payment-info-sum-value"><b>{this.state.totalPrice.toFixed(2)}</b></span>
                            </div>
                        </div>
                    </div>

                    <Info
                        text={
                            (this.state.numberOfEntries.value.value === "Double entry visa" ?
                                "The visa support document applied for will be valid for processing a visa for the named person to enter Russia (the first time) on or after < not specified > and they must leave Russia (for the second time) on or before < not specified >. The visa will allow two entries into and two exits from Russia during this period. It is the applicant’s responsibility to confirm that the visa support document/visa meet their requirements before they process the visa, or travel or use the visa itself. Please note that once your visa is issued the pre-paid registration fees are non-refundable. Please note that once the visa support is issued, no refunds are possible."
                                :
                                "The visa support document applied for will be valid for processing a visa for the named person to enter Russia on or after  < not specified > and they must leave Russia on or before < not specified >. The visa will allow one entry to and one exit from Russia during this period. It is the applicant’s responsibility to confirm that the visa support document/visa meet their requirements before they process the visa, or travel or use the visa itself. Please note that once the visa support is issued, no refunds are possible."
                            )
                        }
                        data={
                            (this.state.numberOfEntries.value.value === "Double entry visa" ?
                                [new Date(this.state.arrivalDate1.value).toLocaleDateString(), new Date(this.state.departureDate2.value).toLocaleDateString()]
                                :
                                [new Date(this.state.arrivalDate1.value).toLocaleDateString(), new Date(this.state.departureDate1.value).toLocaleDateString()]
                            )
                        }
                        replaceStr="< not specified >"
                    />
                <RadioGroup
                    createOrder={this.createOrder}
                    hintText="This is the help text for field 'userCompleteForm'"
                    updateCurrentHint={this.updateCurrentHint}
                    currentHint={this.state.currentHint}
                    visited={this.state.userCompleteForm.visited}
                    updateField={this.updateField}
                    fieldName="userCompleteForm"
                    error={this.state.userCompleteForm.error}
                    value={this.state.userCompleteForm.value}
                    title="Having completed my application, I agree that the above visa support application is suitable for my visit and I have read and understood the <b><a style='color:black;text-decoration:underline' target='_blank' href='http://realrussia.co.uk/Portals/0/files/Visa-Terms.pdf'>terms and conditions</a></b>" options={[
                            {
                                value: "1",
                                text: "Yes"
                            },
                            {
                                value: "2",
                                text: "No"
                            }
                        ]} name="userCompleteForm"/>
                    <div className={
                            "Step__proceed-payment mt-2 " +
                            (this.state.userCompleteForm.value !== '1' ? "disabled" : "")
                        }>
                        <b>You can now proceed to payment</b>
                    </div>

                </Step>,
                /********PAYMENT**********/

                <Step number={5} price={this.state.totalPrice} currency={this.state.currency} email={this.state.email.value}>
                    <div hidden={this.state.paymentId !== ''}>
                        <Input
                            hintText="This is the help text for field 'Card number'"
                            updateCurrentHint={this.updateCurrentHint}
                            currentHint={this.state.currentHint}
                            className={"mt-4 "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}
                            type="cardNumber"
                            updateField={this.updateField}
                            fieldName="cardNumber"
                            value={this.state.cardNumber.value}
                            visited={this.state.cardNumber.visited}
                            label="Card number"
                            error={this.state.cardNumber.error}
                        />
                        <Input
                            hintText="This is the help text for field 'Cardholder name'"
                            updateCurrentHint={this.updateCurrentHint}
                            currentHint={this.state.currentHint}
                            className={"mt-4 "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}
                            type="text"
                            updateField={this.updateField}
                            fieldName="cardholderName"
                            value={this.state.cardholderName.value}
                            visited={this.state.cardholderName.visited}
                            label="Cardholder name"
                            error={this.state.cardholderName.error}/>
                        {/*<Input hintText="This is the help text for field 'Surname'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userSurname" value={this.state.userSurname.value} visited={this.state.userSurname.visited} label="Surname"  error={this.state.userSurname.error}/>*/}
                        <div className="row" style={{
                                maxWidth: "655px"
                            }}>
                            <div className="col-md-6">
                                <Input formatDate="expiry date" hintText="This is the help text for field 'Expiry date'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 Input_half "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}  type="date" dateValidator={this.getRestrictForDate("cardExpirationDate")} updateField={this.updateField} fieldName="cardExpirationDate" value={this.state.cardExpirationDate.value} visited={this.state.cardExpirationDate.visited} label="Expiry date" error={this.state.cardExpirationDate.error}/>
                            </div>
                            <div className="col-md-6">
                                <Input hintText="This is the help text for field 'CCV'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="cardCVV" value={this.state.cardCVV.value} visited={this.state.cardCVV.visited} label="CCV"  error={this.state.cardCVV.error}/>
                            </div>
                        </div>
                        <div className="row" style={{
                                maxWidth: "655px"
                            }}>
                            <div className="col-md-6">
                                <Input hintText="This is the help text for field 'House number/name'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 mr-2 Input_half "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="cardstreetAddress" value={this.state.cardstreetAddress.value} visited={this.state.cardstreetAddress.visited} label="House number/name" error={this.state.cardstreetAddress.error}/>
                            </div>
                            <div className="col-md-6">
                                <Input hintText="This is the help text for field 'Postcode'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.valdationData === "" || this.state.completePayment !== 0 ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="cardpostCode" value={this.state.cardpostCode.value} visited={this.state.cardpostCode.visited} label="Postcode" error={this.state.cardpostCode.error}/>
                            </div>
                        </div>
                        {/*<Input hintText="This is the help text for field 'Card type'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} type="select" className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")} updateField={this.updateField} value={this.state.userCardType.value} fieldName="userCardType" visited={this.state.userCardType.visited} label="Card type" error={this.state.userCardType.error} options={this.state.OptionsCardType}/>*/}
                        <div className="Step__note mt-4 mt-lg-0">
                            <b className="Step__color-red">SECURE PAYMENT PROCESSING</b>
                            <div className="Step__step-note my-3">We handle thousands of online transactions from all over the world securely and safely every month, so you have the peace of mind to know your data is safe. We use industry standard fraud protection technologies and we may also carry out security checks to confirm that any payments made online are genuine and made with the cardholder's permission, especially where cards used are not registered with payment security services such as those shown below.</div>
                            <div className="d-flex">
                                <img src={visa} alt="visa" className="Step__note-img mr-2"/>
                                <img src={mastercard} alt="Mastercard" className="Step__note-img mr-2"/>
                                <img src={americanExpress} alt="american-express" className="Step__note-img "/>
                            </div>
                        </div>
                    </div>
                    <div hidden={this.state.paymentId === ''}>
                        <div className="Step__success-icon">
                            <img src={successIcon} alt="success icon" />
                        </div>
                        <div className="Step__success-title">
                            Success
                        </div>
                        <div className="Step__text Step__text_success Info mt-4" >
                            Thank you for your order. Order reference number is <b> {this.state.referenceNumber} </b>. Your payment ID is <b> {this.state.paymentId} </b>. We have sent the invitation letter with instructions to your email.
                        </div>
                    </div>
                </Step>,
            ];
        }

    render() {
        return (
            <div className="App text-center text-md-left mb-5">
                {this.state.showPopup !== 0 ?
                    <div className="modal-wrap">
                        <div className="modal modal_save">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                              <div className="modal-body ">
                                  <button type="button" className="close" onClick={this.closeSavePopup}>
                                    <span>×</span>
                                  </button>
                                  <div className="Step__success-icon mt-0 mt-5">
                                      <img src={successIcon} alt="success icon" />
                                  </div>
                                <div className="Step__need-title mt-4 text-dark text-center mb-5">Your data has been saved!</div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    : ""}
                    {this.state.showLoader !== 0 ?
                        <div className="modal-wrap modal-wrap_loader">
                            <div className="modal modal_save">
                              <div className="modal-dialog modal-dialog-centered">
                                  <div className="Step__success-icon Step__success-icon_loader">
                                    <img src={loadIcon} alt="load icon" />
                                </div>
                              </div>
                            </div>
                        </div>
                        : ""}

                <Header
                updateField={this.updateField}
                steps={this.state.steps}
                currentStep={this.state.currentStep}
                currencies={this.state.currencies}
                currency={this.state.currency}
                price={this.state.totalPrice}
                userCompleteForm ={this.state.userCompleteForm.value}
                scrollPage={this.scrollPage}
                />




              <div className="App__container container">

                <Sticky
                    type="priceSticky"
                    links={this.state.errors}
                    currentStep={this.state.currentStep}
                    currency={this.state.currency}
                    price={this.state.totalPrice}
                    retrieveApp={() => this.retrieveApplication()}
                    saveApp={() => this.saveApplication()}
                    showSavePopup={() => this.showSavePopup()}
                />
                <Sticky type="errorSticky" links={this.state.errors} updateField={this.updateField}/>
                <div className="container px-0 mr-auto ml-0">
                  <div className="row py-3" hidden={this.state.currentStep === 0}>
                      <div className="d-flex col-md-6 flex-column flex-md-row">
                          <Button
                              label="retrieve saved application"
                              className="mr-3"
                              text="Load a previously saved existing application."
                              handleClick={() => this.retrieveApplication()}
                          />
                          <Button
                              label="save progress"
                              text="Save your progress"
                              handleClick={() => {
                                      this.saveApplication();
                                      this.showSavePopup();
                                  }
                              }
                          />
                      </div>
                      <div className="ml-auto col-md-4">
                        {this.state.showReturnForm !== 0 ?
                                [<Input
                                    type="text"
                                    updateField={this.updateField}
                                    fieldName={"returnPassportNumber"}
                                    value={this.state.returnPassportNumber.value}
                                    visited={this.state.returnPassportNumber.visited}
                                    label="Passport number"
                                    placeholder="Please enter your passport number"
                                    error={this.state.returnPassportNumber.error}
                                />,
                                <Input
                                    className="mt-4"
                                    type="date"
                                    formatDate="returnBirthDate"
                                    dateValidator={this.getRestrictForDate("returnBirthDate")}
                                    updateField={this.updateField}
                                    fieldName={"returnBirthDate"}
                                    value={this.state.returnBirthDate.value}
                                    viewDate={new Date().setFullYear(new Date().getFullYear() - 40)}
                                    visited={this.state.returnBirthDate.visited}
                                    label="Birth date year"
                                    placeholder=""
                                    error={this.state.returnBirthDate.error}
                                />,
                                <Button
                                    className="align-self-md-start align-self-center mt-4 Button_return"
                                    label="Load personal information"
                                    handleClick={() => {
                                        console.log("returnBirthDate= ", Moment(this.state.returnBirthDate.value).format("YYYY"));
                                        this.returningClient(this.state.returnPassportNumber.value, Moment(this.state.returnBirthDate.value).format("YYYY"));

                                    }}
                                />
                        ] :
                        <Button
                            label="I am returning client"
                            className="Button_red-border"
                            handleClick={() => this.setState({showReturnForm: 1})}
                            text="Have you ordered a visa or visa support with us before? If so, click here to recover your personal information and pre-fill most of your application."
                          />
                        }
                      </div>
                  </div>

                  {this.showCurrentStep()}
                </div>
              </div>
              <div className="container mt-4">
                  <div className="row" style={{
                          maxWidth: "710px"
                      }}>
                      <div className="col-sm-6" hidden={this.state.currentStep === 0}>
                          <Button
                              className={"align-self-md-start align-self-center " + (this.state.completePayment !== 0 ? "disabled" : "")}
                              label="Save progress"
                              handleClick={() => {
                                      this.saveApplication();
                                      this.showSavePopup();
                                  }
                                }/>
                      </div>

                      <div className={
                              ((this.state.currentStep !== 0 && this.state.userCompleteForm.value !== "1" && this.state.completePayment !== 1 ) ? "col-sm-3 d-block"  : "d-none")
                          }>
                          <Button
                              handleClick={() => {this.updateField("currentStep", this.state.currentStep - 1); this.scrollPage();}}
                              className={"Button_red-border align-self-md-end align-self-center " + (this.state.completePayment !== 0 ? "disabled" : "")}
                              label="Previous step"
                          />
                      </div>
                      <div className={
                              ((this.state.currentStep === 1) ? "col-sm-3 d-block" : (this.state.currentStep !== 4 && this.state.currentStep !== 0) ? "col-sm-3 d-block"  : "d-none")
                          }>
                          <Button
                              handleClick={() => {this.updateField("currentStep", this.state.currentStep + 1); this.scrollPage();}}
                              className="Button_red align-self-md-end align-self-center"
                              label="Next step >"
                          />
                      </div>
                      <div className={
                              ((this.state.currentStep === 4 && this.state.userCompleteForm.value !== "1") ? "col-sm-3 d-block" : (this.state.currentStep === 4 && this.state.userCompleteForm.value === "1") ? "col-sm-6 d-block" : "d-none")
                          }>
                          <Button
                              className={
                                  "Button_red align-self-md-end align-self-center " +
                                  (this.state.userCompleteForm.value !== "1" || this.state.completePayment !== 0 ? "disabled" : "")
                              }
                              label="Make payment"
                              handleClick={()=>{
                                  // console.log(this.state.currentStep);
                                  this.updateField("makePayment", this.state.currentStep);
                                  this.showLoader();
                                  // this.createPaymentService
                                  }
                              }
                          />
                      </div>

                  </div>
              </div>
        </div>
        );
    }
}

export default App;

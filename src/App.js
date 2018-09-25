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
/**********HELPERS FUNCTIONS**************/
import daysBetween from './utils/daysBetweenDates';

/**********IMAGES*******/
import americanExpress from "./Components/Step/img/american-express.png";
import mastercard from "./Components/Step/img/mastercard.png";
import visaDebit from "./Components/Step/img/visa-debit.png";
import visa from "./Components/Step/img/visa.png";
import clocksImg from "./Components/Step/img/clocks.png";

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
            console.log('shiiiit');
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

    sendFormData(){
        let formData = {};
        for (let prop in this.state) {
            if(prop !== 'currentHint' && prop !== 'currentStep' && prop !== 'priceInPounds' && prop !== 'currencies' && prop !== 'steps' && prop !== 'errors' && prop !== 'OptionsGroupSize' && prop !== 'OptionsNumberOfEntries' && prop !== 'OptionsPurpose' && prop !== 'OptionsRegistration' && prop !== 'OptionsDelivery' && prop !== 'OptionsCities' && prop !== 'OptionsHotels' && prop !== 'OptionsAutoModels' && prop !== 'OptionsAutoColors' && prop !== 'OptionsCardType' && prop !== 'countryApplyInNotesText' && prop !== 'countryApplyInFullName' && prop !== 'OptionsCurrenciesRate'){
                if(prop === 'visitors'){
                    for (let i = 0; i < this.state.visitors.length; i++) {
                        // formData['birthDate' + (i + 1)] = this.state.visitors[i].birthDate.value
                        formData['dobYear' + (i + 1)] = Moment(this.state.visitors[i].birthDate.value).format('YYYY')
                        formData['dobMonth' + (i + 1)] = Moment(this.state.visitors[i].birthDate.value).format('MMMM')
                        formData['dobDay' + (i + 1)] = Moment(this.state.visitors[i].birthDate.value).format('DD')
                        formData['passportCitzenship' + (i + 1)] = this.state.visitors[i].citizenship.value
                        formData['firstName' + (i + 1)] = this.state.visitors[i].firstName.value
                        formData['middleName' + (i + 1)] = this.state.visitors[i].middleName.value
                        // formData['passportExpired' + (i + 1)] = this.state.visitors[i].passportExpired.value
                        formData['passportYearExpires' + (i + 1)] = Moment(this.state.visitors[i].passportExpired.value).format('YYYY')
                        formData['passportMonthExpires' + (i + 1)] = Moment(this.state.visitors[i].passportExpired.value).format('MMMM')
                        formData['passportDayExpires' + (i + 1)] = Moment(this.state.visitors[i].passportExpired.value).format('DD')
                        // formData['passportIssued' + (i + 1)] = this.state.visitors[i].passportIssued.value
                        formData['passportYearIssued' + (i + 1)] = Moment(this.state.visitors[i].passportIssued.value).format('YYYY')
                        formData['passportMonthIssued' + (i + 1)] = Moment(this.state.visitors[i].passportIssued.value).format('MMMM')
                        formData['passportDayIssued' + (i + 1)] = Moment(this.state.visitors[i].passportIssued.value).format('DD')
                        formData['passportNumber' + (i + 1)] = this.state.visitors[i].passportNumber.value
                        formData['gender_' + (i + 1)] = this.state.visitors[i].sex.value
                        formData['surName' + (i + 1)] = this.state.visitors[i].surName.value
                    }
                }
                else
                    if(prop === 'locations'){
                        for (let i = 0; i < this.state.locations.length; i++) {
                            formData['visitHotel' + (i + 1)] = this.state.locations[i].hotel.value.value
                            formData['visitCity' + (i + 1)] = this.state.locations[i].city.value.value
                        }
                    }
                    else
                        if(prop === 'autoColor' ||
                        prop === 'autoModel' ||
                        prop === 'delivery' ||
                        prop === 'groupSize' ||
                        prop === 'numberOfEntries' ||
                        prop === 'purpose' ||
                        prop === 'registration'){
                            formData.vehicleColor = this.state.autoColor.value.value
                            formData.vehicleMake = this.state.autoModel.value.value
                            formData.deliveryOption = this.state.delivery.value.value
                            formData.groupNum = this.state.groupSize.value.value
                            formData.visaType = this.state.numberOfEntries.value.value
                            formData.purposeOfVisit = this.state.purpose.value.value
                            formData.regService = this.state.registration.value.value
                        }
                        else
                            if(prop === 'totalPrice' || prop === 'usersCountry') {
                                formData.consulateCountry = this.state.usersCountry
                                formData.totalPrice = this.state.totalPrice
                            }
                            else
                                if(prop === 'autoNumber') {
                                    formData.vehiclePlateNumber = this.state.autoNumber.value
                                }
                                else
                                    if(prop === 'departureDate1' || prop === 'arrivalDate1' || prop === 'departureDate2' || prop === 'arrivalDate2'){
                                        formData.arrivalDate1 = Moment(this.state.arrivalDate1.value).format('YYYY')
                                        formData.departureDate1 = Moment(this.state.departureDate1.value).format('YYYY')
                                    }
                                    else formData[prop] = this.state[prop].value
            }


        }
        console.log(formData);
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
        console.log(retrievedState);
    }

    saveApplication() {
        let state = JSON.stringify(this.state);
        localStorage.setItem('state', state);
        console.log(this.state);
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
        if (state.visitors.length > 0)
          var sixMonthBeforePassportExpired = Moment(state.visitors[0].passportExpired.value).subtract(6, "month");
        else
          sixMonthBeforePassportExpired = new Date().setFullYear(3000);

        if (datePickerName === "birthDate" || datePickerName === "passportIssued") {
            return function(current) {
                //должна быть позже сегодня
                return current.isBefore(today);
            };
        } else if (datePickerName === "userExpiryDate") {
            return function(current) {
                return current.isAfter(today);
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
       this.makeFieldsVisited(4);
       this.validate();
       state["steps"][1].correct = this.checkIsStepCorrect(1);
       state["steps"][2].correct = this.checkIsStepCorrect(2);
       state["steps"][3].correct = this.checkIsStepCorrect(3);
       state["steps"][4].correct = this.checkIsStepCorrect(4);
       if (!state["steps"][1].correct || !state["steps"][2].correct || !state["steps"][3].correct) {
         alert("You have errors!");
         state["userCompleteForm"].value = "2";
         state["userCompleteForm"].error = "This field must be accepted.";
         this.setState(state);
       } else {
         state["userCompleteForm"].value = value;
         this.setState(state);
       }
     }

     if (path.indexOf("countryApplyIn") !== -1 && path.indexOf("visited") === -1) {

       let country = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(state.countryApplyIn.value);
       let text = window.Visas.Russian.RussianConsulateSettignsRepository.Current.GetTouristNoteByCountry(country);
       state.countryApplyInNotesText = text;
       state.countryApplyInFullName = country;
       this.setState(state);
     }

     if (path.indexOf("groupSize") !== -1 || path.indexOf("registration") !== -1 || path.indexOf("numberOfEntries") !== -1 || path.indexOf("currency") !== -1)
       this.priceCalculate();

     if ((path.indexOf("registration") !== -1 || path.indexOf("arrivalDate") !== -1 || path.indexOf("departureDate") !== -1) && path.indexOf("visited") === -1) {
       //если регистрация выбрана
       if (typeof this.state.registration.value.value !== "undefined") {
         //если регистрация нужна
         if (this.state.registration.value.value !== "NO") {
           //ДЛЯ ПЕРВОЙ ДАТЫ
           if ((typeof this.state.arrivalDate1.value === "object" && typeof this.state.departureDate1.value === "object") || (typeof this.state.arrivalDate2.value === "object" && typeof this.state.departureDate2.value === "object")) {
             //если между датами меньше 7 дней
             if ((daysBetween(this.state.arrivalDate1.value.toDate(), this.state.departureDate1.value.toDate()) < 7) || (daysBetween(this.state.arrivalDate2.value.toDate(), this.state.departureDate2.value.toDate()) < 7)) {
               //вывести alert о том, что регистрация необязательна
               alert("Your tourney less than 7 days, registration is not required");
             }
             //ДЛЯ ВТООРОЙ ДАТЫ
             // if (typeof this.state.arrivalDate2.value === "object" && typeof this.state.departureDate2.value === "object") {
             //   //если между датами меньше 7 дней
             //   if (daysBetween(this.state.arrivalDate2.value.toDate(), this.state.departureDate2.value.toDate()) < 7) {
             //     //вывести alert о том, что регистрация необязательна
             //     alert("Your tourney less than 7 days, registration is not required");
             //   }
             // }
           }
         }
       }
     }

     if (path.indexOf("city") !== -1 && path.indexOf("visited") === -1) {
       if (value.value === "Makhachkala" || value.value === "Pyatigorsk" || value.value === "Vladikavkaz" || value.value === "Magas") {
         alert("Visa processing for Caucasus cities is 10 days");
       }
     }

     if ((path.indexOf("registration") !== -1 || path.indexOf("country") !== -1) && path.indexOf("visited") === -1) {
       let country = window.Visas.Russian.CountryRepository.Current.getNameByIsoAlpha2Code(this.state.countryApplyIn.value);
       if (this.state.registration.value != "NO") {
         if (country === "Malaysia" || country === "Singapore") {
           alert(country + " can't register in Saint Petersburg");
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
          state.userCompleteForm.visited = true;
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
                  state.errors.push({name: "visitors." + i + ".firstName",text: "Visitor's " + (i + 1) + " First name", step: 2})
                }
                if (this.state.visitors[i].middleName.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".middleName",text: "Visitor's " + (i + 1) + " Middle name", step: 2})
                }
                if (this.state.visitors[i].surName.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".surName",text: "Visitor's " + (i + 1) + " Surname", step: 2})
                }
                if (this.state.visitors[i].sex.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".sex",text: "Visitor's " + (i + 1) + " Gender", step: 2})
                }
                if (this.state.visitors[i].birthDate.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".birthDate",text: "Visitor's " + (i + 1) + " Birth date", step: 2})
                }
                if (this.state.visitors[i].citizenship.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".citizenship",text: "Visitor's " + (i + 1) + " Citizenship", step: 2})
                }
                if (this.state.visitors[i].passportNumber.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportNumber",text: "Visitor's " + (i + 1) + " Passport number", step: 2})
                }
                if (this.state.visitors[i].passportIssued.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportIssued",text: "Visitor's " + (i + 1) + " Date passport issued", step: 2})
                }
                if (this.state.visitors[i].passportExpired.error !== ""){
                  correct = false;
                  state.errors.push({name: "visitors." + i + ".passportExpired",text: "Visitor's " + (i + 1) + " Date passport expired", step: 2})
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
            autoNumber: state.autoNumber.value

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
            autoNumber: "required"
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
                <Input hintText="This is the help text for field 'First name'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".firstName"} value={this.state.visitors[visitorIndex].firstName.value} visited={this.state.visitors[visitorIndex].firstName.visited} label="First name" placeholder="Please enter First name" error={this.state.visitors[visitorIndex].firstName.error}/>
                <Input hintText="This is the help text for field 'Middle name'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".middleName"} value={this.state.visitors[visitorIndex].middleName.value} visited={this.state.visitors[visitorIndex].middleName.visited} label="Middle name" placeholder="Please enter Middle name" error={this.state.visitors[visitorIndex].middleName.error}/>
                <Input hintText="This is the help text for field 'Surname'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".surName"} value={this.state.visitors[visitorIndex].surName.value} visited={this.state.visitors[visitorIndex].surName.visited} label="Surname" placeholder="Please enter Surname" error={this.state.visitors[visitorIndex].surName.error}/>

                <div className="row align-items-center" style={{"maxWidth": "655px", "marginTop": "10px"}}>
                    <div className="col-md-6">
                        <RadioGroup hintText="This is the help text for field 'Gender'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className="mb-3 Input_half" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".sex"} error={this.state.visitors[visitorIndex].sex.error} value={this.state.visitors[visitorIndex].sex.value} title="Gender" options={[
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
                        <Input hintText="This is the help text for field 'Date of birth'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="date" dateValidator={this.getRestrictForDate("birthDate")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".birthDate"} value={this.state.visitors[visitorIndex].birthDate.value} viewDate={new Date().setFullYear(new Date().getFullYear() - 40)} visited={this.state.visitors[visitorIndex].birthDate.visited} label="Date of birth" placeholder="" error={this.state.visitors[visitorIndex].birthDate.error}/>
                    </div>

                </div>


                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input hintText="This is the help text for field 'Citizenship'" currentHint={this.state.currentHint} usersCountry={this.state.usersCountry} updateCurrentHint={this.updateCurrentHint} className="mt-4 mr-2 Input_half" type="country" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".citizenship"} value={this.state.visitors[visitorIndex].citizenship.value} visited={this.state.visitors[visitorIndex].citizenship.visited} label="Citizenship" error={this.state.visitors[visitorIndex].citizenship.error}/>
                    </div>
                    <div className="col-md-6">
                        <Input hintText="This is the help text for field 'Passport number'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="text" updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportNumber"} value={this.state.visitors[visitorIndex].passportNumber.value} visited={this.state.visitors[visitorIndex].passportNumber.visited} label="Passport number" placeholder="Please enter passport number" error={this.state.visitors[visitorIndex].passportNumber.error}/>
                    </div>
                </div>

                <div className="row" style={{
                        maxWidth: "655px"
                    }}>
                    <div className="col-md-6">
                        <Input hintText="This is the help text for field 'Date passport issued'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="date" className="mt-4 mr-2 Input_half" dateValidator={this.getRestrictForDate("passportIssued")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportIssued"} value={this.state.visitors[visitorIndex].passportIssued.value} visited={this.state.visitors[visitorIndex].passportIssued.visited} label="Date passport issued" placeholder="" error={this.state.visitors[visitorIndex].passportIssued.error}/>
                    </div>

                    <div className="col-md-6">
                        <Input hintText="This is the help text for field 'Date passport expired'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="date" className="mt-4" dateValidator={this.getRestrictForDate("passportExpired")} updateField={this.updateField} fieldName={"visitors." + visitorIndex + ".passportExpired"} value={this.state.visitors[visitorIndex].passportExpired.value} visited={this.state.visitors[visitorIndex].passportExpired.visited} label="Date passport expired" placeholder="" error={this.state.visitors[visitorIndex].passportExpired.error}/>
                    </div>
                </div>

                {
                    visitorIndex === 0
                        ? [
                            <Input hintText="This is the help text for field 'Email'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="email" className="mt-4" updateField={this.updateField} fieldName="email" value={this.state.email.value} visited={this.state.email.visited} label="Email" placeholder="example@mail.com" error={this.state.email.error}/>,

                            <Input hintText="This is the help text for field 'Telephone'" usersCountry={this.state.usersCountry} currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="phone" className="mt-4" updateField={this.updateField} fieldName="phone" value={this.state.phone.value} visited={this.state.phone.visited} label="Telephone" error={this.state.phone.error}/>
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

        <Input hintText="This is the help text for field 'Vehicle make'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="select" className="mt-4" updateField={this.updateField} value={this.state.autoModel.value} fieldName="autoModel" visited={this.state.autoModel.visited} label="Vehicle make" error={this.state.autoModel.error} options={this.state.OptionsAutoModels}/>,
        <Input hintText="This is the help text for field 'Vehicle color'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="select" className="mt-4" updateField={this.updateField} value={this.state.autoColor.value} fieldName="autoColor" visited={this.state.autoColor.visited} label="Vehicle color" error={this.state.autoColor.error} options={this.state.OptionsAutoColors}/>,
        <Input hintText="This is the help text for field 'Licence Plate number'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="text" className="mt-4" updateField={this.updateField} value={this.state.autoNumber.value} fieldName="autoNumber" visited={this.state.autoNumber.visited} label="Licence Plate number" error={this.state.autoNumber.error}/>
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
                    <Input hintText="This is the help text for field 'Arrival date'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} dateValidator={this.getRestrictForDate("arrivalDate" + (
                        inputIndex + 1))} type="date" className="mt-4 mr-2 Input_half"  updateField={this.updateField} fieldName={"arrivalDate" + (
                        inputIndex + 1)} value={this.state["arrivalDate" + (
                            inputIndex + 1)].value} visited={this.state["arrivalDate" + (
                            inputIndex + 1)].visited} label={"Entry " + (
                        inputIndex + 1) + " - Arrival date"} placeholder="" error={this.state["arrivalDate" + (
                            inputIndex + 1)].error}/>
                </div>
                <div className="col-md-6">
                    <Input hintText="This is the help text for field 'Departure date'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} dateValidator={this.getRestrictForDate("departureDate" + (
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
                // console.log(state.locations[locationIndex].OptionsHotels);
                // console.log(state.OptionsHotels);
                return [
                    <ToggleTab className="mt-4" label={"Location " + (
                        locationIndex + 1)}>
                        <Input hintText="This is the help text for field 'City'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="select" className="mt-4" updateField={this.updateField} value={state.locations[locationIndex].city.value} fieldName={"locations." + locationIndex + ".city"} visited={state.locations[locationIndex].city.visited} label="City" error={state.locations[locationIndex].city.error} options={state.OptionsCities}/>
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
                            error={state.locations[locationIndex].hotel.error}
                            options={state.locations[locationIndex].OptionsHotels}
                        />
                    </ToggleTab>,
                    <div>
                    {state.locations.length > 1 ?
                        <Button className="Button_red-label ml-auto mr-5 mt-3" handleClick={() => this.removeLocation(locationIndex)} label={"remove location " + (locationIndex + 1)}/> : ""
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
                            <h4 className="Step__need-title my-3">You will need to hand:</h4>
                            <div className="Step__need-body row">
                                <div className="Step__need-list col-md-3">
                                    <ul>
                                        <li>Passports</li>
                                        <li>Your group’s personal details</li>
                                        <li>Your proposed travel dates</li>
                                    </ul>
                                </div>
                                <div className="Step__need-list col-md-4">
                                    <ul>
                                        <li>Passports</li>
                                        <li>Your group’s personal details</li>
                                        <li>Your proposed travel dates</li>
                                    </ul>
                                </div>
                                <div className="Step__description col-md-4">
                                    <img className="mr-4" src={clocksImg} alt="" />
                                    <div className="Step__text"><b>You will need approximately</b> <span className="Step__text_red">20 minutes</span> to complete this application</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row py-4 px-5 my-4">
                        <div className="d-flex col-md-6 flex-column flex-xl-row col-md-7">
                            <Button
                                label="retrieve saved application"
                                className="mr-3"
                                text="LOAD a previously saved existing application."
                                handleClick={() => this.retrieveApplication()}
                            />
                            <Button
                                handleClick={() => this.updateField("currentStep", this.state.currentStep + 1)}
                                className="Button_red"
                                label="NEXT STEP >"
                                text="START a new application."
                            />
                        </div>
                        <div className="Step__intro-text ml-auto col-md-5">
                            <b>With our simple step by step process</b>, you can see exactly how far through you are - along with if you have successfully completed a section, or are still missing some information.
                        </div>
                    </div>

                    <div className="Step__intro-img"></div>

                </div>
            )
        }

        /*********1*******/

        if (this.state.currentStep === 1) {
            return (<Step number={1} hidden={this.state.currentStep !== 1}>
                <Input hintText="This is the help text for field 'Group Size'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} type="select" updateField={this.updateField} fieldName="groupSize" value={this.state.groupSize.value} visited={this.state.groupSize.visited} label="Group Size" error={this.state.groupSize.error} options={this.state.OptionsGroupSize}/>
                <Input hintText="This is the help text for field 'Number of entries'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="select" updateField={this.updateField} fieldName="numberOfEntries" value={this.state.numberOfEntries.value} visited={this.state.numberOfEntries.visited} label="Number of entries" error={this.state.numberOfEntries.error} options={this.state.OptionsNumberOfEntries}/>
                <Input hintText="This is the help text for field 'Purpose of visit'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="select" updateField={this.updateField} fieldName="purpose" value={this.state.purpose.value} visited={this.state.purpose.visited} label="Purpose of visit" error={this.state.purpose.error} options={this.state.OptionsPurpose}/>
                <Input hintText="This is the help text for field 'Registration'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="select" updateField={this.updateField} fieldName="registration" value={this.state.registration.value} visited={this.state.registration.visited} label="Registration" error={this.state.registration.error} options={this.state.OptionsRegistration}/>
                <Input hintText="This is the help text for field 'Country appling in'" usersCountry={this.state.usersCountry} currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="country" updateField={this.updateField} fieldName="countryApplyIn" value={this.state.countryApplyIn.value} visited={this.state.countryApplyIn.visited} label="Country appling in" error={this.state.countryApplyIn.error}/>
                {this.state.countryApplyInNotesText !== "" ? <Info text={this.state.countryApplyInNotesText} data={[this.state.countryApplyInFullName]} replaceStr="{Country}"/> : ""}
                <Input hintText="This is the help text for field 'Delivery option'" currentHint={this.state.currentHint} updateCurrentHint={this.updateCurrentHint} className="mt-4" type="select" updateField={this.updateField} fieldName="delivery" value={this.state.delivery.value} visited={this.state.delivery.visited} label="Delivery option" error={this.state.delivery.error} options={this.state.OptionsDelivery}/>
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
                <RadioGroup hintText="This is the help text for field 'userNeedsNewsletter'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} updateField={this.updateField} fieldName="userNeedsNewsletter" error={this.state.userNeedsNewsletter.error} value={this.state.userNeedsNewsletter.value} title="Would you like to join our monthly newsletter list" options={[
                        {
                            value: "1",
                            text: "Yes"
                        }, {
                            value: "2",
                            text: "No"
                        }
                    ]} name="userNeedsNewsletter"/>
                <RadioGroup hintText="This is the help text for field 'userNeedsJoinMailingList'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} updateField={this.updateField} fieldName="userNeedsJoinMailingList" error={this.state.userNeedsJoinMailingList.error} value={this.state.userNeedsJoinMailingList.value} title="Would you like to join our mailing list for special offers, news and information" options={[
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
                <RadioGroup hintText="This is the help text for field 'userCompleteForm'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} visited={this.state.userCompleteForm.visited} updateField={this.updateField} fieldName="userCompleteForm" error={this.state.userCompleteForm.error} value={this.state.userCompleteForm.value} title="Having completed my application, I agree that the above visa application is suitable and have read and understood the <b><a style='color:black;text-decoration:underline' target='_blank' href='http://realrussia.co.uk/Portals/0/files/Visa-Terms.pdf'>terms and conditions</a></b>" options={[
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

                <Step number={5} price={this.state.totalPrice} currency={this.state.currency}>
                    <Input hintText="This is the help text for field 'First name'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userFirstName" value={this.state.userFirstName.value} visited={this.state.userFirstName.visited} label="First name" error={this.state.userFirstName.error}/>
                    <Input hintText="This is the help text for field 'Surname'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userSurname" value={this.state.userSurname.value} visited={this.state.userSurname.visited} label="Surname"  error={this.state.userSurname.error}/>
                    <div className="row" style={{
                            maxWidth: "655px"
                        }}>
                        <div className="col-md-6">
                            <Input hintText="This is the help text for field 'House number/name'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 mr-2 Input_half "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userHouseNumber" value={this.state.userHouseNumber.value} visited={this.state.userHouseNumber.visited} label="House number/name" error={this.state.userHouseNumber.error}/>
                        </div>
                        <div className="col-md-6">
                            <Input hintText="This is the help text for field 'Postcode'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userPostcode" value={this.state.userPostcode.value} visited={this.state.userPostcode.visited} label="Postcode" error={this.state.userPostcode.error}/>
                        </div>
                    </div>
                    <Input hintText="This is the help text for field 'Card type'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} type="select" className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")} updateField={this.updateField} value={this.state.userCardType.value} fieldName="userCardType" visited={this.state.userCardType.visited} label="Card type" error={this.state.userCardType.error} options={this.state.OptionsCardType}/>
                    <Input hintText="This is the help text for field 'Card number'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userCardNumber" value={this.state.userCardNumber.value} visited={this.state.userCardNumber.visited} label="Card number"  error={this.state.userCardNumber.error}/>
                    <div className="row" style={{
                            maxWidth: "655px"
                        }}>
                        <div className="col-md-6">
                            <Input hintText="This is the help text for field 'Expiry date'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 Input_half "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="date" dateValidator={this.getRestrictForDate("userExpiryDate")} updateField={this.updateField} fieldName="userExpiryDate" value={this.state.userExpiryDate.value} visited={this.state.userExpiryDate.visited} label="Expiry date" error={this.state.userExpiryDate.error}/>
                        </div>
                        <div className="col-md-6">
                            <Input hintText="This is the help text for field 'CCV'" updateCurrentHint={this.updateCurrentHint} currentHint={this.state.currentHint} className={"mt-4 "+ (this.state.userCompleteForm.value !== '1' ? "disabled" : "")}  type="text" updateField={this.updateField} fieldName="userCCV" value={this.state.userCCV.value} visited={this.state.userCCV.visited} label="CCV"  error={this.state.userCCV.error}/>
                        </div>
                    </div>
                    <div className="Step__note mt-4 mt-lg-0">
                        <b className="Step__color-red">SECURE PAYMENT PROCESSING</b>
                        <div className="Step__step-note my-3">"Text about how secure payment is Text about how secure payment is Text about how secure payment is"</div>
                        <div className="d-flex">
                            <img src={mastercard} alt="Mastercard" className="mr-2"/>
                            <img src={visa} alt="visa" className="mr-2"/>
                            <img src={visaDebit} alt="visa-debit" className="mr-2"/>
                            <img src={americanExpress} alt="american-express"/>
                        </div>
                    </div>
                </Step>,


            ];
        }

    render() {

        return (
            <div className="App text-center text-md-left mb-5">


                <Header
                updateField={this.updateField}
                steps={this.state.steps}
                currentStep={this.state.currentStep}
                currencies={this.state.currencies}
                currency={this.state.currency}
                price={this.state.totalPrice}
                userCompleteForm ={this.state.userCompleteForm.value}
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
                />
                <Sticky type="errorSticky" links={this.state.errors} updateField={this.updateField}/>
                  <div className="container px-0 mr-auto ml-0">
                      <div className="row py-3" hidden={this.state.currentStep === 0}>
                          <div className="d-flex col-md-6 flex-column flex-md-row">
                              <Button
                                  label="retrieve saved application"
                                  className="mr-3"
                                  text="CONTINUE a saved existing application"
                                  handleClick={() => this.retrieveApplication()}
                              />
                              <Button
                                  label="save progress"
                                  text="SAVE your current progress"
                                  handleClick={() => this.saveApplication()}
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
                      <div className="col-sm-6" hidden={this.state.currentStep === 0}>
                          <Button className="align-self-md-start align-self-center" label="Save progress" handleClick={() => this.saveApplication()}/>
                      </div>

                      <div className={
                              ((this.state.currentStep !== 0 && this.state.userCompleteForm.value !== "1" ) ? "col-sm-3 d-block"  : "d-none")
                          }>
                          <Button
                              handleClick={() => this.updateField("currentStep", this.state.currentStep - 1)}
                              className={"Button_red-border align-self-md-end align-self-center"}
                              label="Previous step"
                          />
                      </div>
                      <div className={
                              ((this.state.currentStep === 1) ? "col-sm-3 d-block" : (this.state.currentStep !== 4 && this.state.currentStep !== 0) ? "col-sm-3 d-block"  : "d-none")
                          }>
                          <Button
                              handleClick={() => this.updateField("currentStep", this.state.currentStep + 1)}
                              className="Button_red align-self-md-end align-self-center"
                              label="Next step >"
                          />
                      </div>
                      <div className={
                              ((this.state.currentStep === 4 && this.state.userCompleteForm.value !== "1") ? "col-sm-3 d-block" : (this.state.currentStep === 4 && this.state.userCompleteForm.value == "1") ? "col-sm-6 d-block" : "d-none")
                          }>
                          <Button
                              className={
                                  "Button_red align-self-md-end align-self-center " +
                                  (this.state.userCompleteForm.value !== "1" ? "disabled" : "")
                              }
                              label="Make payment"
                              handleClick={() => this.sendFormData}
                          />
                      </div>

                  </div>
              </div>
        </div>
        );
    }
}

export default App;

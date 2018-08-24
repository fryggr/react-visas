import React from "react";



/*******IMPORT COMPONENTS********/
import Select from "react-select";
import Datetime from "react-datetime";
import ReactFlagsSelect from "react-flags-select";
import "react-phone-number-input/style.css";
import ReactPhoneInput from "react-phone-input-2";
import IntlTelInput from 'react-intl-tel-input';
/*******IMPORT STYLES********/
import "./Input.css";
import "react-flags-select/css/react-flags-select.css";
import "./../Datepicker/Datepicker.css";
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import { Hint } from "./../Hint/Hint";

export class Input extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillUpdate(){
      if (typeof this.refs.country !== 'undefined')
        this.refs.country.updateSelected(this.props.value)
  }

  render() {
    let { type, label, fieldName, placeholder, visited, value, dateValidator, error, updateField, options, updateCurrentHint, currentHint, viewDate } = {
      ...this.props
    };

    if (typeof viewDate === "undefined") viewDate = new Date();

    let disabled = false;
    if (typeof this.props.className !== "undefined") disabled = this.props.className.indexOf("disabled") !== -1;
    let className = typeof this.props.className !== "undefined" ? this.props.className : "";
    if (visited) {
      className += error !== "" ? " incorrect" : " correct";
    }

    if (type !== "select" && type !== "date" && type !== "country" && type !== "phone") {
      return (
        <div className="Input-wrapper">
          {currentHint === fieldName ? <div className="Input-wrapper__inFocus" /> : ""}
          <div className={"Input " + className}>
            <label className="Input__label">{label}</label>
            <input
              disabled={disabled}
              onFocus={(e) => updateCurrentHint(e,fieldName)}
              onBlur={e => {
                updateField(fieldName + ".visited", true);
                updateField(fieldName + ".value", e.target.value);
              }}
              onChange={e => updateField(fieldName + ".value", e.target.value)}
              className="Input__field"
              type={type}
              value={value}
              placeholder={placeholder}
            />

            <div className="Input__error">{visited ? error : ""}</div>
            {currentHint === fieldName ? <Hint hintText={this.props.hintText} /> : ""}
          </div>
        </div>
      );
    } else if (type === "select") {
      // CUSTOM STYLES FOR Select
      const indicatorSeparator = () => ({
        color: "red"
      });
      const colourStyles = {
        indicatorSeparator: styles => ({ ...indicatorSeparator }),
        menu: styles => ({ ...styles, position: "relative", zIndex: "999999" }),
        dropdownIndicator: styles => ({
          ...styles,
          background:
            "url(https://cdn4.iconfinder.com/data/icons/iready-symbols-arrows-vol-1/28/004_038_down_arrow_next_bottom_end_circle1x-512.png) no-repeat center / 13px"
        })
      };
      return (
        <div className="Input-wrapper">
          {currentHint === fieldName ? <div className="Input-wrapper__inFocus" /> : ""}
          <div className={"Input Select " + className}>
            <label className="Input__label">{label}</label>
            <Select
              isDisabled={disabled}
              classNamePrefix="react-select"
              styles={colourStyles}
              className="Input__field"
              value={value}
              placeholder="Please select"
              onChange={selectedOption => {
                updateField(fieldName + ".visited", true);
                updateField(fieldName + ".value", selectedOption);
              }}
              onFocus={(e) => updateCurrentHint(e,fieldName)}
              onBlur={e => {
                updateField(fieldName + ".visited", true);
              }}
              options={options}
            />
            {currentHint === fieldName ? <Hint hintText={this.props.hintText}/> : ""}
            <div className="Input__error">{visited ? error : ""}</div>
          </div>
        </div>
      );
    } else if (type === "date") {
      return (
        <div className="Input-wrapper">
          {currentHint === fieldName ? <div className="Input-wrapper__inFocus" /> : ""}
          <div className={"Input " + className}>
            <label className="Input__label">{label}</label>
            <Datetime
              inputProps={{ disabled: disabled, readonly: "readonly" }}
              isValidDate={dateValidator}
              open={currentHint === fieldName}
              onFocus={(e) => updateCurrentHint(e,fieldName)}
              onChange={(e,date) => {
                updateField(fieldName + ".value", date);
                updateCurrentHint(e,"");
              }}
              onBlur={(e) => {
                updateField(fieldName + ".visited", true);
                updateCurrentHint(e,"");
              }}
              viewDate={viewDate}
              input={true}
              closeOnSelect={true}
              timeFormat={false}
              dateFormat="DD MMM YYYY"
              viewMode="years"
              className="Datepicker"
              value={value}
              disableOnClickOutside={false}
            />
            {currentHint === fieldName ? <Hint hintText={this.props.hintText}/> : ""}
            <div className="Input__error">{visited ? error : ""}</div>
          </div>
        </div>
      );
    } else if (type === "country") {

      return (
        <div className="Input-wrapper">
          {currentHint === fieldName ? <div className="Input-wrapper__inFocus" /> : ""}
          <div className={"Input Select_country " + className} onClick={(e) => updateCurrentHint(e,fieldName)}>
            <label className="Input__label">{label}</label>
            <ReactFlagsSelect
              ref="country"
              className=""
              showSelectedLabel={true}
              showOptionLabel={true}
              selectedSize={14}
              defaultCountry={this.props.usersCountry}
              placeholder="Please select"
              searchPlaceholder="please type"
              searchable={true}
              onSelect={selectedOption => {
                updateField(fieldName + ".visited", true);
                updateField(fieldName + ".value", selectedOption);
              }}
            />
            {currentHint === fieldName ? <Hint hintText={this.props.hintText}/> : ""}
            <div className="Input__error">{visited ? error : ""}</div>
          </div>
        </div>
      );
    } else if (type === "phone") {
        console.log("PHONE COUNTRY = ", this.props.usersCountry);
      return (
        <div className="Input-wrapper" onFocus={(e) => updateCurrentHint(e,fieldName)}>
          {currentHint === fieldName ? <div className="Input-wrapper__inFocus" /> : ""}
          <div className={"Input Select_country " + className}>
            <label className="Input__label">{label}</label>
            {
            <IntlTelInput
                defaultCountry={typeof this.props.usersCountry === 'undefined' ? 'gb' : this.props.usersCountry.toLowerCase()}
                preferredCountries={["gb", "fr", "ru", "us"]}
                css={ ['intl-tel-input', 'form-control'] }
                utilsScript={ 'libphonenumber.js' }
                autoComplete={'on'}
                format={true}
                onPhoneNumberFocus={(e) => updateCurrentHint(e,fieldName)}
                onPhoneNumberChange={(status, value, countryData, number, id) => {
                    updateField(fieldName + ".value", number)
                  }}
                onPhoneNumberBlur={e => {
                  updateField(fieldName + ".visited", true);
                }}
                defaultValue={value}
              />
              }

            {
            /*<ReactPhoneInput
              defaultCountry={typeof this.props.usersCountry === 'undefined' ? 'gb' : this.props.usersCountry.toLowerCase()}
              preferredCountries={["gb", "fr", "ru", "us"]}
              disableAreaCodes={true}
              placeholder="+1 234 567 89"
              onFocus={() => updateCurrentHint(fieldName)}
              value={value}
              onChange={phone => updateField(fieldName + ".value", phone)}
              onBlur={e => {
                updateField(fieldName + ".visited", true);
              }}
            />*/
            }
            {currentHint === fieldName ? <Hint hintText={this.props.hintText}/> : ""}
            <div className="Input__error">{visited ? error : ""}</div>
          </div>
        </div>
      );
    }
  }
}

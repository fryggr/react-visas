import React from "react";

/*******IMPORT COMPONENTS********/
import Select from "react-select";
import Datetime from "react-datetime";
import ReactFlagsSelect from "react-flags-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Moment from "moment";
/*******IMPORT STYLES********/
import "./Input.css";
import "react-flags-select/css/react-flags-select.css";
import "./../Datepicker/Datepicker.css";
import { Hint } from "./../Hint/Hint";

export class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = { inFocus: false };
        this.toggleFocus = this.toggleFocus.bind(this);

    }

    toggleFocus() {
        this.setState({ inFocus: !this.state.inFocus }, () =>
            console.log(this.state.inFocus)
        );
    }

    render() {
        const {
            type,
            label,
            fieldName,
            placeholder,
            visited,
            value,
            dateValidator,
            error,
            updateField,
            options,
            updateCurrentHint,
            currentHint
        } = { ...this.props };
        const { inFocus } = { ...this.state };
        let className =
            typeof this.props.className !== "undefined"
                ? this.props.className
                : "";
        if (visited) {
            className += error !== "" ? " incorrect" : " correct";
        }

        if (
            type !== "select" &&
            type !== "date" &&
            type !== "country" &&
            type !== "phone"
        ) {
            return (
                <div className={"Input " + className}>
                    <label className="Input__label">{label}</label>
                    <input
                        onFocus={() => updateCurrentHint(fieldName) }
                        onBlur={e => {
                            updateField(fieldName + ".visited", true);
                            updateField(fieldName + ".value", e.target.value);

                        }}
                        onChange={e =>
                            updateField(fieldName + ".value", e.target.value)
                        }
                        className="Input__field"
                        type={type}
                        value={value}
                        placeholder={placeholder}
                    />

                    <div className="Input__error">{visited ? error : ""}</div>
                    {currentHint === fieldName ? <Hint/> : ""}
                </div>
            );
        } else if (type === "select") {
          // CUSTOM STYLES FOR Select
          const indicatorSeparator = () => ({
            color: "red"
          });
          const colourStyles = {
            indicatorSeparator: styles => ({ ...indicatorSeparator}),
            menu: styles => ({...styles, position: 'relative', zIndex: "999999"}),
          };
            return (
                <div className={"Input Select " + className}>
                    <label className="Input__label">{label}</label>
                    <Select
                        styles={colourStyles}
                        className="Input__field"
                        value={value}
                        placeholder="Please select"
                        onChange={selectedOption => {
                            updateField(fieldName + ".visited", true);
                            updateField(fieldName + ".value", selectedOption);
                        }}
                        onFocus={() => updateCurrentHint(fieldName) }
                        onBlur={e => {
                            updateField(fieldName + ".visited", true);

                        }}
                        options={options}
                    />
                    {currentHint === fieldName ? <Hint/> : ""}
                    <div className="Input__error">{visited ? error : ""}</div>
                </div>
            );
        } else if (type === "date") {
            return (
                <div className={"Input " + className}>
                    <label className="Input__label">{label}</label>
                    <Datetime
                        isValidDate={dateValidator}
                        onChange={date =>
                            updateField(fieldName + ".value", date)
                        }
                        onBlur={date =>
                            updateField(fieldName + ".visited", true)
                        }
                        input={true}
                        closeOnSelect={true}
                        timeFormat={false}
                        dateFormat="DD MMM YYYY"
                        viewMode="years"
                        className="Datepicker"
                        value={value}
                    />
                    {currentHint === fieldName ? <Hint/> : ""}
                    <div className="Input__error">{visited ? error : ""}</div>
                </div>
            );
        } else if (type === "country") {
            return (
                <div
                    className={"Input Select_country " + className}
                >
                    <label className="Input__label">{label}</label>
                    <ReactFlagsSelect
                        className=""
                        showSelectedLabel={true}
                        showOptionLabel={true}
                        selectedSize={14}
                        defaultCountry={value}
                        placeholder="Please select"
                        searchPlaceholder="please type"
                        searchable={true}
                        onFocus={() => updateCurrentHint(fieldName) }
                        onSelect={selectedOption => {
                            updateField(fieldName + ".visited", true);
                            updateField(fieldName + ".value", selectedOption);
                        }}
                    />
                    {currentHint === fieldName ? <Hint/> : ""}
                    <div className="Input__error">{visited ? error : ""}</div>
                </div>
            );
        } else if (type === "phone") {
            return (
                <div className={"Input Select_country " + className}>
                    <label className="Input__label">{label}</label>
                    <PhoneInput
                        country="US"
                        placeholder="+1 234 567 89"
                        onFocus={() => updateCurrentHint(fieldName) }
                        value={value}
                        onChange={phone =>
                            updateField(fieldName + ".value", phone)
                        }
                        onBlur={e => {
                            updateField(fieldName + ".visited", true);

                        }}
                    />
                    {currentHint === fieldName ? <Hint/> : ""}
                    <div className="Input__error">{visited ? error : ""}</div>
                </div>
            );
        }
    }
}

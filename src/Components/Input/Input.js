import React from "react";

/*******IMPORT COMPONENTS********/
import Select from "react-select";
import DatePicker from "react-date-picker";
import ReactFlagsSelect from "react-flags-select";

/*******IMPORT STYLES********/
import "./Input.css";
import "react-flags-select/css/react-flags-select.css";
import "./../Datepicker/Datepicker.css";

export const Input = props => {
    let className =
        typeof props.className !== "undefined" ? props.className : "";
    if (props.visited) {
        className += props.error !== "" ? " incorrect" : " correct";
    }

    if (
        props.type !== "select" &&
        props.type !== "date" &&
        props.type !== "country"
    ) {
        return (
            <div className={"Input " + className}>
                <label className="Input__label">{props.label}</label>
                <input
                    onBlur={e => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(props.fieldName, e.target.value);
                    }}
                    onChange={e =>
                        props.updateField(props.fieldName, e.target.value)
                    }
                    value={props.value}
                    className="Input__field"
                    type={props.type}
                    placeholder={props.placeholder}
                />
                <div className="Input__error">
                    {props.visited ? props.error : ""}
                </div>
            </div>
        );
    } else if (props.type === "select") {
        return (
            <div className={"Input Select " + className}>
                <label className="Input__label">{props.label}</label>
                <Select
                    className="Input__field"
                    value={props.value}
                    placeholder="Please select"
                    onChange={selectedOption => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(
                            props.fieldName + ".value",
                            selectedOption
                        );
                    }}
                    onBlur={e =>
                        props.updateField(props.fieldName + ".visited", true)
                    }
                    options={props.options}
                />
                <div className="Input__error">
                    {props.visited ? props.error : ""}
                </div>
            </div>
        );
    } else if (props.type === "date") {
        return (
            <div className={"Input " + className}>
                <label className="Input__label">{props.label}</label>
                <DatePicker locale="en-EN" />
                <div className="Input__error">
                    {props.visited ? props.error : ""}
                </div>
            </div>
        )

    } else if (props.type === "country") {
        return (
            <div className={"Input Select_country " + className}>
                <label className="Input__label">{props.label}</label>
                <ReactFlagsSelect
                    className=""
                    showSelectedLabel={true}
                    showOptionLabel={true}
                    selectedSize={14}
                    placeholder="Please select"
                    searchPlaceholder="please type"
                    searchable={true}
                    onSelect={selectedOption => {
                        props.updateField(props.fieldName + ".visited", true);
                        props.updateField(
                            props.fieldName + ".value",
                            selectedOption
                        );
                    }}
                />
                <div className="Input__error">
                    {props.visited ? props.error : ""}
                </div>
            </div>
        );
    }
};

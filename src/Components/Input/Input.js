import React from "react";
import "./Input.css";

import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

export const Input = props => {
    let className = typeof props.className !== "undefined" ? props.className : "";
    if (props.visited) {
        className += props.error !== "" ? " incorrect" : " correct";
    }

    if (props.type !== "select" && props.type !== "date") {
        return (
            <div className={"Input " + className}>
                <label className="Input__label">{props.label}</label>
                <input
                    onBlur={e => {
                        props.updateVisited(props.fieldName);
                        props.handleFieldChange(props.fieldName, e.target.value);
                    }}
                    onChange={e => props.handleFieldChange(props.fieldName, e.target.value)}
                    value={props.value}
                    className="Input__field"
                    type={props.type}
                    placeholder={props.placeholder}
                />
                <div className="Input__error">{props.error}</div>
            </div>
        );
    }
    else if (props.type === "select"){
        return (
            <div className={"Input Select" + className}>
                <label className="Input__label">{props.label}</label>
                <Select
                    className="Input__field"
                    value={props.currency}
                    onChange={props.changeCurrency}
                    options={props.options}
                />
                <div className="Input__error">{props.error}</div>
            </div>
        )
    }
};

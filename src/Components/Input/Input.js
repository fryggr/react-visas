import React from "react";
import "./Input.css";

export const Input = props => {
  let className = typeof props.className !== "undefined" ? props.className : "";
  if (props.visited) {
    className += props.error !== "" ? " incorrect" : " correct";
  }

  return (
    <div className={"Input " + className}>
      <label className="Input__label">{props.label}</label>
      <input
        onBlur={(e) => {props.updateVisited(props.fieldName);props.handleFieldChange(props.fieldName, e.target.value)}}
        onChange={e => props.handleFieldChange(props.fieldName, e.target.value)}
        value={props.value}
        className="Input__field"
        type={props.type}
        placeholder={props.placeholder}
      />
      <div className="Input__error">{props.error}</div>
    </div>
  );
};

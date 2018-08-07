import React from "react";
import "./RadioGroup.css";

let radioElementsCount = 0;

function generateIdForNewRadio() {
  return "r" + ++radioElementsCount;
}

function getMaxId() {
  return radioElementsCount;
}

export const RadioGroup = props => {
  let className = typeof props.className !== "undefined" ? props.className : "";
  return (
    <div className={"RadioGroup " + className}>
      <div className="RadioGroup__title">{props.title}</div>
      <div className="RadioGroup__wrapper">
        {props.options.map(item => {
          return (
            <div className="RadioGroup__item">
              <input
                className="RadioGroup__item-field"
                type="radio"
                name={props.name}
                value={item.value}
                id={generateIdForNewRadio()}
                onClick={(e) => props.updateField(props.fieldName + ".value",e.target.value)}
              />
              <label
                className="RadioGroup__item-label"
                htmlFor={"r" + radioElementsCount}
              >
                {item.text}
              </label>
            </div>
          );
        })}
      </div>
      <div className="RadioGroup__error">{props.error}</div>
    </div>
  );
};

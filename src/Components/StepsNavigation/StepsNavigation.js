import React from "react";
import "./StepsNavigation.css";

export const StepsNavigation = props => {
  return (
    <div className="StepsNavigation">
      {/*Let's go around all steps*/}
      {props.steps.map((step, index) => {
        {/*define variables for step's state*/}
        let visited = step.visited ? "visited " : "";
        let active = index === props.currentStep ? "active " : "";
        let correct =
          typeof step.correct !== "undefined"
            ? step.correct
              ? "correct"
              : "incorrect"
            : "";

        {/*define variables for step's line state*/}
        let filled = index < props.currentStep ? "filled" : "";

        {/*return step and line after it*/}
        return [
          <div
            className={
              "StepsNavigation__item " +
              visited +
              " " +
              active +
              " " +
              correct +
              " " +
              props.className
            }
            onClick={() => props.changeCurrentStep(index)}
          >
            {index + 1} {/*because human numeration starts with 1, not 0*/}
            <div className="StepsNavigation__item-text">{step.stepName}</div>
          </div>,

          <div style={{ width: "100%" }}>
            {/*after last step we should not draw line*/}
            {index !== props.steps.length - 1 ? (
              <div className={"StepsNavigation__line " + filled} />
            ) : (
              ""
            )}
          </div>
        ];
      })}
    </div>
  );
};

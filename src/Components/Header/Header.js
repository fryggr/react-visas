import React from "react";
import "./Header.css";

import { StepsNavigation } from "./../StepsNavigation/StepsNavigation";

export const Header = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <h2 className="Header__title">
            Russian Tourist Visa Support Application
          </h2>
          <StepsNavigation
            changeCurrentStep={props.changeCurrentStep}
            steps={props.steps}
            currentStep={props.currentStep}
          />
        </div>
        <div className="col-lg-5" />
      </div>
    </div>
  );
};

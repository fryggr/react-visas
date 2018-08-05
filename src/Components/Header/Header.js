import React from "react";
import "./Header.css";

import { StepsNavigation } from "./../StepsNavigation/StepsNavigation";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

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
                <div className="col-lg-5">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="mr-5">
                                <label>Currency</label>
                                <Select
                                    className="Select_currency"
                                    value={props.currency}
                                    onChange={props.changeCurrency}
                                    options={props.currencies}
                                />
                            </div>
                            <div>
                                <label>Language</label>
                                <ReactFlagsSelect
                                    className="Select_language"
                                    countries={["GB", "RU"]}
                                    defaultCountry="GB"
                                    placeholder="Select Language"
                                    showSelectedLabel={true}
                                    showOptionLabel={true}
                                    selectedSize={14}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

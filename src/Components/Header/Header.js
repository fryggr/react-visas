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
                    {props.userCompleteForm === "1" ? "" : <StepsNavigation
                        updateField={props.updateField}
                        steps={props.steps}
                        currentStep={props.currentStep}
                    />}
                </div>
                <div className="col-lg-5">
                    <div className="container">
                        <div className="row align-items-center flex-column align-items-md-end flex-md-row">
                            <div className="mr-1 mr-sm-4">
                                <label>Currency</label>
                                <Select
                                    className="Select_currency"
                                    value={props.currency}
                                    onChange={(selectedCurrency) => props.updateField("currency", selectedCurrency)}
                                    options={props.currencies}
                                />
                            </div>
                            <div>
                                <label>Language</label>
                                <ReactFlagsSelect
                                    className="Select_language"
                                    countries={["GB", "RU"]}
                                    customLabels={{"RU": "Русский"}}
                                    defaultCountry="GB"
                                    placeholder="Select Language"
                                    showSelectedLabel={true}
                                    showOptionLabel={true}
                                    selectedSize={14}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="Header__price">
                                Total price{" "}
                                <span className="Header__price-value ml-1">
                                    {props.currency.label.slice(0, 1)}
                                    {props.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="Header__price-note">
                                Prices are shown in different currencies for your convenience, however payment will be made in British Pounds at the prevailing bank rate.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

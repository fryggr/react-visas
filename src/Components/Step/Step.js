import React from "react";
import "./Step.css";

import portfolioImg from "./img/portfolio.png";
import userImg from "./img/user.png";
import locationImg from "./img/location.png";
import paymentImg from "./img/payment.png";

export const Step = props => {
    let title, text, stepImg;
    if (props.number === 1) {
        title = "Service details";
        text = "<b>Let’s start with the basics - </b><br/>\
We need to find out first a little about your upcoming visit.";
        stepImg = portfolioImg;
    }
    if (props.number === 2) {
        title = "Personal details";
        text =
            "<b>Let us know a bit about yourself -  </b><br/>\
Just the key details we need to collect from you and your group to proceed with our application. You can add up to a further 5 people below by just clicking on the ‘Add another person’ button.";
        stepImg = userImg;
    }
    if (props.number === 3) {
        title = "Details about your visit to Russia";
        text = "<b>Time to tell us about your visit - </b><br/>\
As well as the dates you’re arriving and departing, list all the cities and hotels you’re planning at staying at during your stay. You can add up to 10 separate locations below by just clicking on the ‘Add another location’ button.";
        stepImg = locationImg;
    }
    if (props.number === 4) {
        title = "Payment";
        text = "<b>Make a secure online payment for your visa support documents.</b>";
        stepImg = paymentImg;
    }
    return (
        <div className="Step" hidden={props.hidden}>
            <h3 className="Step__title">{title}</h3>
            <div className="Step__description">
                <img className="mr-4" src={stepImg} alt="" />
                <div className="Step__text" dangerouslySetInnerHTML={{ __html: text }} />
            </div>
            {props.children}
        </div>
    );
};

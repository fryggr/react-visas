import React from 'react';
import './Step.css';

import portfolioImg from './img/portfolio.png';
import userImg from './img/user.png';
import locationImg from './img/location.png';
import paymentImg from './img/payment.png';

export const Step = props => {
    let title, text, stepImg;
    if (props.number === 1) {
        title = 'Service details';
        text =
            '<b>Let’s begin with the basics; </b><br/>\
Firstly, we need to find out a little about your upcoming trip.';
        stepImg = portfolioImg;
    }
    if (props.number === 2) {
        title = 'Personal details';
        text =
            '<b>Let us know a bit about yourself  </b><br/>\
To proceed with your application, we will need to collect some key details about you and your group. You can add up to 5 further people below simply by clicking on the "Add another person" button.';
        stepImg = userImg;
    }
    if (props.number === 3) {
        title = 'Details about your visit to Russia';
        text =
            "<b>Please tell us about your visit; </b><br/>\
In addition to the dates you're arriving and departing, please list all the cities and hotels where you plan to stay during your visit. You can add up to 10 separate locations below by clicking the 'Add another location' button.";
        stepImg = locationImg;
    }
    if (props.number === 4) {
        title = 'ORDER SUMMARY: YOUR VISA SUPPORT APPLICATION';
    }
    if (props.number === 5) {
        title = 'Payment';
        text =
            `<b>Make a secure online payment for your visa support documents.</b><br/>\
        We have sent an email to <b>${props.email}</b> with details of alternative payment methods should you prefer not to pay by credit/debit card.`;
        stepImg = paymentImg;
    }

    return (
        <div className="Step" hidden={props.hidden}>
            <h3 className="Step__title">{title}</h3>
            {typeof stepImg === 'undefined' && typeof text === 'undefined' ? (
                ''
            ) : (
                <div className="Step__description">
                    <img className="mr-4" src={stepImg} alt="" />
                    <div className="Step__text" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
            )}
            {props.children}
        </div>
    );
};

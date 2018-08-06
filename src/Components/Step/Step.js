import React from 'react';
import './Step.css';

import portfolioImg from './img/portfolio.png';

export const Step = (props) => {
    let title, text, stepImg;
    if (props.number === 1){
        title = 'Service details';
        text = '<b>Let’s start with the basics - </b><br/>
We need to find out first a little about your upcoming visit.';
        stepImg=portfolioImg;
    }
    return (
        <div className="Step" hidden={props.hidden}>
            <h3 className="Step__title">{title}</h3>
            <div className="Step__description">
                <img class="mr-4" src={stepImg} alt=""/>
                <div className="Step__text">{text}</div>
            </div>
            {props.children}
        </div>
    )
}

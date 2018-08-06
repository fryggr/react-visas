import React from 'react';
import './Button.css';

export const Button = (props) => {
    let className = typeof props.className !== "undefined" ? props.className : "";
    let type = typeof props.type !== "undefined" ? props.type : "button";
    return (
        <div className="Button-wrapper">
            <button type={props.type} className={"Button " + className} onClick={props.handleClick}>{props.label}</button>
            <div className="Button__text">{props.text}</div>
        </div>
    )
}

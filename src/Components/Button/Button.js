import React from 'react';
import './Button.css';

export const Button = (props) => {
    let className = typeof props.className !== "undefined" ? props.className : "";
    return (
        <button type={props.type} className={"Button " + className} onClick={props.handleClick}>{props.label}</button>
    )
}

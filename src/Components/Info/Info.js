import React from "react";
import "./Info.css";

export const Info = props => {
    let textCopy = props.text;
    //replace all props.replaceStr with data from props
    props.data.forEach((item, index) => {
        //search for props.replaceStr and replace with str from props.data
        textCopy = textCopy.replace(props.replaceStr, props.data[index])

    })
    return(
        <div className="Info" style={{display: 'block'}}>
            <div className="Info__title">{props.title}</div>
            <div className="Info__body">{textCopy}</div>
        </div>
    )
}

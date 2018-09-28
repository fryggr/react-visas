import React from "react";
import "./Info.css";

export const Info = props => {
    let textCopy = props.text;
    //replace all props.replaceStr with data from props
    if(props.data !== ''){
        props.data.forEach((item, index) => {
            let dataError = false;
            //search for props.replaceStr and replace with str from props.data
            if (props.data[index] !== 'Invalid Date')
                textCopy = textCopy.replace(props.replaceStr, props.data[index]);
            else {
                dataError = true;
            }

            if (dataError)
                textCopy = props.text;

        })
    }
    return(
        <div className="Info" style={{display: 'block'}}>
            <div className="Info__title">{props.title}</div>
            <div className="Info__body" dangerouslySetInnerHTML={{ __html: textCopy }}></div>
        </div>
    )
}

import  React from 'react';

import stickyError from './img/sticky-error.png';
import './Sticky.css';
export const Sticky = (props) => {
  if (props.type === 'errorSticky')
    return (
      <div className="Sticky" hidden={props.links.length === 0}>
        <img className="Sticky__error-img"src={stickyError}/>
        <div className="Sticky__error-content">
          <div className="Sticky__error-title">The following fields have problems</div>
          {props.links.map((link) => {
            return (
              <span className="sticky__error-item" onClick={() => {props.updateField('currentStep', link.step)}}>{link.text}</span>
            )
          })}
      </div>
    </div>
    )
}

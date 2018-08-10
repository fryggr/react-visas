import  React from 'react';
import { Button } from "../../Components/Button/Button";

import stickyError from './img/sticky-error.png';
import './Sticky.css';
export const Sticky = (props) => {
  if (props.type === 'errorSticky')
    return (
      <div className="Sticky Sticky_error" hidden={props.links.length === 0}>
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
    else if(props.type === 'priceSticky')
        return (
            <div className="Sticky Sticky_price" hidden={props.links.length === 0}>

                    <div class="Sticky__price-title">
                        Russian Tourist Visa Support Application
                    </div>
                    <div class="Sticky__price__total-result">
                        <div class="Sticky__price__total-label mr-2">Total price</div>
                        <div class="Sticky__price__total-sum">
                            <span class="Sticky__price-currency">{props.currency}</span>
                            <span class="Sticky__price-sum-value">{props.price}</span>
                        </div>
                    </div>
                    <div className="d-flex col-md-6 flex-column flex-md-row">
                        <Button
                            label="retrieve saved application"
                            className={
                                "mr-3 " + (
                                    props.currentStep !== 0
                                    ? "d-none"
                                    : "d-block")
                                }
                            text={
                                (
                                    props.currentStep !== 0
                                    ? ""
                                    : "CONTINUE a saved existing application")
                                }
                        />
                        <Button
                            label="save progress"
                            text="SAVE your current progress"
                        />
                    </div>

            </div>
        )
}

import React from 'react';
import './RadioGroup.css';
import { Hint } from './../Hint/Hint';
import newId from './../../utils/newid.js';

export class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.id = [];
        this.props.options.forEach((item, index) => {
            this.id.push(newId());
        });
    }

    render() {
        let className = typeof this.props.className !== 'undefined' ? this.props.className : '';
        return (
            <div
                onMouseOver={() => this.props.updateCurrentHint(this.props.fieldName)}
                onMouseOut={() => this.props.updateCurrentHint("")}
                className={'RadioGroup ' + className}>
                <div
                    className="RadioGroup__title"
                    dangerouslySetInnerHTML={{ __html: this.props.title }}
                />
                <div className="RadioGroup__wrapper justify-content-center justify-content-md-start">
                    {this.props.options.map((item, index) => {
                        return (
                            <div className="RadioGroup__item">
                                <input
                                    className="RadioGroup__item-field"
                                    type="radio"
                                    checked={this.props.value === item.value}
                                    name={this.props.name}
                                    value={item.value}
                                    id={this.id[index]}
                                    onChange={e => {
                                        this.props.updateField(
                                            this.props.fieldName + '.value',
                                            e.target.value
                                        );
                                    }}
                                />
                                <label className="RadioGroup__item-label" htmlFor={this.id[index]}>
                                    {item.text}
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div className="RadioGroup__error">
                    {this.props.visited ? this.props.error : ''}
                </div>
                {this.props.currentHint === this.props.fieldName ? <Hint /> : ''}
            </div>
        );
    }
}

{
    /*export const RadioGroup = props => {
  let className = typeof props.className !== "undefined" ? props.className : "";
  return (
    <div className={"RadioGroup " + className}>
      <div className="RadioGroup__title" dangerouslySetInnerHTML={{ __html: props.title }}></div>
      <div className="RadioGroup__wrapper">
        {props.options.map(item => {
          return (
            <div className="RadioGroup__item">
              <input
                className="RadioGroup__item-field"
                type="radio"
                name={props.name}
                value={item.value}
                id={generateIdForNewRadio()}
                onClick={(e) => props.updateField(props.fieldName + ".value",e.target.value)}
              />
              <label
                className="RadioGroup__item-label"
                htmlFor={"r" + radioElementsCount}
              >
                {item.text}
              </label>
            </div>
          );
        })}
      </div>
      <div className="RadioGroup__error">{props.error}</div>
    </div>
  );
};
*/
}

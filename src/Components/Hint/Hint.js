import React from "react";
import "./Hint.css";

import phoneReceiver from './img/phone-receiver.png';
import headset from './img/headset.png';
import support from './img/support.png';

export class Hint extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentTab: 1}

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(index){
        this.setState({currentTab: index})
    }
    render(){
        const {currentTab} = {...this.state};
        return (
            <div className="hint">
                <div className="hint__header">
                    <div data-head-tab="1" onClick={() => this.changeTab(1)}  className={"hint__tab " + (currentTab === 1 ? "hint__tab_active" : "")}>
                        <div className="hint__header-text">Assistance</div>
                        <div className="hint__header-icon">?</div>
                    </div>
                    <div data-head-tab="2"  onClick={() => this.changeTab(2)}   className={"hint__tab " + (currentTab === 2 ? "hint__tab_active" : "")}>
                        <div className="hint__header-text">Further Help</div>
                        <div className="hint__header-icon">
                            <img src={phoneReceiver} />
                        </div>
                    </div>
                </div>
                <div data-tab="1" style={{display: currentTab !== 1 ? "none" : "block" }} className="hint__body">
                    <div className="hint__body-text">
                        If you need further help, don’t hestitate to get in touch
                        now with any of the following options:
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={phoneReceiver} />
                        </div>
                        <div className="hint__action-text">
                            <a href="tel:+44(0)2071007370">+44 (0)207 100 7370</a>
                        </div>
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={headset} />
                        </div>
                        <div className="hint__action-text hint__action-text_black">
                            Click to Call
                        </div>
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={support} />
                        </div>
                        <div className="hint__action-text hint__action-text_grey">
                            Livechat: Online
                        </div>
                    </div>
                </div>
                <div data-tab="2" style={{display: currentTab !== 2 ? "none" : "block" }} className="hint__body">
                    <div className="hint__body-text">
                        If you have any questions about your visa support
                        application either before, during or after processing please
                        look at our frequently asked questions, or feel free to
                        contact us directly and we will be happy to help.
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={phoneReceiver} />
                        </div>
                        <div className="hint__action-text">
                            <a href="tel:+44(0)2071007370">+44 (0)207 100 7370</a>
                        </div>
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={headset} />
                        </div>
                        <div className="hint__action-text hint__action-text_black">
                            Click to Call
                        </div>
                    </div>
                    <div className="hint__action">
                        <div className="hint__action-icon">
                            <img src={support} />
                        </div>
                        <div className="hint__action-text hint__action-text_grey">
                            Livechat: Online
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

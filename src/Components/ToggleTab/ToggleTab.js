import React from "react";
import "./ToggleTab.js";
import "./ToggleTab.css";

function showOrHide(e) {
  /*get list of all computed styles of .ToggleTab__data*/
  let styles = window.getComputedStyle(e.target.parentNode.nextSibling, null);
  //toggle display-property
  e.target.parentNode.nextSibling.style.display =
    styles.display === "block" ? "none" : "block";

  //toggle class 'close' for icon
  e.target.classList.toggle("close");
}

export const ToggleTab = props => {
  let className = typeof props.className !== "undefined" ? props.className : "";
  let display =
    typeof props.open !== "undefined"
      ? props.open
        ? "block"
        : "none"
      : "block";

  let close =
    typeof props.open !== "undefined" ? (props.open ? "" : "close") : "";
  return (
    <div className={"ToggleTab " + className}>
      <div className="ToggleTab__title">
        <div className="ToggleTab__title-text">{props.label}</div>
        <div
          className={"ToggleTab__title-icon " + close}
          onClick={e => showOrHide(e)}
        />
      </div>
      <div className="ToggleTab__data" style={{ display: display }}>
        {props.children}
      </div>
    </div>
  );
};

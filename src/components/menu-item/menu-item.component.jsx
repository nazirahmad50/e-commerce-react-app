import React from "react";
import {withRouter} from "react-router-dom";

import "./menu-item.styles.scss";

// handles each of the home page categories
const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => (
  <div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="background-image"
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">Shop Now</span>
    </div>
  </div>
);

// HOC used to give the router props access to menu item
// so it passes props such as history, match and locaiton
export default withRouter(MenuItem);

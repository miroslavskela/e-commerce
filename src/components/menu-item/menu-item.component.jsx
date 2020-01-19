import React from "react";
import {withRouter} from 'react-router-dom';
import "./menu-item.styles.scss";
function MenyItem({ title, imageUrl, size, history, linkUrl, match }) {
    console.log(history)
    console.log(match)
  return (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="background-image"
      ></div>
      <div className="content">
        <div className="title">{title.toUpperCase()}</div>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(MenyItem)
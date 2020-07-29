import React from "react";

function Card(props) {
  return (
    <div className="fruit-card" name={props.name} onClick={props.handleClick}>
      {props.cardOpen ? (
        <img className="card-front" src={props.src} alt={`${props.name}`}></img>
      ) : (
        <div className="card-back"></div>
      )}
    </div>
  );
}

export default Card;

import React from "react";

function Card(props) {
  return (
    <div className="fruit-card" name={props.name} onClick={props.handleClick}>
      {props.cardOpen === "faceDown" ? (
        <div className="card-back"></div>
      ) : (
        <img className="card-front" src={props.src} alt={`${props.name}`}></img>
      )}
    </div>
  );
}

export default Card;

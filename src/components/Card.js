import React from "react";

function Card(props) {
  return (
    <div className="fruit-card" name={props.name}>
      {!props.cardOpen ? (
        <img className="card-front" src={props.src} alt={`${props.name}`}></img>
      ) : (
        <div className="card-back">1</div>
      )}
    </div>
  );
}

export default Card;

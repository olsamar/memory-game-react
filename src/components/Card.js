import React from "react";
import { CardState } from "./DisplayContainer";

function Card(props) {
  return (
    <div
      className="fruit-card"
      style={
        props.cardOpen === CardState.MATCHED
          ? {
              animation: "matchingCardsScaled 1s ease-in-out 0.5s",
              transition: "opacity 1.5s linear 0.5s",
              opacity: "0.7",
            }
          : {}
      }
      name={props.name}
      onClick={props.handleClick}>
      {props.cardOpen === CardState.FACE_DOWN ? (
        <div className="card-back">{props.name}</div>
      ) : (
        <img className="card-front" src={props.src} alt={`${props.name}`}></img>
      )}
    </div>
  );
}

export default Card;

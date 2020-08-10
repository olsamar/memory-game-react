import React from "react";
import { CardState } from "./../modules/CardStateModule";
import "./Card.css";

function Card(props) {
  return (
    <div
      className={
        props.cardOpen === CardState.FACE_UP ||
        props.cardOpen === CardState.MATCHED
          ? "fruit-card flip"
          : "fruit-card"
      }
      // style={
      //   props.cardOpen === CardState.MATCHED
      //     ? {
      //         animation: "matchingCardsScaled 1s ease-in-out 0.5s",
      //         transition: "opacity 1.5s linear 0.5s",
      //         opacity: "0.7",
      //       }
      //     : {}
      // }
      name={props.name}
      onClick={props.handleClick}>
      <img className="card-face-up" src={props.src} alt={`${props.name}`}></img>
      <div className="card-face-down"></div>
    </div>
  );
}

export default Card;

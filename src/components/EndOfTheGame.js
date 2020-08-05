import React from "react";
import "./EndOfTheGame.css";

export default function EndOfTheGame(props) {
  return (
    <React.Fragment>
      {props.gameEnd ? (
        <div className="end-of-game">
          <h1>YOU DID IT!</h1>
          <button className="play-again-btn" onClick={props.resetGame}>
            Play again
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

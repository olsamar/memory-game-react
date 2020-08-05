import React from "react";

export default function EndOfTheGame(props) {
  return (
    <React.Fragment>
      {props.gameScore === 6 ? (
        <div className="end-of-game">
          <button className="play-again-btn" onClick={props.resetGame}>
            Play again
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

import React from "react";
import "./EndOfTheGame.css";
import { GameStatus } from "./GameContainer";

export default function EndOfTheGame(props) {
  let gameEndMessage;
  let buttonMessage;

  if (props.gameStatus === GameStatus.GAME_WON) {
    gameEndMessage = "YOU DID IT!";
    buttonMessage = "Play again";
  } else if (props.gameStatus === GameStatus.GAME_LOST) {
    gameEndMessage = "YOUR TIME IS OVER";
    buttonMessage = "Try again";
  }

  return (
    <React.Fragment>
      {props.gameStatus === GameStatus.GAME_WON ||
      props.gameStatus === GameStatus.GAME_LOST ? (
        <div className="end-of-game">
          <h1>{gameEndMessage}</h1>
          <button className="play-again-btn" onClick={props.resetGame}>
            {buttonMessage}
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

import React from "react";
import { GameStatus } from "./../modules/GameStatusModule";
import { CardState } from "./../modules/CardStateModule";
import "./EndOfTheGame.css";

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

  const resetGame = () => {
    props.setGameField((prevState) => {
      prevState.forEach((cell) => (cell.cardState = CardState.FACE_DOWN));
      return [...prevState];
    });
    props.setGameScore(0);
    props.setProgressBarSeconds(props.defaultProgressBarSeconds);
    props.setGameStatus(GameStatus.NEW_GAME);
    setTimeout(() => {
      props.setGameField(props.gameFieldInitialState);
    }, 1000);
  };

  return (
    <React.Fragment>
      {props.gameStatus === GameStatus.GAME_WON ||
      props.gameStatus === GameStatus.GAME_LOST ? (
        <div className="end-of-game">
          <h1>{gameEndMessage}</h1>
          <button className="play-again-btn" onClick={resetGame}>
            {buttonMessage}
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

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
    props.setSecondsLeft(props.initialGameSeconds);
    props.setGameStatus(GameStatus.NEW_GAME);
    setTimeout(() => {
      props.setGameField(props.gameFieldInitialState);
    }, 600);
  };

  return (
    <React.Fragment>
      {props.gameStatus === GameStatus.GAME_WON ||
      props.gameStatus === GameStatus.GAME_LOST ? (
        <div className="game-end-backdrop">
          <div className="game-end-card">
            <h2>{gameEndMessage}</h2>
            <button className="play-again-btn" onClick={resetGame}>
              {buttonMessage}
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

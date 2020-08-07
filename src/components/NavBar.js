import React, { useEffect } from "react";
import { GameStatus } from "./../modules/GameStatusModule";
import "./NavBar.css";

export default function NavBar(props) {
  let progressBarWidth =
    (props.secondsLeft * props.initialProgressBarWidth) /
    props.initialGameSeconds;
  useEffect(() => {
    let interval;
    if (props.gameStatus === GameStatus.GAME_STARTED && props.gameScore !== 6) {
      interval = setInterval(() => {
        props.setSecondsLeft((prevSeconds) => {
          console.log(`useeffect ${props.secondsLeft}`, progressBarWidth);
          if (props.secondsLeft <= 0) {
            props.setGameStatus(GameStatus.GAME_LOST);
            return 0;
          } else {
            return Math.max(prevSeconds - 0.2, 0);
          }
        });
      }, 200);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props, progressBarWidth]);

  return (
    <section className="navigation-bar">
      <div className="progress-bar">
        <h5>TIME LEFT:</h5>
        <div className="progress-bar-container">
          <div
            className="progress-bar-filler"
            style={
              props.gameStatus === GameStatus.NEW_GAME
                ? { width: `${props.initialProgressBarWidth}%` }
                : { width: `${progressBarWidth}%` }
            }></div>
        </div>
      </div>
      <span className="game-score"></span>
      <h5>SCORE: {props.gameScore}</h5>
    </section>
  );
}

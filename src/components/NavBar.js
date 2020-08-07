import React, { useEffect } from "react";
import { GameStatus } from "./../modules/GameStatusModule";
import "./NavBar.css";

export default function NavBar(props) {
  useEffect(() => {
    let interval;
    if (props.gameStatus === GameStatus.GAME_STARTED) {
      interval = setInterval(() => {
        props.setProgressBarSeconds((prevSeconds) => {
          console.log(`useeffect ${props.progressBarSeconds}`);
          if (props.progressBarSeconds <= 0) {
            console.log("Try Again!");
            props.setGameStatus(GameStatus.GAME_LOST);
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props]);
  return (
    <section className="navigation-bar">
      <div className="progress-bar">
        <h5>TIME LEFT:</h5>
        <div className="progress-bar-container">
          <div
            className="progress-bar-filler"
            style={
              props.gameStatus === GameStatus.GAME_STARTED
                ? { animation: "progressBarAnimation 15s ease-in-out" }
                : {}
            }></div>
        </div>
      </div>
      <span className="game-score"></span>
      <h5>SCORE: {props.gameScore}</h5>
    </section>
  );
}

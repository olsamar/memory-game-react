import React from "react";
import "./NavBar.css";

export default function NavBar(props) {
  return (
    <section className="navigation-bar">
      <div className="progress-bar">
        <h5>TIME LEFT:</h5>
        <div className="progress-bar-container">
          <div
            className="progress-bar-filler"
            style={
              props.gameStart
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

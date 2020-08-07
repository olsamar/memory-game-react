import React, { useState, useEffect } from "react";
import Card from "./Card";
import EndOfTheGame from "./EndOfTheGame";
import NavBar from "./NavBar";
import { fruits } from "./../modules/FruitModule";
import { GameStatus } from "./../modules/GameStatusModule";
import { CardState } from "./../modules/CardStateModule";
import "./GameContainer.css";

function GameContainer() {
  const defaultProgressBarSeconds = 15;
  const gameFieldInitialState = fruits
    .concat(fruits)
    .sort(() => Math.random() - 0.5)
    .map((fruit) => ({ cardState: CardState.FACE_DOWN, card: fruit }));
  const [gameField, setGameField] = useState(gameFieldInitialState);
  const [gameScore, setGameScore] = useState(0);
  const [progressBarSeconds, setProgressBarSeconds] = useState(
    defaultProgressBarSeconds
  );
  const [gameStatus, setGameStatus] = useState(GameStatus.NEW_GAME);

  const handleClick = (index) => {
    // creating a new game deck so that React checks my array with cards
    const newGameField = [...gameField];
    flipTheCard(index, newGameField);
    setGameField(newGameField);
    setGameStatus(GameStatus.GAME_STARTED);
  };

  const flipTheCard = (index, newGameField) => {
    const cardClicked = newGameField[index];
    if (
      cardClicked.cardState === CardState.FACE_DOWN &&
      newGameField.reduce((amountFlipped, cell) => {
        return cell.cardState === CardState.FACE_UP
          ? amountFlipped + 1
          : amountFlipped;
      }, 0) === 0
    ) {
      cardClicked.cardState = CardState.FACE_UP;
    } else if (
      cardClicked.cardState === CardState.FACE_DOWN &&
      newGameField.reduce((amountFlipped, cell) => {
        return cell.cardState === CardState.FACE_UP
          ? amountFlipped + 1
          : amountFlipped;
      }, 0) === 1
    ) {
      const firstCardFlipped = newGameField.find(
        (card) => card.cardState === CardState.FACE_UP
      );
      cardClicked.cardState = CardState.FACE_UP;
      matchThePair(cardClicked, firstCardFlipped, index);
    } else {
      return;
    }
  };

  const matchThePair = (cardClicked, firstCardFlipped) => {
    if (cardClicked.card.name === firstCardFlipped.card.name) {
      cardClicked.cardState = CardState.MATCHED;
      firstCardFlipped.cardState = CardState.MATCHED;
      // setProgressBarSeconds((prevSeconds) => prevSeconds + 2);
      console.log(progressBarSeconds);

      setTimeout(() => {
        setGameScore((prevState) => prevState + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setGameField((prevState) => {
          prevState.forEach((cell) => {
            if (cell.cardState === CardState.FACE_UP) {
              cell.cardState = CardState.FACE_DOWN;
            }
          });
          return [...prevState];
        });
      }, 1000);
    }
  };

  useEffect(() => {
    let timeout;
    if (gameScore === 6) {
      timeout = setTimeout(() => {
        setGameStatus(GameStatus.GAME_WON);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameStatus, gameScore]);

  return (
    <React.Fragment>
      <NavBar
        gameScore={gameScore}
        progressBarSeconds={progressBarSeconds}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        setProgressBarSeconds={setProgressBarSeconds}
      />
      <section className="game-field-container">
        {gameField.map((cell, index) => (
          <Card
            key={index}
            name={cell.card.name.toLowerCase()}
            src={cell.card.source}
            handleClick={() => handleClick(index)}
            cardOpen={cell.cardState}
          />
        ))}
      </section>
      <EndOfTheGame
        gameStatus={gameStatus}
        setGameField={setGameField}
        setGameStatus={setGameStatus}
        setProgressBarSeconds={setProgressBarSeconds}
        defaultProgressBarSeconds={defaultProgressBarSeconds}
        setGameScore={setGameScore}></EndOfTheGame>
    </React.Fragment>
  );
}

export default GameContainer;

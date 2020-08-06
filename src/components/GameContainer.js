import React, { useState, useEffect } from "react";
import Card from "./Card";
import Apple from "./../assets/images/Apple.png";
import Banana from "./../assets/images/Banana.png";
import Blueberries from "./../assets/images/Blueberries.png";
import Grapes from "./../assets/images/Grape.png";
import Pear from "./../assets/images/Pear.png";
import Strawberries from "./../assets/images/Strawberrie.png";
import EndOfTheGame from "./EndOfTheGame";
import NavBar from "./NavBar";
import "./GameContainer.css";

const fruits = [
  { name: "Apple", source: Apple },
  { name: "Banana", source: Banana },
  { name: "Blueberries", source: Blueberries },
  { name: "Grapes", source: Grapes },
  { name: "Pear", source: Pear },
  { name: "Strawberries", source: Strawberries },
];

export const CardState = {
  FACE_DOWN: 0,
  FACE_UP: 1,
  MATCHED: 2,
};

function GameContainer() {
  const defaultProgressBarSeconds = 15;
  const gameFieldInitialState = fruits
    .concat(fruits)
    .sort(() => Math.random() - 0.5)
    .map((fruit) => ({ cardState: CardState.FACE_DOWN, card: fruit }));
  const [gameField, setGameField] = useState(gameFieldInitialState);
  const [gameScore, setGameScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [progressBarSeconds, setProgressBarSeconds] = useState(
    defaultProgressBarSeconds
  );

  const handleClick = (index) => {
    // creating a new game deck so that React checks my array with cards
    const newGameField = [...gameField];
    flipTheCard(index, newGameField);
    setGameField(newGameField);
    setGameStart(true);
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
      setProgressBarSeconds((prevSeconds) => prevSeconds + 2);
      // console.log(progressBarSeconds);

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
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameField((prevState) => {
      prevState.forEach((cell) => (cell.cardState = CardState.FACE_DOWN));
      return [...prevState];
    });
    setGameScore(0);
    setGameEnd(false);
    setTimeout(() => {
      setGameField(gameFieldInitialState);
    }, 1000);
  };

  useEffect(() => {
    let timeout;
    if (gameScore === 6) {
      timeout = setTimeout(() => {
        setGameEnd(true);
        setGameStart(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameEnd, gameScore]);

  useEffect(() => {
    let interval;
    if (gameStart) {
      interval = setInterval(() => {
        setProgressBarSeconds((prevSeconds) => {
          // console.log(`useeffect ${progressBarSeconds}`);
          if (progressBarSeconds <= 0 && !gameEnd) {
            console.log("Try Again!");
            setGameStart(false);
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
  }, [gameStart, gameEnd, progressBarSeconds]);

  return (
    <React.Fragment>
      <NavBar
        gameScore={gameScore}
        progressBarSeconds={progressBarSeconds}
        gameStart={gameStart}
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
      <EndOfTheGame gameEnd={gameEnd} resetGame={resetGame} />
    </React.Fragment>
  );
}

export default GameContainer;

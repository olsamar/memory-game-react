import React, { useState } from "react";
import Card from "./Card";
import Apple from "./../assets/images/Apple.png";
import Banana from "./../assets/images/Banana.png";
import Blueberries from "./../assets/images/Blueberries.png";
import Grapes from "./../assets/images/Grape.png";
import Pear from "./../assets/images/Pear.png";
import Strawberries from "./../assets/images/Strawberrie.png";
import "./DisplayContainer.css";

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

function DisplayContainer() {
  const gameFieldInitialState = fruits
    .concat(fruits)
    .sort(() => Math.random() - 0.5)
    .map((fruit) => ({ cardState: CardState.FACE_DOWN, card: fruit }));
  const [gameField, setGameField] = useState(gameFieldInitialState);

  const handleClick = (index) => {
    // creating a new game deck so that React checks my array with cards
    const newGameField = [...gameField];
    flipTheCard(index, newGameField);
    setGameField(newGameField);
  };

  const flipTheCard = (index, newGameField) => {
    const cardClicked = newGameField[index];
    if (
      newGameField.reduce((amountFlipped, cell) => {
        return cell.cardState === CardState.FACE_UP
          ? amountFlipped + 1
          : amountFlipped;
      }, 0) === 0
    ) {
      cardClicked.cardState = CardState.FACE_UP;
    } else if (
      cardClicked.cardState !== CardState.FACE_UP &&
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

  return (
    <div className="container">
      {gameField.map((cell, index) => (
        <Card
          className="fruit-card"
          key={index}
          name={cell.card.name.toLowerCase()}
          src={cell.card.source}
          handleClick={() => handleClick(index)}
          cardOpen={cell.cardState}
        />
      ))}
    </div>
  );
}

export default DisplayContainer;

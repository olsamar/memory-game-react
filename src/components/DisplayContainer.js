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

function DisplayContainer() {
  const gameFieldInitialState = fruits
    .concat(fruits)
    .sort(() => Math.random() - 0.5)
    .map((fruit) => ({ cardState: "faceDown", card: fruit }));
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
        return cell.cardState === "faceUp" ? amountFlipped + 1 : amountFlipped;
      }, 0) === 0
    ) {
      cardClicked.cardState = "faceUp";
    } else if (
      cardClicked.cardState !== "faceUp" &&
      newGameField.reduce((amountFlipped, cell) => {
        return cell.cardState === "faceUp" ? amountFlipped + 1 : amountFlipped;
      }, 0) === 1
    ) {
      const firstCardFlipped = newGameField.find(
        (card) => card.cardState === "faceUp"
      );
      cardClicked.cardState = "faceUp";
      matchThePair(cardClicked, firstCardFlipped, index);
    } else {
      return;
    }
  };

  const matchThePair = (cardClicked, firstCardFlipped, index) => {
    if (cardClicked.card.name === firstCardFlipped.card.name) {
      cardClicked.cardState = "matched";
      firstCardFlipped.cardState = "matched";
    } else {
      setTimeout(() => {
        setGameField((prevState) => {
          prevState.forEach((card) => {
            if (card.cardState === "faceUp") {
              card.cardState = "faceDown";
            }
          });
          return [...prevState];
        });
      }, 2000);
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

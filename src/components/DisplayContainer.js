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
    .map((fruit) => ({ open: false, card: fruit, matched: false }));
  const [gameField, setGameField] = useState(gameFieldInitialState);

  const handleClick = (index) => {
    const newGameField = [...gameField];
    setGameField(newGameField);
    flipTheCard(index, newGameField);
  };

  const flipTheCard = (index, newGameField) => {
    const cardClicked = newGameField[index];
    if (
      !cardClicked.matched &&
      newGameField.reduce((amountFlipped, cell) => {
        return cell.open === true ? amountFlipped + 1 : amountFlipped;
      }, 0) === 0
    ) {
      cardClicked.open = true;
    } else if (
      !cardClicked.matched &&
      newGameField.reduce((amountFlipped, cell) => {
        return cell.open === true ? amountFlipped + 1 : amountFlipped;
      }, 0) === 1
    ) {
      const firstCardFlipped = newGameField.find((card) => card.open === true);
      cardClicked.open = true;
      matchThePair(cardClicked, firstCardFlipped);
      // console.log(firstCardFlipped);
    } else {
      return;
    }
  };

  const matchThePair = (cardClicked, firstCardFlipped) => {
    if ((cardClicked.card.name = firstCardFlipped.card.name)) {
      cardClicked.matched = true;
      firstCardFlipped.matched = true;
    }
    console.log(cardClicked, firstCardFlipped);
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
          cardOpen={cell.open}
        />
      ))}
    </div>
  );
}

export default DisplayContainer;

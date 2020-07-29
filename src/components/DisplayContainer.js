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
  const initialState = fruits
    .concat(fruits)
    .sort(() => Math.random() - 0.5)
    .map((fruit) => ({ open: false, card: fruit }));
  const [gameField, setGameField] = useState(initialState);
  console.log(gameField);

  const handleClick = (index) => {
    const newGameField = [...gameField];
    newGameField[index].open = !newGameField[index].open;
    setGameField(newGameField);
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

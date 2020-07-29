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
  const [cardOpen, setCardOpen] = useState(false);
  const handleClick = (event) => {
    setCardOpen(!cardOpen);
  };
  return (
    <div className="container">
      {fruits
        .concat(fruits)
        .sort(() => Math.random() - 0.3)
        .map((fruit, index) => (
          <Card
            key={index}
            name={fruit.name.toLowerCase()}
            src={fruit.source}
            onClick={handleClick}
            cardOpen={cardOpen}
          />
        ))}
    </div>
  );
}

export default DisplayContainer;

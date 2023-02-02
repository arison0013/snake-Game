import React, { useState, useEffect } from 'react'
import Food from './Food/Food';
import "./Snake.css"
import Snake from './Snake/Snake'



function SnakeGame() {
  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };
  const [food, setFood] = useState(getRandomCoordinates);
  const [speed, setSpeed] = useState(300);
  const [direction, setDirection] = useState("Right");
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);


  useEffect(() => {
    document.addEventListener("keydown", onKeyDown); // for geeting the key while up down left rigth provide us all keyboard events
    setTimeout(() => moveSnake(snakeDots), speed)
    bodyCrash();
    isBorderCrash();
    checkIfEat();
  }, [snakeDots]);

  const onKeyDown = (e) => {
    console.log("object")
    // console.log(e)
    if (e.keyCode === 38) {
      setDirection("Up")
    }
    if (e.keyCode === 39) {
      setDirection("Right")
    }
    if (e.keyCode === 40) {
      setDirection("Down")
    }
    if (e.keyCode === 37) {
      setDirection("left")
    }
  }


  const moveSnake = (snakeDots) => {

    let dots = [...snakeDots]
    let head = dots[dots.length - 1]
    if (direction === "Up") {
      head = [head[0], head[1] - 2];
    }
    if (direction === "Down") {
      head = [head[0], head[1] + 2];
    }
    if (direction === "Right") {
      head = [head[0] + 2, head[1]];
    }
    if (direction === "left") {
      head = [head[0] - 2, head[1]];
    }
    if (direction) {
      dots.push(head); // push the latest element at the end
      dots.shift();
      setSnakeDots([...dots]);
    }
  }

  const isBorderCrash = () => {
    let head = snakeDots[snakeDots.length - 1]
    if (head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0) {
      onGameOver();
    }
  }

  const bodyCrash = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];

  };

  const checkIfEat = async () => {
    let head = snakeDots[snakeDots.length - 1];
    let myfood = food;
    console.log('myfood', myfood, 'head', head, 'snakeDots', snakeDots)
    if (head[0] === myfood[0] && head[1] === myfood[1]) {
      setFood(getRandomCoordinates());
    }
  };

  const onGameOver = () => {
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection(null);
    setFood(getRandomCoordinates());
  };
  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
};


export default SnakeGame

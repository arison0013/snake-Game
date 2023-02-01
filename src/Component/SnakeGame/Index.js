import React, { useState, useEffect, useCallback } from 'react'
import Food from './Food/Food';
import "./Snake.css"
import Snake from './Snake/Snake'



function SnakeGame() {
  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) ) ;
    let y = Math.floor((Math.random() * (max - min + 1) + min) ) ;
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
  }, [snakeDots]);

  const onKeyDown = (e) => {
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
      // dots.shift(); // remove previous element from index One because otherwise it added into the that division
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
    snake.pop()
    snake.map((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
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

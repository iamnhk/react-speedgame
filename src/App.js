import React, { Component } from "react";
import Circle from "./Circle";
import GameOver from "./GameOver";

import click from "./assets/sounds/caught.mp3";
import startSound from "./assets/sounds/start.mp3";

let clickSound = new Audio(click);
let gameStartSound = new Audio(startSound);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    circles: [1, 2, 3],
    score: 0,
    current: undefined,
    pace: 1000,
    gameOver: false,
    gameOn: false,
    rounds: 0,
  };

  timer;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  clickHandler = (i) => {
    if (this.state.current !== i) {
      console.log("You clicked the wrong circle!" + i);
      return this.stopHandler();
    }
    this.clickPlay();

    this.setState({
      score: this.state.score + 1,
      rounds: 0,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 10) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInteger(0, this.state.circles.length - 1);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    console.log(this.state.current);
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    gameStartSound.play();
    this.nextCircle();
    this.setState({
      gameOn: !this.state.gameOn,
    });
  };

  stopHandler = () => {
    gameStartSound.pause();
    clearTimeout(this.timer);
    this.setState({
      gameOver: !this.state.gameOver,
    });
  };

  closeHandler = () => {
    window.location.reload();
  };

  hideStopButton = () => {};

  render() {
    return (
      <div className="cover">
        <div className="container">
          <h1>Catch the thief!</h1>
          {!this.state.gameOver && (
            <div className="header">
              <div id="caught">
                Your Points: <span id="score">{this.state.score}</span>
              </div>
            </div>
          )}
          <div className="circles">
            {this.state.circles.map((circle, i) => (
              <Circle
                key={i}
                id={i + 1}
                gameStatus={this.state.gameOn}
                click={() => this.clickHandler(i)}
                active={this.state.current === i}
              />
            ))}
          </div>
          {this.state.gameOver && (
            <GameOver close={this.closeHandler} score={this.state.score} />
          )}

          {this.state.gameOn ? (
            <button
              className={`stopBtn ${this.state.gameOver ? "hide" : ""}`}
              onClick={this.stopHandler}
            >
              Stop
            </button>
          ) : (
            <button className="startBtn" onClick={this.startHandler}>
              Start
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;

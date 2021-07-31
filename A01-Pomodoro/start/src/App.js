import React, { useState, useRef } from "react";
import "./App.css";

function padStart(number) {
  return number.toString().padStart(2, "0");
}

export default function App() {
  // RENDER STATE
  const [title, setTitle] = useState("Let the countdown begin!!!");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // INTERNAL STATE
  const intervalRef = useRef(null); // keep data between renders

  // FUNCTIONS
  function startTimer() {
    if (!isRunning) {
      setTitle("You're doing great!");
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        // this does not work because timeLeft gets stuck at previous value
        //      setTimeLeft(timeLeft - 1);
        setTimeLeft((previousValue) => {
          if (previousValue > 0) {
            return previousValue - 1;
          } else {
            resetTimer();
            return 0;
          }
        });
      }, 1000);
    }
  }

  function stopTimer() {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setTitle("Keep it up!");
      setIsRunning(false);
    }
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTitle("Ready to go another round?");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  // COMPUTED FOR RENDER
  const minutes = padStart(Math.floor(timeLeft / 60));
  const seconds = padStart(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

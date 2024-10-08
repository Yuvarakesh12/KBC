import React, { useEffect, useState } from "react";
import './Timer.css'; 

const Timer = ({ setTimeOut, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(15);
  }, [questionNumber]);

  return (
    <div className="timer">
      {timer}
    </div>
  );
};

export default Timer;

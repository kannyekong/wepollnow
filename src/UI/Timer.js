import React from "react";
import { useState, useEffect, useRef } from "react";

const Timer = (props) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [due, setIsDue] = useState(false);

  // Would be gotten from DB

  //
  let interval = useRef();

  function startTimer() {
    const countdownDate = new Date(props.date).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        // Stop timer
        clearInterval(interval.current);
        setIsDue(true);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  }

  // Component mounted
  useEffect(() => {
    const clean = interval.current;
    startTimer();
    return () => {
      clearInterval(clean);
    };
  });

  return (
    <>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="flex flex-col items-center p-2 md:p-4 space-y-2 border-r border-gray-300 w-full">
          <h1
            className={`text-${props.size}  font-extrabold md:text-${props.sizeMD} text-${props.color}`}
          >
            {timerDays}
          </h1>
          <p className={`text-${props.pcolor}`}>Days</p>
        </div>
        <div className="flex flex-col items-center p-2 md:p-4 space-y-2 border-r border-gray-300">
          <h1
            className={`text-${props.size} font-extrabold md:text-${props.sizeMD} text-${props.color}`}
          >
            {timerHours}
          </h1>
          <p className={`text-${props.pcolor}`}>Hours</p>
        </div>
        <div className="flex flex-col items-center p-2 md:p-4 space-y-2 border-r border-gray-300">
          <h1
            className={`text-${props.size} font-extrabold md:text-${props.sizeMD} text-${props.color}`}
          >
            {timerMinutes}
          </h1>
          <p className={`text-${props.pcolor}`}>Minutes</p>
        </div>
        <div className="flex flex-col items-center p-2 md:p-4 space-y-2 mx-auto">
          <h1
            className={`text-${props.size} font-extrabold md:text-${props.sizeMD} text-${props.color}`}
          >
            {timerSeconds}
          </h1>
          <p className={`text-${props.pcolor}`}>Seconds</p>
        </div>
      </div>
    </>
  );
};

export default Timer;

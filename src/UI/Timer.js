import React from "react";
import { useState, useEffect, useRef } from "react";

const Test = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [due, setIsDue] = useState(false);

  // Would be gotten from DB
  const date = "September 22, 2022 00:00:00";

  //
  let interval = useRef();

  function startTimer() {
    const countdownDate = new Date(date).getTime();
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
      {!due ? (
        <div className="flex flex-row items-center justify-center space-x-4">
          <div className="flex flex-col items-center p-4 space-y-2 border-r border-gray-300">
            <h1 className="font-bold text-3xl md:text-7xl">{timerDays}</h1>
            <p>days</p>
          </div>
          <div className="flex flex-col items-center p-4 space-y-2 border-r border-gray-300">
            <h1 className="font-bold text-3xl md:text-7xl">{timerHours}</h1>
            <p>Hours</p>
          </div>
          <div className="flex flex-col items-center p-4 space-y-2 border-r border-gray-300">
            <h1 className="font-bold text-3xl md:text-7xl">{timerMinutes}</h1>
            <p>minutes</p>
          </div>
          <div className="flex flex-col items-center p-4 space-y-2">
            <h1 className="font-bold text-3xl md:text-7xl">{timerSeconds}</h1>
            <p>seconds</p>
          </div>
        </div>
      ) : (
        <p className="font-bold text-6xl border-4 border-blue-200 p-6 rounded-lg">
          Election is today
        </p>
      )}
    </>
  );
};

export default Test;

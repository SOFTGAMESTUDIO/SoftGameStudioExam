import React, { useState, useEffect } from 'react';

const Time = ({ targetTime, onTimeEnd, children }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(targetTime) - now;

    if (difference <= 0) {
      onTimeEnd(); // Notify parent that time is up
      return {};
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isTimeUp, setIsTimeUp] = useState(Object.keys(timeLeft).length === 0);

  useEffect(() => {
    if (isTimeUp) return; // Stop updating if time is up

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (Object.keys(newTimeLeft).length === 0) {
        setIsTimeUp(true);
        onTimeEnd(); // Notify parent
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp]);

  return (
    <div className="text-center text-white">
      {!isTimeUp ? (
        <div className="text-lg font-semibold">
          {Object.entries(timeLeft).map(([key, value]) => (
            <span key={key} className="mx-1">{value} {key}</span>
          ))}
        </div>
      ) : (
        children // Render alternate content when time is up
      )}
    </div>
  );
};

export default Time;

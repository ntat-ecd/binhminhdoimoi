
import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp, isActive }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: any;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      onTimeUp();
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-6 right-6 bg-black/60 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-full z-[100] shadow-xl">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${seconds < 30 ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
        <span className="font-mono text-xl font-bold text-amber-500 tracking-wider">
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
};

export default Timer;

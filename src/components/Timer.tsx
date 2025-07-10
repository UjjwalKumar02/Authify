"use client";
import { useEffect, useState } from "react";



interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

export default function Timer({ 
  initialMinutes = 10, 
  initialSeconds = 0
}: TimerProps) {

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const countdown = setInterval(() => {
      if(seconds > 0) {
        setSeconds((prev) => prev-1);
      }
      if(seconds === 0) {
        if(minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes((prev) => prev-1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);

  }, [minutes, seconds]);

  return(
    <span className="text-orange-600 font-semibold">
      {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
    </span>
  )
}
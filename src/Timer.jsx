import React, { useEffect, useState,useRef } from "react";
import Done from './Done'

const Timer = ({ startedDate,product }) => {
  const [currentDate, setCurrentDate] = useState(new Date().getTime())
   const inter = useRef(null)

  const tick = () => setCurrentDate(new Date().getTime());
  
  useEffect(() => {
    inter.current = setInterval(() => {
      tick()
    }, 1000)
    return () => clearInterval(inter.current)
  }, [currentDate])

  const difference = startedDate.getTime() - currentDate
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / 1000 / 60) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return <>
    {
      difference <0 ? (
          <Done product={product} />
        ):
        (
          <>
            <span>{hours < 10 ? `0${hours}` : hours}:</span>
            <span>{minutes < 10 ? `0${minutes}` : minutes}:</span>
            <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
          </>
        )
    }
    
  </>;
};

export default Timer;
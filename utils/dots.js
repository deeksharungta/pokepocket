"use-client";

import { useEffect, useState } from "react";

const Dots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (dots.length < 3) {
        setDots(dots + ".");
      } else {
        setDots("");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [dots]);
  return <span>{dots}</span>;
};

export default Dots;

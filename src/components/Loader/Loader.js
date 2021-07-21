import React, { useState, useEffect } from "react";
import { getRandomInt } from "../../utils/getRandomInt";

import Cell from "../Cell";
import { useSelector } from "react-redux";
const Loader = () => {
  const theme = useSelector((state) => state.theme);
  const [randomColor, setRandomColor] = useState(getRandomInt(10, 1));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomColor(getRandomInt(10, 1));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div
      className={`container PlayGround-container loading`}
      style={{ filter: theme }}
    >
      <div className="PlayGround-row">
        <Cell none />
        <Cell none />
        <Cell none />
      </div>{" "}
      <div className="PlayGround-row">
        <Cell none />
        <Cell none />
        <Cell color={randomColor} />
      </div>{" "}
      <div className="PlayGround-row">
        <Cell color={randomColor} />
        <Cell color={randomColor} />
        <Cell color={randomColor} />
      </div>{" "}
    </div>
  );
};

export default Loader;

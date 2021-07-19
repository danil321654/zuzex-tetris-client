import React from "react";
import { getRandomInt } from "../../utils/getRandomInt";

import Cell from "../Cell";
import { useSelector } from "react-redux";
const Loader = () => {
  const theme = useSelector((state) => state.theme);
  const randomColor = getRandomInt(10, 1);
  return (
    <div className={`container PlayGround-container loading ${theme}`}>
      <div className="PlayGround-row">
        <Cell none />
        <Cell none />
        <Cell none />
      </div>{" "}
      <div className="PlayGround-row">
        <Cell none />
        <Cell none />
        <Cell predicted color={randomColor} />
      </div>{" "}
      <div className="PlayGround-row">
        <Cell predicted color={randomColor} />
        <Cell predicted color={randomColor} />
        <Cell predicted color={randomColor} />
      </div>{" "}
    </div>
  );
};

export default Loader;

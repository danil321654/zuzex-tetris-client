import React from "react";
import { getRandomInt } from "../../utils/getRandomColor";

import Cell from "../Cell";
import { useSelector } from "react-redux";
const Loader = () => {
  // const loaderShape = getRandomShape(1);
  // const blocks = new Array(3).fill(new Array(3).fill(0));
  const theme = useSelector((state) => state.theme);
  const randomColor = getRandomInt(10, 1);
  return (
    <div className={`container PlayGround-container loading ${theme}`}>
      {/* {blocks.map((row, i) => (
        <div className="PlayGround-row">
          {row.map((dot, j) =>
            loaderShape.some((block) => block.i === i && block.j === j) ? (
              <Cell 
                predicted
                color={randomColor} />
            ) : (
              <Cell none />
            )
          )}
        </div>
      ))} */}
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

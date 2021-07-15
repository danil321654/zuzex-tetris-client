import React from "react";
// import { getRandomShape } from "../../utils/getRandomShape";

import Cell from "../Cell";

const Loader = () => {
  // const loaderShape = getRandomShape(1);
  // const blocks = new Array(3).fill(new Array(3).fill(0));
  return (
    <div className="container PlayGround-container loading">
      {/* {blocks.map((row, i) => (
        <div className="PlayGround-row">
          {row.map((dot, j) =>
            loaderShape.some((block) => block.i === i && block.j === j) ? (
              <Cell active />
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
        <Cell active />
      </div>{" "}
      <div className="PlayGround-row">
        <Cell active />
        <Cell active />
        <Cell active />
      </div>{" "}
    </div>
  );
};

export default Loader;

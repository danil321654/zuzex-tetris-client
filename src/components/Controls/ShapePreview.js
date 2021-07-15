import React from "react";
import { useSelector } from "react-redux";
// import { getRandomShape } from "../../utils/getRandomShape";

import Cell from "../Cell";

const ShapePreview = () => {
  const { nextShape, nextColor } = useSelector((state) => state);
  const blocks = new Array(2).fill(new Array(4).fill(0));
  return (
    <div className="PlayGround-container small">
      <span>next shape:</span>
      <div>
        {blocks.map((row, i) => (
          <div className="PlayGround-row">
            {row.map(
              (dot, j) =>
                nextShape.some((block) => block.i === i && block.j === j) && (
                  <Cell predicted color={nextColor} />
                )
            )}
          </div>
        ))}
      </div>
      {/* <div className="PlayGround-row">
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
      </div>{" "} */}
    </div>
  );
};

export default ShapePreview;

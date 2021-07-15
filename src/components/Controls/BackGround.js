import React from "react";
import { getRandomInt } from "../../utils/getRandomColor";
import Cell from "../Cell";

const Background = () => {
  const blocks = new Array(100).fill(new Array(100).fill(0));
  return (
    <div className="PlayGround-container Background">
      <div>
        {blocks.map((row, i) => (
          <div className="PlayGround-row">
            {row.map(() => (
              <Cell predicted color={getRandomInt(10, 1)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;

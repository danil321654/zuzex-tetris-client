import React from "react";
import { getRandomInt } from "../../utils/getRandomInt";
import cls from "classnames";
import Cell from "../Cell";
import { useSelector } from "react-redux";

const Background = () => {
  const theme = useSelector((state) => state.theme);
  const blocks = new Array(100).fill(new Array(100).fill(0));
  const backGroundClass = cls({
    "PlayGround-container Background": true,
    [`${theme}`]: true,
  });
  return (
    <div className={backGroundClass}>
      <div>
        {blocks.map((row, i) => (
          <div key={`$back${i}`} className="PlayGround-row">
            {row.map((_, j) => (
              <Cell
                key={`$back${i}${j}`}
                predicted
                color={getRandomInt(10, 1)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;

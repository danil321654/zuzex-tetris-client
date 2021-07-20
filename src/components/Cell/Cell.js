import React from "react";
import cls from "classnames";
import { colors } from "../../utils/colors";
const Cell = ({ none, color, playGroundWidth }) => {
  const size = playGroundWidth > 30 ? 900 / playGroundWidth : 25;
  const cellClass = cls({
    "PlayGround-cell": true,
    none,
  });
  return (
    <div
      className={cellClass}
      style={{ width: size, height: size, backgroundColor: colors[color - 1] }}
    />
  );
};

export default Cell;

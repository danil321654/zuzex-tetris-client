import React from "react";
import cls from "classnames";
import { colors } from "../../utils/colors";
/* waterfall causes performance issues*/
const Cell = ({
  value,
  // waterfall,
  // currentLeft,
  // currentRight,
  // currentTop,
  // currentBottom,
  predicted,
  none,
  color,
  moveShape,
  playGroundWidth,
}) => {
  const size = playGroundWidth > 30 ? 900 / playGroundWidth : 25;
  const cellClass = cls({
    "PlayGround-cell": true,
    // waterfall,
    // "current-left": currentLeft,
    // "current-right": currentRight,
    // "current-top": currentTop,
    // "current-bottom": currentBottom,
    active: value > 0 && value < 10,
    falling: value > 10 || predicted > 0,
    [`${colors[predicted ? color - 1 : value > 10 ? value - 11 : value - 1]}`]:
      (value > 0 && value < 10) || value > 10 || predicted,
    predicted,
    none,
  });
  return (
    <div
      className={cellClass}
      style={{ width: size, height: size }}
      onMouseEnter={moveShape}
    />
  );
};

export default Cell;

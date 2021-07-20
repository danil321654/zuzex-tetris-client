import React from "react";
import { useSelector } from "react-redux";
import cls from "classnames";
import { themes } from "../../utils/themes";
import Cell from "../Cell";

const ShapePreview = ({ text = "", ...eventListeners }) => {
  const { nextShape, nextColor, theme } = useSelector((state) => state);
  const isStick = nextShape.some((dot) => dot.j === 3);
  const blocks = new Array(isStick ? 1 : 2).fill(
    new Array(isStick ? 4 : 3).fill(0)
  );
  const previewClass = cls({
    "PlayGround-container": true,
    small: true,
    [`${text}`]: themes.includes(text),
    [`${theme}`]: !themes.includes(text),
  });
  return (
    <div className={previewClass} {...eventListeners}>
      <span>{text}</span>
      <div>
        {blocks.map((row, i) => (
          <div key={`$prev${i}`} className="PlayGround-row">
            {row.map((_, j) =>
              nextShape.some((block) => block.i === i && block.j === j) ? (
                <Cell key={`$prev${i}${j}`} predicted color={nextColor} />
              ) : (
                <Cell key={`$prev${i}${j}`} none />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapePreview;

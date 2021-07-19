import React from "react";
import { useSelector, useDispatch } from "react-redux";
import cls from "classnames";
import { themes } from "../../utils/themes";
import Cell from "../Cell";
import { changeTheme } from "../../reducers";

const ShapePreview = ({ text = "" }) => {
  const { nextShape, nextColor, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const blocks = new Array(2).fill(new Array(4).fill(0));
  const previewClass = cls({
    "PlayGround-container": true,
    small: true,
    [`${text}`]: themes.includes(text),
    [`${theme}`]: !themes.includes(text),
  });
  return (
    <div
      className={previewClass}
      onClick={() => themes.includes(text) && dispatch(changeTheme(text))}
    >
      <span>{text}</span>
      <div>
        {blocks.map((row, i) => (
          <div key={`$prev${i}`} className="PlayGround-row">
            {row.map((dot, j) =>
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

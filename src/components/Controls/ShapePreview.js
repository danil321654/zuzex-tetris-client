import React from "react";
import { useSelector, useDispatch } from "react-redux";
import cls from "classnames";
// import { getRandomShape } from "../../utils/getRandomShape";
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
            {row.map(
              (dot, j) =>
                nextShape.some((block) => block.i === i && block.j === j) && (
                  <Cell key={`$prev${i}${j}`} predicted color={nextColor} />
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

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cell from "../Cell";
import { moveShapeHorizontal } from "../../reducers";

const PlayGroundRow = ({ row, i }) => {
  const {
    playGround,
    currentShape,
    lose,
    predictedShape,
    color,
    mouseControlsEnabled,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const moveShapeWithMouse = (j) => {
    if (currentShape[0] && !lose && mouseControlsEnabled)
      for (let index = 0; index < Math.abs(-currentShape[0].j + j); index++) {
        dispatch(moveShapeHorizontal(-currentShape[0].j + j < 0 ? -1 : 1));
      }
  };

  return (
    <div className="PlayGround-row">
      {row.map((cell, j) => {
        const falling = currentShape.some((dot) => dot.i === i && j === dot.j);
        return (
          <Cell
            key={`${i}${j}`}
            value={cell}
            playGroundWidth={playGround[0].length}
            predicted={
              !falling &&
              predictedShape.some((dot) => dot.i === i && j === dot.j)
            }
            color={color}
            moveShape={() => moveShapeWithMouse(j)}

            // currentLeft={
            //   falling && !currentShape.some((dot) => dot.i === i && dot.j < j)
            // }
            // currentRight={
            //   falling && !currentShape.some((dot) => dot.i === i && dot.j > j)
            // }
            // currentTop={
            //   falling && !currentShape.some((dot) => dot.i < i && dot.j === j)
            // }
            // currentBottom={
            //   falling && !currentShape.some((dot) => dot.i > i && dot.j === j)
            // }
            // waterfall={
            //   predictedShape.some((dot) => dot.i > i && j === dot.j) &&
            //   currentShape.some((dot) => dot.i < i && j === dot.j)
            // }
          />
        );
      })}
    </div>
  );
};
export default PlayGroundRow;

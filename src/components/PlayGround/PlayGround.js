import React from "react";
import { useSelector } from "react-redux";
import cls from "classnames";
import Cell from "../Cell";
import "./PlayGround.scss";
import { moveShapeDown, moveShapeHorizontal } from "../../reducers";
import store from "../../store";
import { shapeRotate } from "../../reducers/index";
import "../../index.scss";
const PlayGround = () => {
  const {
    playGround,
    currentShape,
    users,
    lose,
    username,
    predictedShape,
    color,
  } = useSelector((state) => state);
  const playGroundClass = cls({
    "PlayGround-container": true,
    inactive: lose && username.length,
  });

  return (
    <div
      className={playGroundClass}
      onClick={(e) => !lose && store.dispatch(moveShapeDown())}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!lose) store.dispatch(shapeRotate(false));
      }}
    >
      <div className="PlayGround-users">
        {users.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>

      {playGround.map((row, i) => (
        <div key={`${i}`} className="PlayGround-row">
          {row.map((cell, j) => {
            const falling = currentShape.some(
              (dot) => dot.i === i && j === dot.j
            );
            return (
              <Cell
                currentLeft={
                  falling &&
                  !currentShape.some((dot) => dot.i === i && dot.j < j)
                }
                currentRight={
                  falling &&
                  !currentShape.some((dot) => dot.i === i && dot.j > j)
                }
                currentTop={
                  falling &&
                  !currentShape.some((dot) => dot.i < i && dot.j === j)
                }
                currentBottom={
                  falling &&
                  !currentShape.some((dot) => dot.i > i && dot.j === j)
                }
                key={`${i}${j}`}
                value={cell}
                playGroundWidth={playGround[0].length}
                // waterfall={
                //   predictedShape.some((dot) => dot.i > i && j === dot.j) &&
                //   currentShape.some((dot) => dot.i < i && j === dot.j)
                // }
                predicted={
                  !falling &&
                  predictedShape.some((dot) => dot.i === i && j === dot.j)
                }
                color={color}
                moveShape={() => {
                  if (currentShape[0] && !lose)
                    for (
                      let index = 0;
                      index < Math.abs(-currentShape[0].j + j);
                      index++
                    ) {
                      store.dispatch(
                        moveShapeHorizontal(-currentShape[0].j + j < 0 ? -1 : 1)
                      );
                    }
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PlayGround;

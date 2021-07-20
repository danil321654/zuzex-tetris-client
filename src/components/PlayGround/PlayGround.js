import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cls from "classnames";
import UsernamesRow from "./UsernamesRow";
import GameCanvas from "./GameCanvas";
import "./PlayGround.scss";
import { moveShapeDown, moveShapeHorizontal } from "../../reducers";
import { shapeRotate } from "../../reducers/index";
import "../../index.scss";
const PlayGround = () => {
  const { lose, username, theme, moveInterval } = useSelector((state) => state);

  const dispatch = useDispatch();

  const playGroundClass = cls({
    "PlayGround-container": true,
    inactive: lose && username.length,
    [`${theme}`]: true,
  });

  useEffect(() => {
    let lastTime = 0;
    const dispatchMove = (e) => {
      if (!lose && username.length > 0)
        switch (e.code) {
          case "KeyA":
            if (Date.now() - lastTime > moveInterval / 40) {
              dispatch(moveShapeHorizontal(-1));
              lastTime = Date.now();
            }
            break;
          case "KeyD":
            if (Date.now() - lastTime > moveInterval / 40) {
              dispatch(moveShapeHorizontal(1));
              lastTime = Date.now();
            }
            break;
          case "KeyQ":
            dispatch(shapeRotate(false));
            break;
          case "KeyE":
            dispatch(shapeRotate(true));
            break;
          case "KeyS":
            dispatch(moveShapeDown());
            break;

          default:
            break;
        }
    };
    const onKeyUp = (e) => {
      lastTime = 0;
    };
    document.addEventListener("keydown", dispatchMove);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", dispatchMove);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return (
    <div className={playGroundClass}>
      <UsernamesRow />
      <GameCanvas />
    </div>
  );
};

export default PlayGround;

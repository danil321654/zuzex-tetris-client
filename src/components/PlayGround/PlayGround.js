import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cls from "classnames";
import UsernamesRow from "./UsernamesRow";
import GameCanvas from "./GameCanvas";
import "./PlayGround.scss";
import { moveShape, moveShapeDown } from "../../reducers";
import "../../index.scss";
import { horizontalMoveActionPayload } from "../../utils/horizontalMoveHandle";
import { rotateActionPayload } from "../../utils/rotateHandle";
const PlayGround = () => {
  const { lose, username, theme } = useSelector((state) => state);

  const dispatch = useDispatch();

  const playGroundClass = cls({
    "PlayGround-container theme": true,
    inactive: lose && username.length,
  });

  useEffect(() => {
    const dispatchMove = (e) => {
      if (e.repeat) return;
      // if (!readyToMove) return;
      if (!lose && username.length > 0)
        switch (e.code) {
          case "KeyA":
            dispatch(moveShape(horizontalMoveActionPayload(-1)));
            break;
          case "KeyD":
            dispatch(moveShape(horizontalMoveActionPayload(1)));
            break;
          case "KeyQ":
            dispatch(moveShape(rotateActionPayload(false)));
            break;
          case "KeyE":
            dispatch(moveShape(rotateActionPayload(true)));
            break;
          case "KeyS":
            dispatch(moveShapeDown());
            break;

          default:
            break;
        }
    };
    // document.addEventListener("keydown", dispatchMove);
    document.addEventListener("keydown", dispatchMove);

    return () => {
      // document.removeEventListener("keydown", dispatchMove);
      document.removeEventListener("keydown", dispatchMove);
    };
  });

  return (
    <div
      className={playGroundClass}
      style={{ filter: theme, transition: "filter .5s" }}
    >
      <UsernamesRow />
      <GameCanvas />
    </div>
  );
};

export default PlayGround;

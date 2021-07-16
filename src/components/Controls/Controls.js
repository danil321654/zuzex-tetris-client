import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ShapePreview from "./ShapePreview";
import {
  authorize,
  requestNewGame,
  shapeRotate,
  moveShapeHorizontal,
  startWatching,
  moveShapeDown,
  toggleMouseControls,
} from "../../reducers/index";
import "./Controls.scss";
import "../../index.scss";
import { themes } from "../../utils/themes";
const Controls = ({
  username,
  lose,
  score,
  users,
  authorize,
  theme,
  requestNewGame,
  moveShapeHorizontal,
  shapeRotate,
  startWatching,
  moveShapeDown,
  mouseControlsEnabled,
  toggleMouseControls,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("Please type in your username");
  let lastCall = 0;
  const dispatchMove = (e) => {
    if (!lose && username.length > 0)
      switch (e.code) {
        case "KeyA":
          if (Date.now() - lastCall > 30) {
            moveShapeHorizontal(-1);
            lastCall = Date.now();
          }
          break;
        case "KeyD":
          if (Date.now() - lastCall > 30) {
            moveShapeHorizontal(1);
            lastCall = Date.now();
          }
          break;
        case "KeyQ":
          if (Date.now() - lastCall > 20) {
            shapeRotate(false);
            lastCall = Date.now();
          }
          break;
        case "KeyE":
          if (Date.now() - lastCall > 20) {
            shapeRotate(true);
            lastCall = Date.now();
          }
          break;
        case "KeyS":
          moveShapeDown();
          break;
        default:
          break;
      }
  };
  useEffect(() => {
    document.addEventListener("keydown", dispatchMove);
    return () => document.removeEventListener("keydown", dispatchMove);
  });

  return (
    <>
      {lose && username.length > 0 && (
        <div className="LoseContainer">
          <div className="Controls-lose-content">
            <div className={`Controls-lose ${theme}`}>
              lose
              <div>{`score: ${score}`}</div>
              <button
                className="Controls-button newGame"
                onClick={() => requestNewGame()}
              >
                {" "}
                reset
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="Controls-container">
        {!username.length ? (
          <div className={`Controls-item ${theme}`}>
            {error.length > 0 && <div>{error}</div>}
            <input
              value={name}
              onChange={(e) => setName(e.target.value.split(" ").join(""))}
            />
            <button
              className="Controls-button login"
              onClick={() => {
                if (name.length > 0) {
                  if (!users.includes(name)) {
                    authorize(name.split(" ").join(""));
                    setError("Please type in username");
                  } else setError("User already exists");
                } else setError("Name cannot be empty");
              }}
            >
              {" "}
              login
            </button>
          </div>
        ) : (
          <>
            <ShapePreview text={"next shape:"} />
            <button
              className={`Controls-button newGame ${theme}`}
              onClick={() => startWatching()}
            >
              {" "}
              watch
            </button>
            <div
              className={`d-flex flex-column align-items-center Controls-item ${theme}`}
            >
              <label for="mouse-control">
                mouse <br />
                control{" "}
              </label>
              <input
                type="checkbox"
                name="mouse-control"
                checked={mouseControlsEnabled}
                onChange={(e) => {
                  toggleMouseControls(!mouseControlsEnabled);
                }}
              />
            </div>
            {!lose && (
              <div
                className={`Controls-item ${theme}`}
              >{`score: ${score}`}</div>
            )}
            <div className="Controls-themeSelect">
              {themes
                .filter((_theme) => _theme !== theme)
                .slice(0, 3)
                .map((_theme) => (
                  <ShapePreview text={_theme} />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    lose: state.lose,
    username: state.username,
    loading: state.loading,
    users: state.users,
    score: state.score,
    mouseControlsEnabled: state.mouseControlsEnabled,
    theme: state.theme,
  };
};
const mapDispatchToProps = {
  authorize,
  requestNewGame,
  moveShapeHorizontal,
  shapeRotate,
  startWatching,
  moveShapeDown,
  toggleMouseControls,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

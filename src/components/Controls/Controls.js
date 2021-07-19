import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ShapePreview from "./ShapePreview";
import { themes } from "../../utils/themes";
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

  const handleLogin = () => {
    if (name.length > 0) {
      if (!users.includes(name)) {
        authorize(name.split(" ").join(""));
        setError("Please type in username");
      } else setError("User already exists");
    } else setError("Name cannot be empty");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    let lastTime = 0;
    const dispatchMove = (e) => {
      if (!lose && username.length > 0)
        switch (e.code) {
          case "KeyA":
            if (Date.now() - lastTime > 60) {
              moveShapeHorizontal(-1);
              lastTime = Date.now();
            }
            break;
          case "KeyD":
            if (Date.now() - lastTime > 60) {
              moveShapeHorizontal(1);
              lastTime = Date.now();
            }
            break;
          case "KeyQ":
            shapeRotate(false);
            break;
          case "KeyE":
            shapeRotate(true);
            break;
          case "KeyS":
            moveShapeDown();
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
          <form onSubmit={handleSubmit} className={`Controls-item ${theme}`}>
            {error.length > 0 && <div>{error}</div>}
            <input
              value={name}
              onChange={(e) => setName(e.target.value.split(" ").join(""))}
            />
            <button className="Controls-button login" onClick={handleLogin}>
              {" "}
              login
            </button>
          </form>
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
            {/* <div
              className={`d-flex flex-column align-items-center Controls-item ${theme}`}
            >
              <label htmlFor="mouse-control">
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
            </div> */}
            {!lose && (
              <div
                className={`Controls-item ${theme}`}
              >{`score: ${score}`}</div>
            )}
            <div className="Controls-themeSelect">
              {themes
                .filter((_theme) => _theme !== theme)
                .slice(0, 3)
                .map((_theme, ind) => (
                  <ShapePreview key={ind} text={_theme} />
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

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
} from "../../reducers/index";
import "./Controls.scss";
import "../../index.scss";
const Controls = ({
  username,
  lose,
  score,
  users,
  authorize,
  requestNewGame,
  moveShapeHorizontal,
  shapeRotate,
  startWatching,
  moveShapeDown,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("Please type in your username");
  let lastCall = 0;
  const dispatchMove = (e) => {
    if (!lose && username.length > 0)
      switch (e.code) {
        case "KeyA":
          if (Date.now() - lastCall > 50) {
            moveShapeHorizontal(-1);
            lastCall = Date.now();
          }
          break;
        case "KeyD":
          if (Date.now() - lastCall > 50) {
            moveShapeHorizontal(1);
            lastCall = Date.now();
          }
          break;
        case "KeyQ":
          if (Date.now() - lastCall > 100) {
            shapeRotate(false);
            lastCall = Date.now();
          }
          break;
        case "KeyE":
          if (Date.now() - lastCall > 100) {
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
    <div className="Controls-container">
      {lose && username.length > 0 && (
        <div className="Controls-lose-content">
          <div className="Controls-lose">
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
      )}
      {!username.length ? (
        <div>
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
          <ShapePreview />
          <button
            className="Controls-button newGame"
            onClick={() => startWatching()}
          >
            {" "}
            watch
          </button>
          {!lose && <div>{`score: ${score}`}</div>}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lose: state.lose,
    username: state.username,
    loading: state.loading,
    users: state.users,
    score: state.score,
  };
};
const mapDispatchToProps = {
  authorize,
  requestNewGame,
  moveShapeHorizontal,
  shapeRotate,
  startWatching,
  moveShapeDown,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

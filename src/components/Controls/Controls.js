import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ShapePreview from "./ShapePreview";
import LoginForm from "./LoginForm";
import ThemeSelect from "./ThemeSelect";
import {
  startWatching,
  // toggleMouseControls,
} from "../../reducers/index";
import "./Controls.scss";

const Controls = () => {
  const {
    username,
    score,
    theme,
    // mouseControlsEnabled,
    // toggleMouseControls,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <div className="Controls-container">
      {!username.length ? (
        <LoginForm />
      ) : (
        <>
          <ShapePreview text={"next shape:"} />
          <button
            className={`Controls-button newGame ${theme}`}
            onClick={() => dispatch(startWatching())}
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
          <div className={`Controls-item ${theme}`}>{`score: ${score}`}</div>
          <ThemeSelect />
        </>
      )}
    </div>
  );
};

export default Controls;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ShapePreview from "./ShapePreview";
import LoginForm from "./LoginForm";
// import ThemeSelect from "./ThemeSelect";
import { startWatching } from "../../reducers/index";
import "./Controls.scss";

const Controls = () => {
  const { username, score, theme } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <div
      className="Controls-container"
      style={{ filter: theme, transition: "filter .5s" }}
    >
      {!username.length ? (
        <LoginForm />
      ) : (
        <>
          <ShapePreview text={"next shape:"} />
          <button
            className={`Controls-button newGame`}
            onClick={() => dispatch(startWatching())}
          >
            watch
          </button>

          <div className={`Controls-item`}>score: {score}</div>
          {/* <ThemeSelect /> */}
        </>
      )}
    </div>
  );
};

export default Controls;

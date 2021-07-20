import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNewGame } from "../../reducers";
const LoseModal = () => {
  const { theme, score } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="LoseModal-container">
      <div className={`LoseModal-content ${theme}`}>
        lose
        <div>{`score: ${score}`}</div>
        <button
          className="Controls-button newGame"
          onClick={() => dispatch(requestNewGame())}
        >
          {" "}
          reset
        </button>
      </div>
    </div>
  );
};
export default LoseModal;

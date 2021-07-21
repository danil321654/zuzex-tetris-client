import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNewGame } from "../../reducers";
const LoseModal = () => {
  const { theme, score, users, username } = useSelector((state) => state);
  const dispatch = useDispatch();
  const winner = [...users].sort((a, b) => b.score - a.score)[0];
  return (
    <div className="LoseModal-container theme" style={{ filter: theme }}>
      <div className={`LoseModal-content`}>
        lose
        <div>{`Total score: ${score}`}</div>
        {winner.name !== username && (
          <div>{`Your score: ${
            users.filter(({ name }) => name === username)[0].score
          }`}</div>
        )}
        <div>{`${winner.name === username ? "You" : winner.name} won: ${
          winner.score
        }`}</div>
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

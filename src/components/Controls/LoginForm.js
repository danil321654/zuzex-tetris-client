import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { authorize } from "../../reducers";

const savedUsername = localStorage.getItem("username");

const LoginForm = () => {
  const { users, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState(savedUsername || "");
  const [error, setError] = useState("Please type in your username");

  const handleLogin = () => {
    if (name.length > 0) {
      if (!users.map((user) => user.name).includes(name)) {
        dispatch(authorize(name.split(" ").join("")));
        localStorage.setItem("username", name.split(" ").join(""));
        setError("Please type in username");
      } else setError("User already exists");
    } else setError("Name cannot be empty");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    setName(localStorage.getItem("username") || "");
  }, []);
  return (
    <form onSubmit={handleSubmit} className={`Controls-item ${theme}`}>
      {error.length > 0 && (
        <div>{users.length > 8 ? "Too many players" : error}</div>
      )}
      <input
        value={name}
        onChange={(e) => setName(e.target.value.split(" ").join(""))}
      />
      <button
        className="Controls-button login"
        onClick={handleLogin}
        disabled={users.length > 8}
      >
        {" "}
        login
      </button>
      {location.pathname !== "/rating" ? (
        <button
          className="Controls-button login"
          onClick={() => history.push("/rating")}
        >
          {" "}
          rating
        </button>
      ) : (
        <button
          className="Controls-button login"
          onClick={() => history.push("/")}
        >
          {" "}
          watch
        </button>
      )}
    </form>
  );
};
export default LoginForm;

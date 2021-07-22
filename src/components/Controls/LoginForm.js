import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authorize } from "../../reducers";

const LoginForm = () => {
  const { users, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("Please type in your username");

  const handleLogin = () => {
    if (name.length > 0) {
      if (!users.map((user) => user.name).includes(name)) {
        dispatch(authorize(name.split(" ").join("")));
        setError("Please type in username");
      } else setError("User already exists");
    } else setError("Name cannot be empty");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
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
  );
};
export default LoginForm;

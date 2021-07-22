import React from "react";

import { useSelector } from "react-redux";

const UsernamesRow = () => {
  const { users, username } = useSelector((state) => state);
  return (
    <div className="PlayGround-users">
      {users.map(({ name, score }) => (
        <span
          key={name}
          style={{ textDecoration: name === username ? "underline" : "none" }}
        >
          {name} ({score})
        </span>
      ))}
    </div>
  );
};
export default UsernamesRow;

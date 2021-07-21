import React from "react";

import { useSelector } from "react-redux";

const UsernamesRow = () => {
  const users = useSelector((state) => state.users);
  return (
    <div className="PlayGround-users">
      {users.map(({ name, score }) => (
        <span key={name}>
          {name} ({score})
        </span>
      ))}
    </div>
  );
};
export default UsernamesRow;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "../Loader";
import "./Rating.scss";
import { server_uri } from "../../config";
const Rating = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);
  const endRef = useRef(null);
  const getUsers = (limit, offset) => {
    axios.get(`${server_uri}users/${limit}/${offset}`).then((resp) => {
      if (resp.data.length < 3) setButtonActive(false);
      setUsers([...users, ...resp.data]);
      setLoading(false);
      scrollToBottom();
    });
  };
  useEffect(() => {
    setLoading(true);
    getUsers(3, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    getUsers(3, users.length);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="Rating-container">
      {!loading ? (
        <>
          <div className="Rating-row">
            <span> # </span> <span> Username </span> <span> Score </span>
          </div>
          {users.map(({ _id, username, score }, index) => (
            <div key={_id + username + score} className={"Rating-row"}>
              <span> {index + 1}</span>
              <span> {username}</span> <span>{score} </span>
            </div>
          ))}
          {buttonActive && <button onClick={handleClick}> Load more </button>}
          <div ref={endRef} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Rating;

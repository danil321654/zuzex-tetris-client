import React from "react";
import { useSelector } from "react-redux";
import PlayGround from "./components/PlayGround";
import LoseModal from "./components/Controls/LoseModal";
import Controls from "./components/Controls";
import Loader from "./components/Loader";
import Background from "./components/Background";
import "./index.scss";
function App() {
  const { loading, lose, username } = useSelector((state) => state);
  return (
    <>
      <Background />
      {username.length > 0 && lose && <LoseModal />}
      <Controls />
      {!loading ? <PlayGround /> : <Loader />}
    </>
  );
}

export default App;

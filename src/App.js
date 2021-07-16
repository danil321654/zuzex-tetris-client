import React from "react";
import { useSelector } from "react-redux";
import PlayGround from "./components/PlayGround";
import Controls from "./components/Controls";
import Loader from "./components/Loader";
import Background from "./components/Controls/BackGround";
import "./index.scss";
function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      <Controls />
      {!loading ? <PlayGround /> : <Loader />}
      <Background />
    </>
  );
}

export default App;

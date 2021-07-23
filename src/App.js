import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PlayGround from "./components/PlayGround";
import LoseModal from "./components/Controls/LoseModal";
import Controls from "./components/Controls";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Rating from "./components/Rating";
import "./index.scss";
function App() {
  const { loading, lose, username } = useSelector((state) => state);

  return (
    <BrowserRouter>
      <Background />
      {username.length > 0 && lose && <LoseModal />}
      <Controls />
      <Switch>
        {username.length === 0 && (
          <Route exact path="/rating">
            <Rating />
          </Route>
        )}

        {!loading ? (
          <Route path="/">
            <PlayGround />
          </Route>
        ) : (
          <Loader />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;

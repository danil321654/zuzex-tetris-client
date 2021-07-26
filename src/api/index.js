import store from "../store";

import {
  applyPlayGround,
  connectToGame,
  lose,
  newGame,
  applyShape,
  spawnShape,
} from "../reducers/index";
import { server_uri } from "../config";

const io = require("socket.io-client");
const socket = io(server_uri);
socket.on("you-connected", (payload) => {
  store.dispatch(connectToGame(payload));
});
socket.on("user-connected", (payload) => {
  store.dispatch(applyPlayGround(payload));
});
socket.on("disconnected", (payload) => {
  store.dispatch(applyPlayGround(payload));
  if (payload.isNewShapeRequired) store.dispatch(spawnShape());
});

socket.on("new-move", (payload) => {
  store.dispatch(applyPlayGround(payload));
});
socket.on("your-move", (payload) => {
  store.dispatch(applyShape(payload));
});

socket.on("new-game", (payload) => {
  store.dispatch(newGame(payload));
});
socket.on("game-lose", (payload) => {
  store.dispatch(lose(payload));
});

export default socket;

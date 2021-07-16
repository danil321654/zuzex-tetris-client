import store from "../store";
import {
  applyPlayGround,
  connectSocket,
  lose,
  newGame,
} from "../reducers/index";
const io = require("socket.io-client");

//const socket = io("https://zuzex-tetris-server.herokuapp.com/");
const socket = io("http://192.168.5.22:4002");
socket.on("you-connected", (payload) => {
  store.dispatch(connectSocket(payload));
});
socket.on("user-connected", (payload) => {
  store.dispatch(applyPlayGround(payload));
});
socket.on("disconnected", (payload) => {
  store.dispatch(applyPlayGround(payload));
});

socket.on("new-move", (payload) => {
  store.dispatch(applyPlayGround(payload));
});

socket.on("new-game", (payload) => {
  store.dispatch(newGame(payload));
});
socket.on("game-lose", (payload) => {
  store.dispatch(lose(payload));
});

export default socket;

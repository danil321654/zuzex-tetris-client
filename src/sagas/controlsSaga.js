import { put, select, takeLatest, all } from "redux-saga/effects";

import {
  connectToGame,
  spawnShape,
  lose,
  authorize,
  newGame,
  requestNewGame,
  startWatching,
} from "../reducers/index";
import socket from "../api";

export function* handleAuthorize() {
  try {
    const username = yield select((state) => state.username);
    yield socket.emit("authorize", username);
  } catch (error) {
    console.log(error);
  }
}
export function* handleNewGame() {
  try {
    const timer = yield select((state) => state.timer);
    const moveInterval = yield select((state) => state.moveInterval);
    yield timer.reset(moveInterval);
    yield timer.stop();
    yield put(spawnShape());
  } catch (error) {
    console.log(error);
  }
}
export function* handlePlayGroundLoad() {
  try {
    yield put(spawnShape());
  } catch (error) {
    console.log(error);
  }
}

export function* handleLose() {
  try {
    const timer = yield select((state) => state.timer);
    yield timer.stop();
  } catch (error) {
    console.log(error);
  }
}

export function* handleRequestNewGame() {
  try {
    const timer = yield select((state) => state.timer);
    yield timer.stop();
    yield socket.emit("reset");
  } catch (error) {
    console.log(error);
  }
}

export function* handleStartWatching() {
  try {
    const timer = yield select((state) => state.timer);
    timer.stop();
    yield socket.disconnect().connect();
  } catch (error) {
    console.log(error);
  }
}

export default function* watchControls() {
  yield all([
    takeLatest(authorize, handleAuthorize),
    takeLatest(connectToGame, handlePlayGroundLoad),
    takeLatest(lose, handleLose),
    takeLatest(requestNewGame, handleRequestNewGame),
    takeLatest(newGame, handleNewGame),
    takeLatest(startWatching, handleStartWatching),
  ]);
}

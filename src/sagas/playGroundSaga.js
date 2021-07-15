import { put, select, takeEvery, takeLatest } from "redux-saga/effects";

import {
  connectSocket,
  moveShapeHorizontal,
  spawnShape,
  moveShapeVertical,
  shapeLand,
  shapeRotate,
  lose,
  authorize,
  newGame,
  requestNewGame,
  startWatching,
  moveShapeDown,
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
export function* handleShapeAppear() {
  try {
    const shapeAppear = yield select((state) => state.currentShape);
    const color = yield select((state) => state.color);
    const timer = yield select((state) => state.timer);
    const moveInterval = yield select((state) => state.moveInterval);
    yield timer.reset(moveInterval);
    if (shapeAppear.length)
      yield socket.emit(
        "move",
        shapeAppear.map((move) => ({ ...move, color }))
      );
  } catch (error) {
    console.log(error);
  }
}

export function* handleShapeMove() {
  try {
    const newMove = yield select((state) => state.move);
    const color = yield select((state) => state.color);

    if (newMove.length) {
      yield socket.emit(
        "move",
        newMove.map((move) => ({ ...move, color }))
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleShapeDown() {
  try {
    const newMove = yield select((state) => state.move);
    const color = yield select((state) => state.color);

    if (newMove.length) {
      yield socket.emit(
        "move",
        newMove.map((move) => ({ ...move, color }))
      );
      yield socket.emit("land");
      yield put(spawnShape());
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleShapeRotate() {
  try {
    const newMove = yield select((state) => state.rotateMove);
    const color = yield select((state) => state.color);
    if (newMove.length)
      yield socket.emit(
        "move",
        newMove.map((move) => ({ ...move, color }))
      );
  } catch (error) {
    console.log(error);
  }
}
export function* handleShapeLand() {
  try {
    yield socket.emit("land");
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

export default function* watchPlayGround() {
  yield takeLatest(authorize, handleAuthorize);
  yield takeLatest(connectSocket, handlePlayGroundLoad);
  yield takeLatest(spawnShape, handleShapeAppear);
  yield takeEvery(shapeRotate, handleShapeRotate);
  yield takeEvery(moveShapeHorizontal, handleShapeMove);
  yield takeEvery(moveShapeVertical, handleShapeMove);
  yield takeEvery(moveShapeDown, handleShapeDown);
  yield takeEvery(shapeLand, handleShapeLand);
  yield takeLatest(lose, handleLose);
  yield takeLatest(requestNewGame, handleRequestNewGame);
  yield takeLatest(newGame, handleNewGame);
  yield takeLatest(startWatching, handleStartWatching);
}

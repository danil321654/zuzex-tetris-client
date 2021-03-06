import { put, select, takeEvery, takeLatest, all } from "redux-saga/effects";

import {
  spawnShape,
  moveShape,
  shapeLand,
  moveShapeDown,
} from "../reducers/index";
import socket from "../api";

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
      yield put(shapeLand());
      yield put(spawnShape());
    }
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

export default function* watchPlayGround() {
  yield all([
    takeLatest(spawnShape, handleShapeAppear),
    takeEvery(moveShape, handleShapeMove),
    takeEvery(moveShapeDown, handleShapeDown),
    takeEvery(shapeLand, handleShapeLand),
  ]);
}

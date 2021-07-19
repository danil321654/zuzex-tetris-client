import { all } from "@redux-saga/core/effects";
import playGroundSaga from "./playGroundSaga";
import controlsSaga from "./controlsSaga";

export default function* rootSaga() {
  yield all([playGroundSaga(), controlsSaga()]);
}

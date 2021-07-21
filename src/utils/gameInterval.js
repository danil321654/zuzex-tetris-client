import store from "../store";
import { moveShape, shapeLand, spawnShape } from "../reducers/index";
import { verticalMoveActionPayload } from "./verticalMoveHandle";
import { deepCopy } from "./deepCopy";
import { move } from "./move";

function Timer(fn, t) {
  var timerObj = setInterval(fn, t);

  this.stop = function () {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
    return this;
  };

  // start timer using current settings (if it's not already running)
  this.start = function () {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
    return this;
  };

  // start with new or original interval, stop current interval
  this.reset = function (newT = t) {
    t = newT;
    return this.stop().start();
  };

  // start with new or original interval, stop current interval
  this.getTimerObj = function () {
    return timerObj;
  };
}

export const intervalFunc = () => {
  if (!store.getState().currentShape.length) return;
  store.dispatch(moveShape(verticalMoveActionPayload(1)));
  const currentShape = store.getState().currentShape;
  const newShape = currentShape.map((el) => ({ ...el, i: +el.i + 1 }));
  const playGround = store.getState().playGround;
  const newMove = move(playGround, newShape, currentShape);

  let lowerBlocks = deepCopy(newMove);
  lowerBlocks.sort((a, b) => b.i - a.i);
  lowerBlocks = lowerBlocks.filter(
    (el) => !lowerBlocks.some((dot) => dot.j === el.j && dot.i > el.i)
  );
  if (lowerBlocks.some((dot) => playGround[dot.i][dot.j] > 10)) {
    store.dispatch(moveShape(verticalMoveActionPayload(-1)));
  }

  if (!newMove.length) {
    const moveInterval = store.getState().moveInterval;
    setTimeout(() => {
      const currentShape = store.getState().currentShape;
      const newShape = currentShape.map((el) => ({ ...el, i: +el.i + 1 }));
      const playGround = store.getState().playGround;
      if (move(playGround, newShape, currentShape).length === 0) {
        store.dispatch(shapeLand());
        setTimeout(() => {
          const timer = store.getState().timer;
          if (!store.getState().lose && timer.getTimerObj() != null)
            store.dispatch(spawnShape());
        }, moveInterval);
      }
    }, moveInterval - 100);
  }
  return newMove;
};

export default Timer;

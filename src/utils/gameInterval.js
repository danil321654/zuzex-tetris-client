import store from "../store";
import { moveShapeVertical, shapeLand, spawnShape } from "../reducers/index";
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
  store.dispatch(moveShapeVertical(1));
  const currentShape = store.getState().currentShape;
  const newShape = currentShape.map((el) => ({ ...el, i: +el.i + 1 }));
  const playGround = store.getState().playGround;
  const newMove = move(playGround, newShape, currentShape);

  let lowerBlocks = JSON.parse(JSON.stringify(newMove));
  lowerBlocks.sort((a, b) => b.i - a.i);
  lowerBlocks = lowerBlocks.filter(
    (el, ind) => !lowerBlocks.some((dot) => dot.j === el.j && dot.i > el.i)
  );
  if (lowerBlocks.some((dot) => playGround[dot.i][dot.j] > 10)) {
    store.dispatch(moveShapeVertical(-1));
  }

  if (!newMove.length) {
    setTimeout(() => {
      store.dispatch(shapeLand());
    }, 100);
    setTimeout(() => {
      const timer = store.getState().timer;
      if (!store.getState().lose && timer.getTimerObj() != null)
        store.dispatch(spawnShape());
    }, 500);
  }
};

export default Timer;

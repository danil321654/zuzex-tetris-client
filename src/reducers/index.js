import { createSlice } from "@reduxjs/toolkit";
import { getRandomShape } from "../utils/getRandomShape";
import {
  horizontalMoveHandle,
  predictMove,
  verticalMoveHandle,
} from "../utils/move";
import { rotate } from "../utils/rotate";
import Timer, { intervalFunc } from "../utils/gameInterval";
import { getRandomInt } from "../utils/getRandomColor";

const initialField = [];

const initialState = {
  playGround: initialField,
  loading: true,
  mouseControlsEnabled: false,
  oldShape: [],
  currentShape: [],
  nextShape: [],
  nextColor: -1,
  predictedShape: [],
  move: [],
  rotateMove: [],
  timer: new Timer(intervalFunc, 300),
  position: 0,
  lose: false,
  users: [],
  username: "",
  score: 0,
  color: 0,
};

const playGroundSlice = createSlice({
  name: "playGround",
  initialState,
  reducers: {
    connectSocket(state, action) {
      state.playGround = action.payload.playGround;
      state.position = action.payload.position;
      state.loading = true;
      state.lose = false;
      if (action.payload.names) state.users = action.payload.names;
      state.score = action.payload.score;
      state.moveInterval = action.payload.moveInterval;
    },
    applyPlayGround(state, action) {
      state.playGround = action.payload.playGround;
      if (action.payload.names) state.users = action.payload.names;

      if (action.payload.position) state.position = action.payload.position;
      else if (state.username) {
        state.position = Math.ceil(
          (state.playGround[0].length / (state.users.length + 1)) *
            (state.users.indexOf(state.username) + 1) +
            state.users.indexOf(state.username)
        );
      }
      state.loading = state.playGround[0].length === 0;
      state.predictedShape = predictMove(state.playGround, state.currentShape);
      state.score = action.payload.score;
      state.moveInterval = action.payload.moveInterval;
      state.oldShape = [...state.currentShape];
    },
    spawnShape(state) {
      state.oldShape = [];
      if (!state.lose) {
        state.currentShape =
          state.nextShape.length > 0
            ? state.nextShape.map((el) => ({
                ...el,
                j: el.j + state.position - 1,
              }))
            : getRandomShape(state.position - 1);
        state.nextShape = getRandomShape(1);
        state.color =
          state.nextColor > -1 ? state.nextColor : getRandomInt(10, 1);
        state.nextColor = getRandomInt(10, 1);
      }
      state.lose = false;
    },
    moveShapeHorizontal(state, action) {
      horizontalMoveHandle(state, action);
    },
    moveShapeVertical(state, action) {
      verticalMoveHandle(state, action);
    },
    shapeLand(state) {
      state.oldShape = [];
      state.currentShape = [];
    },
    shapeRotate(state, action) {
      state.rotateMove = [];
      const swap = JSON.parse(JSON.stringify(state.currentShape)).map((el) => ({
        i: +el.i,
        j: +el.j,
      }));
      state.rotateMove = rotate(
        state.playGround,
        state.currentShape,
        action.payload
      );
      if (state.rotateMove.length) {
        state.currentShape = JSON.parse(JSON.stringify(state.rotateMove));
        state.oldShape = swap;
      } else {
        state.currentShape = swap;
      }
    },
    lose(state, action) {
      state.lose = true;
      state.moveInterval = action.payload.moveInterval;
    },
    newGame(state, action) {
      state.lose = false;
      state.moveInterval = action.payload.moveInterval;
    },
    authorize(state, action) {
      state.username = action.payload;
    },
    requestNewGame() {},
    startWatching(state) {
      state.currentShape = [];
      state.oldShape = [];
      state.move = [];
      state.rotateMove = [];
      state.username = "";
      state.loading = true;
    },
    moveShapeDown(state) {
      if (state.predictedShape.length > 0) {
        state.move = state.predictedShape;
        state.predictedShape = [];
      } else state.move = [];
    },
    toggleMouseControls(state, action) {
      state.mouseControlsEnabled = action.payload;
    },
  },
});

export const {
  applyPlayGround,
  connectSocket,
  spawnShape,
  moveShapeHorizontal,
  moveShapeVertical,
  shapeLand,
  shapeRotate,
  lose,
  authorize,
  newGame,
  requestNewGame,
  startWatching,
  moveShapeDown,
  toggleMouseControls,
} = playGroundSlice.actions;
export default playGroundSlice.reducer;

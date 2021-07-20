import { createSlice } from "@reduxjs/toolkit";
import { getRandomShape } from "../utils/getRandomShape";
import {
  horizontalMoveHandle,
  predictDownMove,
  verticalMoveHandle,
} from "../utils/move";
import { rotateHandle } from "../utils/rotateHandle";
import Timer, { intervalFunc } from "../utils/gameInterval";

const initialField = [];

const initialState = {
  playGround: initialField,
  loading: true,
  currentShape: [],
  nextShape: [],
  nextColor: -1,
  predictedShape: [],
  move: [],
  timer: new Timer(intervalFunc, 300),
  position: 0,
  lose: false,
  users: [],
  username: "",
  score: 0,
  color: 0,
  theme: "classic",
};

const playGroundSlice = createSlice({
  name: "playGround",
  initialState,
  reducers: {
    connectToGame(state, action) {
      state.currentShape = [];
      state.move = [];
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
      state.score = action.payload.score;
      state.moveInterval = action.payload.moveInterval;
      state.predictedShape = predictDownMove(
        state.playGround,
        state.currentShape
      );
    },
    spawnShape(state) {
      if (!state.lose && state.currentShape.length === 0) {
        state.currentShape =
          state.nextShape.length > 0
            ? state.nextShape.map((el) => ({
                ...el,
                j: el.j + state.position - 1,
              }))
            : getRandomShape(state.position - 1);
        state.nextShape = getRandomShape(1);
        state.color =
          state.nextColor > -1
            ? state.nextColor
            : (state.users.indexOf(state.username) % 9) + 1;
        state.nextColor = (state.users.indexOf(state.username) % 9) + 1;
      }
      state.lose = false;
    },
    moveShapeHorizontal(state, action) {
      const result = horizontalMoveHandle(
        state.playGround,
        state.currentShape,
        action.payload
      );
      state.currentShape = [...result];
      state.move = [...result];
    },
    moveShapeVertical(state, action) {
      const result = verticalMoveHandle(
        state.playGround,
        state.currentShape,
        action.payload
      );
      state.currentShape = [...result];
      state.move = [...result];
    },
    shapeRotate(state, action) {
      const result = rotateHandle(
        state.playGround,
        state.currentShape,
        action.payload
      );
      state.currentShape = [...result];
      state.move = [...result];
    },
    shapeLand(state) {
      state.currentShape = [];
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
      state.username = "";
      state.loading = true;
    },
    moveShapeDown(state) {
      if (state.predictedShape.length > 0) {
        state.move = state.predictedShape;
        state.predictedShape = [];
      } else state.move = [];
    },
    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const {
  applyPlayGround,
  connectToGame,
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
  changeTheme,
} = playGroundSlice.actions;
export default playGroundSlice.reducer;

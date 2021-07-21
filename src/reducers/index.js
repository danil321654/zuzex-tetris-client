import { createSlice } from "@reduxjs/toolkit";
import { getRandomShape } from "../utils/getRandomShape";
import { predictDownMove } from "../utils/move";
import { verticalMoveHandle } from "../utils/verticalMoveHandle";
import { horizontalMoveHandle } from "../utils/horizontalMoveHandle";
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
        const myIndex = state.users
          .map((el) => el.name)
          .indexOf(state.username);
        state.position = Math.ceil(
          (state.playGround[0].length / (state.users.length + 1)) *
            (myIndex + 1) +
            myIndex
        );
      }
      state.loading = state.playGround[0].length === 0;
      state.score = action.payload.score;
      state.moveInterval = action.payload.moveInterval;
      state.theme = action.payload.theme;
      state.predictedShape = predictDownMove(
        state.playGround,
        state.currentShape
      );
    },
    spawnShape(state) {
      const myIndex = state.users.map((el) => el.name).indexOf(state.username);
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
          state.nextColor > -1 ? state.nextColor : (myIndex % 9) + 1;
        state.nextColor = (myIndex % 9) + 1;
      }
      state.lose = false;
    },
    moveShape(state, action) {
      let result;
      switch (action.payload.type) {
        case "MOVE_ROTATE":
          result = rotateHandle(
            state.playGround,
            state.currentShape,
            action.payload.value
          );
          state.move = [...result];
          break;
        case "MOVE_VERTICAL":
          result = verticalMoveHandle(
            state.playGround,
            state.currentShape,
            action.payload.value
          );
          state.move = [...result];
          break;
        case "MOVE_HORIZONTAL":
          result = horizontalMoveHandle(
            state.playGround,
            state.currentShape,
            action.payload.value
          );
          state.move = [...result];
          break;
        default:
          result = state.currentShape;
          state.move = [];
      }
      state.currentShape = [...result];
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
      if (action.payload.names) state.users = action.payload.names;
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
  moveShape,
  shapeLand,
  lose,
  authorize,
  newGame,
  requestNewGame,
  startWatching,
  moveShapeDown,
  changeTheme,
} = playGroundSlice.actions;
export default playGroundSlice.reducer;

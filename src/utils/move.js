export const move = (playGround, newShape, oldShape) => {
  const difference = newShape.filter(
    (el) => !oldShape.some((dot) => el.i === dot.i && el.j === dot.j)
  );
  if (
    difference.some(
      (dot) =>
        dot.i >= playGround.length ||
        (playGround[dot.i][dot.j] > 0 && playGround[dot.i][dot.j] < 10)
    )
  )
    return [];

  const toRender = difference.filter((dot, ind) => {
    return (
      dot.i < playGround.length &&
      dot.j < playGround[0].length &&
      (playGround[dot.i][dot.j] === 0 || playGround[dot.i][dot.j] > 10)
    );
  });

  const toDelete = oldShape.filter(
    (dot) => !newShape.some((el) => el.i === dot.i && el.j === dot.j)
  );
  if (toRender.length !== toDelete.length) return [];

  return [...toRender, ...toDelete];
};

export const predictMove = (playGround, currentShape) => {
  if (currentShape.length === 0) return currentShape;
  const currentShapeCopy = JSON.parse(JSON.stringify(currentShape)).map(
    (el) => ({ i: +el.i, j: +el.j })
  );
  currentShapeCopy.sort((a, b) => b.i - a.i);
  while (
    currentShapeCopy.every(
      (dot) =>
        playGround[dot.i + 1] &&
        (playGround[dot.i + 1][dot.j] === 0 ||
          playGround[dot.i + 1][dot.j] > 10)
    )
  ) {
    currentShapeCopy.forEach((block) => {
      block.i++;
    });
    let lowerBlocks = JSON.parse(JSON.stringify(currentShapeCopy)).map(
      (el) => ({ i: +el.i, j: +el.j })
    );
    lowerBlocks.sort((a, b) => b.i - a.i);
    lowerBlocks = lowerBlocks.filter(
      (el, ind) => !lowerBlocks.slice(0, ind).some((dot) => dot.j === el.j)
    );
    if (
      lowerBlocks.some(
        (dot) => playGround[dot.i] && playGround[dot.i][dot.j] > 10
      )
    )
      return [];
  }
  return currentShapeCopy;
};

export const horizontalMoveHandle = (state, action) => {
  const swap = JSON.parse(JSON.stringify(state.oldShape));
  state.oldShape = JSON.parse(JSON.stringify(state.currentShape));
  state.move = [];

  let sideBlocks = JSON.parse(JSON.stringify(state.currentShape));
  sideBlocks.sort((a, b) => b.j - a.j);

  const sideBlocksRight = sideBlocks.filter(
    (el, ind) => !sideBlocks.some((dot) => dot.i === el.i && dot.j > el.j)
  );
  sideBlocks.sort((a, b) => -b.j + a.j);
  const sideBlocksLeft = sideBlocks.filter(
    (el, ind) => !sideBlocks.some((dot) => dot.i === el.i && dot.j < el.j)
  );
  sideBlocks = action.payload < 0 ? sideBlocksLeft : sideBlocksRight;
  for (let index = 0; index < sideBlocks.length; index++) {
    if (
      sideBlocks[index].j + action.payload < 0 ||
      state.playGround[sideBlocks[index].i][
        sideBlocks[index].j + action.payload
      ] > 0
    ) {
      state.currentShape = state.oldShape;
      state.oldShape = swap;
      return;
    }
  }

  for (let index = 0; index < state.currentShape.length; index++) {
    if (
      state.currentShape[index].j + action.payload >=
        state.playGround[0].length ||
      state.currentShape[index].j + action.payload < 0 ||
      state.playGround.length <= state.currentShape[index].i + 1
    ) {
      state.currentShape = state.oldShape;
      state.oldShape = swap;
      break;
    } else
      state.currentShape[index].j =
        state.currentShape[index].j + action.payload;
  }

  state.move = [...state.currentShape];
};

export const verticalMoveHandle = (state, action) => {
  const swap = JSON.parse(JSON.stringify(state.oldShape)).map((el) => ({
    i: +el.i,
    j: +el.j,
  }));
  state.oldShape = JSON.parse(JSON.stringify(state.currentShape)).map((el) => ({
    i: +el.i,
    j: +el.j,
  }));
  state.move = [];
  let lowerBlocks = JSON.parse(JSON.stringify(state.currentShape)).map(
    (el) => ({ i: +el.i, j: +el.j })
  );
  lowerBlocks.sort((a, b) => b.i - a.i);
  lowerBlocks = lowerBlocks.filter(
    (el, ind) => !lowerBlocks.some((dot) => dot.j === el.j && dot.i > el.i)
  );
  for (let index = 0; index < lowerBlocks.length; index++) {
    if (
      lowerBlocks[index].i + action.payload >= state.playGround.length ||
      (state.playGround[lowerBlocks[index].i + action.payload][
        lowerBlocks[index].j
      ] < 10 &&
        state.playGround[lowerBlocks[index].i + action.payload][
          lowerBlocks[index].j
        ] > 0)
    ) {
      state.currentShape = state.oldShape;
      state.oldShape = swap;
      return;
    }
  }
  for (let index = 0; index < state.currentShape.length; index++) {
    if (
      state.currentShape[index].i + action.payload >= state.playGround.length ||
      state.currentShape[index].i + action.payload <= 0
    ) {
      state.currentShape = state.oldShape;
      state.oldShape = swap;
      return;
    } else
      state.currentShape[index].i =
        state.currentShape[index].i + action.payload;
  }

  state.oldShape = [];

  state.move = state.currentShape;
};

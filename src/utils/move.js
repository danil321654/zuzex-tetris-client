import { deepCopy } from "./deepCopy";
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
  return difference;
};

export const predictDownMove = (playGround, currentShape) => {
  if (currentShape.length === 0) return currentShape;
  const shapeCopy = deepCopy(currentShape);
  shapeCopy.sort((a, b) => b.i - a.i);
  while (
    shapeCopy.every(
      (dot) =>
        playGround[dot.i + 1] &&
        (playGround[dot.i + 1][dot.j] === 0 ||
          playGround[dot.i + 1][dot.j] > 10)
    )
  ) {
    shapeCopy.forEach((block) => {
      block.i++;
    });
    const bottomBlocks = shapeCopy.filter(
      (el) => !shapeCopy.some((dot) => dot.j === el.j && dot.i > el.i)
    );
    if (
      bottomBlocks.some(
        (dot) => playGround[dot.i] && playGround[dot.i][dot.j] > 10
      )
    )
      return [];
  }
  return shapeCopy;
};

export const horizontalMoveHandle = (playGround, currentShape, offset) => {
  const shapeCopy = deepCopy(currentShape);

  const sideBlocksRight = shapeCopy.filter(
    (el) => !shapeCopy.some((dot) => dot.i === el.i && dot.j > el.j)
  );
  const sideBlocksLeft = shapeCopy.filter(
    (el) => !shapeCopy.some((dot) => dot.i === el.i && dot.j < el.j)
  );
  const sideBlocks = offset < 0 ? sideBlocksLeft : sideBlocksRight;

  if (sideBlocks.some((el) => playGround[el.i][el.j + offset] !== 0))
    return currentShape;

  return shapeCopy.map((el) => ({ ...el, j: el.j + offset }));
};

export const verticalMoveHandle = (playGround, currentShape, offset) => {
  const shapeCopy = deepCopy(currentShape);

  const bottomBlocks = deepCopy(currentShape).filter(
    (el) => !shapeCopy.some((dot) => dot.j === el.j && dot.i > el.i)
  );
  if (
    bottomBlocks.some(
      (el) =>
        el.i + offset >= playGround.length ||
        el.i + offset <= 0 ||
        (playGround[el.i + offset][el.j] < 10 &&
          playGround[el.i + offset][el.j] > 0)
    )
  )
    return currentShape;

  return shapeCopy.map((el) => ({ ...el, i: el.i + offset }));
};

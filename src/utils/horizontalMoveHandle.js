import { deepCopy } from "./deepCopy";
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

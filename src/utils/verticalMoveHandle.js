import { deepCopy } from "./deepCopy";
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
export const verticalMoveActionPayload = (payload) => ({
  type: "MOVE_VERTICAL",
  value: payload,
});

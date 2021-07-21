import { deepCopy } from "./deepCopy";
export const rotateHandle = (playGround, currentShape, right = false) => {
  if (currentShape.length === 0) return currentShape;
  const shapeCopy = deepCopy(currentShape);

  const minLeft = Math.min(...shapeCopy.map((el) => el.j));
  const maxLeft = Math.max(...shapeCopy.map((el) => el.j));
  const minBottom = Math.min(...shapeCopy.map((el) => el.i));

  const rotatedShape = [
    shapeCopy[0],
    ...shapeCopy.slice(1).map((el) =>
      right
        ? {
            i: shapeCopy[0].i + (el.j - shapeCopy[0].j),
            j: shapeCopy[0].j + (-el.i + shapeCopy[0].i),
          }
        : {
            i: shapeCopy[0].i + (-el.j + shapeCopy[0].j),
            j: shapeCopy[0].j + (el.i - shapeCopy[0].i),
          }
    ),
  ];

  const newMinLeft = Math.min(...rotatedShape.map((el) => el.j));
  const newMaxLeft = Math.max(...rotatedShape.map((el) => el.j));
  const newMinBottom = Math.min(...rotatedShape.map((el) => el.i));
  const rotatedShapePositioned = rotatedShape.map((el) => ({
    ...el,
    i: el.i + minBottom - newMinBottom,
    j: el.j + (right ? maxLeft - newMaxLeft : minLeft - newMinLeft),
  }));
  const difference = rotatedShapePositioned.filter(
    (el) => !currentShape.some((dot) => el.i === dot.i && el.j === dot.j)
  );
  if (
    difference.some(
      (dot) =>
        dot.i < 0 ||
        dot.j < 0 ||
        dot.i >= playGround.length ||
        dot.j >= playGround[0].length ||
        playGround[dot.i][dot.j] > 0
    )
  )
    return currentShape;

  return rotatedShapePositioned;
};
export const rotateActionPayload = (payload) => ({
  type: "MOVE_ROTATE",
  value: payload,
});

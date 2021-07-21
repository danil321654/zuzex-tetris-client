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

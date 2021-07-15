export const rotate = (playGround, oldShape, right = false) => {
  if (oldShape.length === 0) return oldShape;
  let newShape = JSON.parse(JSON.stringify(oldShape)).map((el) => ({
    i: +el.i,
    j: +el.j,
  }));
  newShape.sort((a, b) => b.i - a.i);

  const minLeft = Math.min(...newShape.map((el) => el.j));
  const maxLeft = Math.max(...newShape.map((el) => el.j));
  const minBottom = Math.min(...newShape.map((el) => el.i));

  newShape = right
    ? [
        newShape[0],
        ...newShape.slice(1).map((el) => ({
          i: newShape[0].i + (el.j - newShape[0].j),
          j: newShape[0].j + (-el.i + newShape[0].i),
        })),
      ]
    : [
        newShape[0],
        ...newShape.slice(1).map((el) => ({
          i: newShape[0].i + (-el.j + newShape[0].j),
          j: newShape[0].j + (el.i - newShape[0].i),
        })),
      ];

  const newMinLeft = Math.min(...newShape.map((el) => el.j));
  const newMaxLeft = Math.max(...newShape.map((el) => el.j));
  const newMinBottom = Math.min(...newShape.map((el) => el.i));
  newShape = newShape.map((el) => ({
    ...el,
    i: el.i + minBottom - newMinBottom,
    j: el.j + (right ? maxLeft - newMaxLeft : minLeft - newMinLeft),
  }));
  if (newShape.some((el) => !el)) return oldShape;
  const difference = newShape.filter(
    (el) => !oldShape.some((dot) => el.i === dot.i && el.j === dot.j)
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
    return oldShape;

  if (
    newShape.some(
      (el) =>
        el.i < 0 ||
        el.i >= playGround.length ||
        el.j < 0 ||
        el.j >= playGround[0].length
    )
  )
    return oldShape;
  return JSON.parse(JSON.stringify(newShape));
};

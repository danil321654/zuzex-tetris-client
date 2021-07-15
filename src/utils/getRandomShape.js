function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
export const getRandomShape = (middle) => {
  const shapes = [
    [
      { i: 0, j: middle + 1 },
      { i: 1, j: middle },
      { i: 0, j: middle },
      { i: 1, j: middle + 1 },
    ],
    [
      { i: 0, j: middle },
      { i: 1, j: middle },
      { i: 1, j: middle - 1 },
      { i: 1, j: middle + 1 },
    ],
    [
      { i: 0, j: middle },
      { i: 1, j: middle },
      { i: 0, j: middle + 1 },
      { i: 1, j: middle - 1 },
    ],
    [
      { i: 0, j: middle },
      { i: 1, j: middle },
      { i: 0, j: middle - 1 },
      { i: 1, j: middle + 1 },
    ],
    [
      { i: 0, j: middle + 1 },
      { i: 1, j: middle },
      { i: 1, j: middle - 1 },
      { i: 1, j: middle + 1 },
    ],
    [
      { i: 0, j: middle - 1 },
      { i: 1, j: middle },
      { i: 1, j: middle - 1 },
      { i: 1, j: middle + 1 },
    ],
    [
      { i: 0, j: middle - 1 },
      { i: 0, j: middle },
      { i: 0, j: middle + 1 },
      { i: 0, j: middle + 2 },
    ],
  ];
  const result = shapes[getRandomInt(shapes.length)];
  return result;
};

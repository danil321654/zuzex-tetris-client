export const getShape = (index, middle) => {
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
  const result = shapes[index];
  return result;
};

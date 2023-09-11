export const generateMatrix = (size: number) => {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push([...Array(size)]);
  }
  return matrix;
};

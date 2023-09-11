export const checkForWin = (board: [][]) => {
  const validateArray = (row: []) => {
    const rowSet = new Set<boolean | undefined>(row);
    // console.log(rowSet);
    if (rowSet.size == 1 && !rowSet.has(undefined)) {
      return true;
    }
    return false;
  };

  // verticalWin
  for (const row of board) {
    if (validateArray(row)) return true;
  }
  // horizontalWin
  for (let i = 0; i < board.length; i++) {
    const col: [] = [];
    for (let j = 0; j < board.length; j++) {
      col.push(board[j][i]);
    }
    if (validateArray(col)) return true;
  }
  // diagonalWin
  const leftDiag: [] = [];
  const rightDiag: [] = [];
  for (let i = 0, j = board.length - 1; i < board.length; i++, j--) {
    leftDiag.push(board[i][i]);
    rightDiag.push(board[i][j]);
  }
  return validateArray(leftDiag) || validateArray(rightDiag);
};

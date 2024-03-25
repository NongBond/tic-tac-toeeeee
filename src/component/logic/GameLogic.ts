export type BoardArrayTypes = Array<Array<string | null>>;

export const checkWinner = (
  board: BoardArrayTypes
): [string | null, number[][] | null] => {
  const size = board.length;
  let winningPath: number[][] = [];

  for (let i = 0; i < size; i++) {
    if (board[i].every((cell) => cell === "X")) {
      winningPath = board[i].map((_, j) => [i, j]);
      return ["X", winningPath];
    }
    if (board[i].every((cell) => cell === "O")) {
      winningPath = board[i].map((_, j) => [i, j]);
      return ["O", winningPath];
    }
  }

  for (let i = 0; i < size; i++) {
    if (board.every((row) => row[i] === "X")) {
      winningPath = board.map((_, j) => [j, i]);
      return ["X", winningPath];
    }
    if (board.every((row) => row[i] === "O")) {
      winningPath = board.map((_, j) => [j, i]);
      return ["O", winningPath];
    }
  }

  if (board.every((row, index) => row[index] === "X")) {
    winningPath = board.map((_, i) => [i, i]);
    return ["X", winningPath];
  }
  if (board.every((row, index) => row[index] === "O")) {
    winningPath = board.map((_, i) => [i, i]);
    return ["O", winningPath];
  }
  if (board.every((row, index) => row[size - 1 - index] === "X")) {
    winningPath = board.map((_, i) => [i, size - 1 - i]);
    return ["X", winningPath];
  }
  if (board.every((row, index) => row[size - 1 - index] === "O")) {
    winningPath = board.map((_, i) => [i, size - 1 - i]);
    return ["O", winningPath];
  }

  return [null, null];
};

export const getNextPlayer = (currentPlayer: string): string => {
  return currentPlayer === "X" ? "O" : "X";
};

export const resetBoard = (size: number): BoardArrayTypes => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );
};

export const getRandomMove = (
  board: BoardArrayTypes
): [number, number] | null => {
  const validMove: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) validMove.push([rowIndex, cellIndex]);
    });
  });

  if (validMove.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * validMove.length);
  return validMove[randomIndex];
};

export const isBoardFull = (board: BoardArrayTypes): boolean => {
  for (const row of board) {
    for (const cell of row) {
      if (!cell) {
        return false;
      }
    }
  }
  return true;
};

export type BoardArrayTypes = Array<Array<string | null>>;

export const checkWinner = (board: BoardArrayTypes): string | null => {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    if (board[i].every((cell) => cell === "X")) return "X";
    if (board[i].every((cell) => cell === "O")) return "O";
  }

  for (let i = 0; i < size; i++) {
    if (board.every((row) => row[i] === "X")) return "X";
    if (board.every((row) => row[i] === "O")) return "O";
  }

  if (board.every((row, index) => row[index] === "X")) return "X";
  if (board.every((row, index) => row[index] === "O")) return "O";
  if (board.every((row, index) => row[size - 1 - index] === "X")) return "X";
  if (board.every((row, index) => row[size - 1 - index] === "O")) return "O";

  return null;
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

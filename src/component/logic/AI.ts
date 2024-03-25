import { checkWinner, BoardArrayTypes } from "../logic/GameLogic";

const scores = {
  X: -1,
  O: 1,
  tie: 0,
};

export function minimax(
  board: BoardArrayTypes,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  depthLimit: number
): number {
  if (depth >= depthLimit) {
    return 0;
  }
  const winner = checkWinner(board)[0];
  if (winner !== null) {
    return scores[winner as "X" | "O" | "tie"];
  }
  const boardSize = board.length;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          board[i][j] = "O";
          const score = minimax(
            board,
            depth + 1,
            false,
            alpha,
            beta,
            depthLimit
          );
          board[i][j] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
            return bestScore;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          board[i][j] = "X";
          const score = minimax(
            board,
            depth + 1,
            true,
            alpha,
            beta,
            depthLimit
          );
          board[i][j] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            return bestScore;
          }
        }
      }
    }
    return bestScore;
  }
}

export function getBestMove(board: BoardArrayTypes): [number, number] {
  let bestScore = -Infinity;
  let moves: [number, number][] = [];
  const boardSize = board.length;

  const startTime = Date.now();
  const timeLimit = 5000;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === null) {
        board[i][j] = "O";
        const winnerO = checkWinner(board)[0];
        if (winnerO === "O") {
          return [i, j];
        }

        board[i][j] = "X";
        const winnerX = checkWinner(board)[0];
        if (winnerX === "X") {
          board[i][j] = null;
          moves.push([i, j]);
        } else {
          board[i][j] = null;
        }
      }
    }
  }

  if (moves.length > 0) {
    return moves[0];
  }

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === null) {
        board[i][j] = "O";
        const score = minimax(board, 0, false, -Infinity, Infinity, 5);
        board[i][j] = null;

        if (score > bestScore) {
          bestScore = score;
          moves = [[i, j]];
        } else if (score === bestScore) {
          moves.push([i, j]);
        }

        if (Date.now() - startTime > timeLimit) {
          return moves[Math.floor(Math.random() * moves.length)];
        }
      }
    }
  }

  if (moves.length === 0) {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === null) {
          return [i, j];
        }
      }
    }
  }

  const move = moves[Math.floor(Math.random() * moves.length)];
  return move;
}

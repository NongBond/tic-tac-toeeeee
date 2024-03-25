import "./board.css";
type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
  winningPath: number[][] | null;
  currentPlayer: string;
};

const Board: React.FC<BoardProps> = ({
  board,
  handleClick,
  winningPath,
  currentPlayer,
}) => {
  const isWinningCell = (row: number, col: number) => {
    return (
      winningPath &&
      winningPath.some((path) => path[0] === row && path[1] === col)
    );
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`board_cell ${
                isWinningCell(rowIndex, cellIndex) ? "winning" : ""
              }`}
              onClick={() => handleClick(rowIndex, cellIndex)}
              data-player={currentPlayer}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Board;

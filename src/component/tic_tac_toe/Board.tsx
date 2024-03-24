import "./board.css";
type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};

const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className="board_cell"
              onClick={() => handleClick(rowIndex, cellIndex)}
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

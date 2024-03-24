import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import ReplayList from "../replay_list/ReplayList";

const MainPage = () => {
  const [size, setSize] = useState(3);
  const navigate = useNavigate();

  const game_start = () => {
    navigate(`/game/${size}`);
  };

  return (
    <div className="main_page_container">
      <h1 className="title">Tic Tac Toeeeee</h1>
      <div className="size_container">
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="input_size"
        />
        <button onClick={game_start} className="start_button">
          Start Game
        </button>
      </div>

      <ReplayList />
    </div>
  );
};

export default MainPage;

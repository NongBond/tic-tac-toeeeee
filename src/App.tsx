import "./firebaseConfig";
import "./App.css";
import MainPage from "./component/main_page/MainPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TicTacToe from "./component/tic_tac_toe/TicTacToe";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/game/:size" element={<TicTacToe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

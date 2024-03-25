import "./tic-tac-toe.css";
import Board from "./Board";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkWinner,
  getNextPlayer,
  isBoardFull,
  resetBoard,
} from "../logic/GameLogic";
import { getBestMove } from "../logic/AI";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseConfig } from "../../firebaseConfig";

type BoardArrayTypes = Array<Array<string | null>>;

const app = initializeApp(firebaseConfig);

const TicTacToe = () => {
  const { size: inputSize } = useParams<{ size: string }>();
  const mediaRecordRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Array<Blob>>([]);
  const size = Number(inputSize);
  const navigate = useNavigate();
  const [isRecordingStop, setIsRecordingStop] = useState(false);
  const [board, setBoard] = useState<BoardArrayTypes>(
    Array.from({ length: size }, () => Array.from({ length: size }, () => null))
  );
  const [player, setPlayer] = useState(Math.random() < 0.5 ? "X" : "O");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningPath, setWinningPath] = useState<number[][] | null>(null);

  useEffect(() => {
    if (isRecordingStop) {
      navigate("/");
    }
  }, [isRecordingStop, navigate]);

  useEffect(() => {
    (async () => {
      await startRecording();
    })();
  }, []);

  const startRecording = async () => {
    console.log("start recording");
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      mediaRecordRef.current = new MediaRecorder(stream);
      mediaRecordRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      mediaRecordRef.current.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = useCallback(async () => {
    console.log("stop recording");
    if (mediaRecordRef.current) {
      mediaRecordRef.current.ondataavailable = async (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          const storage = getStorage(app);

          const fileName = `tic-tac-toe-${Date.now()}.webm`;
          const storageRef = ref(storage, fileName);

          try {
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            const db = getFirestore();
            await addDoc(collection(db, "records"), {
              timestamp: serverTimestamp(),
              videoUrl: downloadURL,
              boardSize: size,
            });
          } catch (error) {
            console.error(
              "Error during upload or Firestore operations:",
              error
            );
          }
        }
      };
      if (mediaRecordRef.current.state === "recording") {
        mediaRecordRef.current.stop();
        mediaRecordRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
      setIsRecordingStop(true);
    }
  }, [size]);

  const cellClick = useCallback(
    (row: number, col: number) => {
      if (board[row][col] || winner) return;

      const newBoard = board.map((updateRow, rowIndex) =>
        updateRow.map((cell, cellIndex) =>
          rowIndex === row && cellIndex === col ? player : cell
        )
      );
      setBoard(newBoard);
      setPlayer(getNextPlayer(player));
    },
    [board, player, winner]
  );

  useEffect(() => {
    if (!winner) {
      if (player === "O" && !isBoardFull(board)) {
        const move = getBestMove(board);
        if (move) {
          const [row, col] = move;
          cellClick(row, col);
        }
      }
      const [newWinner, newWinningPath] = checkWinner(board);
      if (newWinner) {
        setWinner(newWinner);
        setWinningPath(newWinningPath);
        setTimeout(() => {
          alert(`Winner is ${newWinner}`);
        }, 0);
      } else if (isBoardFull(board)) {
        setTimeout(() => {
          alert("The game is a draw");
        }, 0);
      }
    }
  }, [board, player, cellClick, winner]);

  const backToMain = async () => {
    console.log("stop recording");
    await stopRecording();
    console.log("back to main");
    setIsRecordingStop(true);
  };

  const resetGame = () => {
    setBoard(resetBoard(size));
    setPlayer(Math.random() < 0.5 ? "X" : "O");
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>My Tic Tac Toe</h1>
      <Board board={board} handleClick={cellClick} winningPath={winningPath} />
      {winner && <p className="winner-message">{winner} is the winner</p>}
      <div className="button_container">
        <button onClick={backToMain}>Back</button>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

export default TicTacToe;

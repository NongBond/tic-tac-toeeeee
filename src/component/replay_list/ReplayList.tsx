import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
import "./ReplayList.css";

type Replay = {
  id: string;
  videoUrl: string;
  timestamp: firebase.firestore.Timestamp;
  boardSize: number;
};

const ReplayList = () => {
  const [replays, setReplays] = useState<Replay[]>([]);
  const [selectedReplay, setSelectedReplay] = useState<Replay | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReplay(null);
  };

  useEffect(() => {
    const fetchReplays = async () => {
      try {
        const db = getFirestore();
        const q = query(
          collection(db, "records"),
          orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedReplays: Replay[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            videoUrl: doc.data().videoUrl,
            timestamp: doc.data().timestamp,
            boardSize: doc.data().boardSize,
          }));
          setReplays(fetchedReplays);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching replays:", error);
      }
    };

    fetchReplays();
  }, [setReplays]);

  function padZero(number: number) {
    return number < 10 ? "0" + number : number;
  }

  function formatTimestamp(timestamp: firebase.firestore.Timestamp | null) {
    if (timestamp) {
      const date = timestamp.toDate();
      return `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${padZero(date.getHours())}:${padZero(
        date.getMinutes()
      )}`;
    } else {
      return "No timestamp available";
    }
  }

  if (replays.length === 0) {
    return (
      <div>
        <h2>Replays</h2>
        <p>No replays available</p>
      </div>
    );
  }

  return (
    <div className="replay_container">
      <h2>Replays</h2>
      <ul id="replay_list">
        {replays.map((replay) => (
          <li key={replay.id} id="replay">
            <div className="replay_container">
              <p>Plays on {formatTimestamp(replay.timestamp)}</p>
              <p>Board size: {replay.boardSize}</p>
              <button
                onClick={() => {
                  setSelectedReplay(replay);
                  openModal();
                }}
              >
                Watch Replay
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="video_replay_container">
        <ModalVideo
          channel="custom"
          isOpen={isOpen}
          url={selectedReplay?.videoUrl || ""}
          onClose={closeModal}
        />
      </div>
      {selectedReplay && <div className="modal-backdrop" />}
    </div>
  );
};

export default ReplayList;

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import "./playbar.scss";
import { togglePlay } from "./ReduxToolkit/musicSlice";

const PlayerBar = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.music);
const audioRef = useRef(null);
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("Play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // 🔹 Khi nhạc kết thúc tự dừng
  const handleEnded = () => {
    dispatch(pauseSong());
  };
  
  return (
    <div className="player-bar">
      <div className="player-left">
        <img src={currentSong?.image} alt={currentSong?.title} />
        <div className="song-info">
          <h4>{currentSong?.title}</h4>
          <p>{currentSong?.singerName}</p>
        </div>
      </div>

      <div className="player-center">
        <button><FaStepBackward /></button>
        <button onClick={() => dispatch(togglePlay())}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button><FaStepForward /></button>
      </div>

      <div className="player-right">
        <audio
          ref={audioRef}
          src={`${import.meta.env.VITE_BACKEND}music/play/${currentSong?._id}`}
          onEnded={handleEnded}
          controls
        />
      </div>
    </div>
  );
};

export default PlayerBar;
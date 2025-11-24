import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";
import {
  togglePlay,
  pauseSong,
  playNext,
  playPrev,
} from "./ReduxToolkit/musicSlice";
import "./playbar.scss";

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
  }, [isPlaying, currentSong]);

  const handleEnded = () => {
    dispatch(playNext());
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
        <button onClick={() => dispatch(playPrev())}>
          <FaStepBackward />
        </button>
        <button onClick={() => dispatch(togglePlay())}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={() => dispatch(playNext())}>
          <FaStepForward />
        </button>
      </div>

      <div className="player-right">
        <audio
          ref={audioRef}
          src={
            currentSong
              ? `${import.meta.env.VITE_BACKEND}music/play/${currentSong._id}`
              : ""
          }
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
};

export default PlayerBar;

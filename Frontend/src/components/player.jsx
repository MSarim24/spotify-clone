import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import LikeButton from "./LikeButton";

function Player() {
  const { currentSong, isPlaying, setIsPlaying, likedSongs, toggleLike } =
    usePlayer();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timestamps, setTimestamps] = useState({
    current: "0:00",
    total: "0:00",
  });

  const formatTime = (time) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (duration) {
      setProgress((current / duration) * 100);
      setTimestamps({
        current: formatTime(current),
        total: formatTime(duration),
      });
    }
  };

  const handleProgressChange = (e) => {
    const newPercentage = e.target.value;
    const duration = audioRef.current.duration;
    if (duration) {
      audioRef.current.currentTime = (newPercentage / 100) * duration;
      setProgress(newPercentage);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Playback failed", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <div className="player">
      {currentSong && (
        <audio
          ref={audioRef}
          src={`http://localhost:5001${currentSong.audio}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <div className="player-left">
        {currentSong ? (
          <>
            <img
              src={currentSong.img}
              alt="Album Art"
              className="now-playing-img"
            />
            <div className="now-playing-info">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
            <LikeButton
              type="song"
              id={currentSong.id}
              liked={likedSongs.includes(currentSong.id)}
              onLike={toggleLike}
              className="add-btn"
            />
          </>
        ) : (
          <div
            className="now-playing-info"
            style={{ color: "#b3b3b3", fontSize: "14px", marginTop: "10px" }}
          >
            Select a song to play
          </div>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" title="Previous">
            ⏮
          </button>

          <button
            className="play-btn"
            title={isPlaying ? "Pause" : "Play"}
            onClick={() => {
              if (currentSong) setIsPlaying(!isPlaying);
            }}
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
                <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
                <path d="M3 2v12l10-6z"></path>
              </svg>
            )}
          </button>

          <button className="control-btn" title="Next">
            ⏭
          </button>
        </div>

        <div className="playback-bar">
          <span className="time">{timestamps.current}</span>
          <div className="progress-bar-container">
            <input
              type="range"
              className="progress-slider"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              style={{
                width: "100%",
                cursor: "pointer",
                accentColor: "#1db954",
              }}
            />
          </div>
          <span className="time">{timestamps.total}</span>
        </div>
      </div>

      <div className="player-right"></div>
    </div>
  );
}

export default Player;

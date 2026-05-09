import { useEffect, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import LikeButton from "./LikeButton";

function Player() {
  const { currentSong, isPlaying, setIsPlaying, likedSongs, toggleLike } =
    usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  return (
    <div className="player">
      {currentSong && <audio ref={audioRef} src={currentSong.audio} />}

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
          <span className="time">0:00</span>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: "0%" }}></div>
            </div>
          </div>
          <span className="time">3:20</span>
        </div>
      </div>

      {/* Right: Volume Controls */}
      <div className="player-right">
        <span className="volume-icon">🔊</span>
        <div className="volume-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

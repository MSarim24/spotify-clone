function Player() {
  return (
    <div className="player">
      {/* LEFT: Now Playing Info */}
      <div className="player-left">
        <img
          src="https://via.placeholder.com/56"
          alt="Album Art"
          className="now-playing-img"
        />
        <div className="now-playing-info">
          <h4>Midnights</h4>
          <p>Taylor Swift</p>
        </div>
        <button className="add-btn" title="Save to Your Library">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        </button>
      </div>

      {/* CENTER: Player Controls & Progress Bar */}
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" title="Previous">
            ⏮
          </button>
          <button className="play-btn" title="Play">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="black">
              <path d="M3 2v12l10-6z"></path>
            </svg>
          </button>
          <button className="control-btn" title="Next">
            ⏭
          </button>
        </div>

        <div className="playback-bar">
          <span className="time">1:04</span>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: "30%" }}></div>
            </div>
          </div>
          <span className="time">3:20</span>
        </div>
      </div>

      {/* RIGHT: Volume Controls */}
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

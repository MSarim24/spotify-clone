import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="library-header">
        <div className="library-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2v20h2V2H9z"></path>
          </svg>
          <h2>Your Library</h2>
        </div>
        <button className="create-btn" title="Create playlist">
          +
        </button>
      </div>

      <div className="library-pills">
        <button className="pill active">Playlists</button>
      </div>

      <div className="playlist-list">
        <Link to="/liked" className="playlist-item">
          <div className="playlist-img liked-img">
            <span role="img" aria-label="heart">
              🤍
            </span>
          </div>
          <div className="playlist-info">
            <h4>Liked Songs</h4>
            <p>Playlist • 92 songs</p>
          </div>
        </Link>

        <Link to="/playlist/1" className="playlist-item">
          <div className="playlist-img placeholder-img">🎵</div>
          <div className="playlist-info">
            <h4>My Awesome Playlist</h4>
            <p>Playlist • sarim</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

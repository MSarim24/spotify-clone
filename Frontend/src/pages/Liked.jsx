import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout"; // optional, keep if needed
import { usePlayer } from "../context/PlayerContext";
import { useLikedRefresh } from "../context/LikedContext";

const BASE_URL = "http://localhost:5001";

function Liked() {
  const [likedList, setLikedList] = useState([]);
  const [username, setUsername] = useState(null); // null initially, better than empty string
  const { playTrack } = usePlayer();
  const { refreshKey } = useLikedRefresh(); // listen for refresh triggers

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, songsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/liked/getUserDetail`, { headers }),
          axios.get(`${BASE_URL}/api/liked/getLikedSongs`, { headers }),
        ]);

        if (!cancelled) {
          setUsername(userRes.data);
          setLikedList(songsRes.data.songs);
        }
      } catch (err) {
        console.log("API ERROR:", err.response?.data || err.message);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]); // re‑fetch whenever refreshKey changes

  return (
    <div className="liked-page">
      <div className="playlist-header">
        <div className="liked-cover-art">
          <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>
        </div>
        <div className="playlist-header-info">
          <span className="playlist-type" style={{ color: "#d1cbcb" }}>
            Playlist
          </span>
          <h1 className="playlist-title" style={{ color: "#d1cbcb" }}>
            Liked Songs
          </h1>
          <div className="playlist-meta">
            <img
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
              alt="Profile"
              className="profile-pic"
            />
            <span className="username" style={{ color: "#d1cbcb" }}>
              {username?.user_name || "User"}
            </span>
            <span className="dot">•</span>
            <span className="song-count" style={{ color: "#d1cbcb" }}>
              {likedList.length} songs
            </span>
          </div>
        </div>
      </div>

      <div className="tracklist">
        <div className="liked-track-grid tracklist-header">
          <div className="col-id">#</div>
          <div className="col-title">Title</div>
          <div className="col-album">Album</div>
        </div>

        <div className="tracklist-rows">
          {Array.isArray(likedList) &&
            likedList.map((l, index) => (
              <div
                className="liked-track-grid track-row"
                key={l.song_id}
                onClick={() => playTrack(l)}
              >
                <div className="col-id">{index + 1}</div>
                <div className="col-title track-title-cell">
                  <img src={`${BASE_URL}${l.image_url}`} alt={l.song_name} />
                  <div className="track-name-artist">
                    <span className="track-name">{l.song_name}</span>
                    <span className="track-artist">{l.artist_name}</span>
                  </div>
                </div>
                <div className="col-album">{l.album_name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Liked;

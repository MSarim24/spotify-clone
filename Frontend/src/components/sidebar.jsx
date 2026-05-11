import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:5001";
import { FollowContext } from "../context/FollowContext";
import { useLikedRefresh } from "../context/LikedContext";

function Sidebar() {
  const navigate = useNavigate();
  const [likedCount, setLikedCount] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const { followedArtists, setFollowedArtists } = useContext(FollowContext);
  const [addButtonState, setAddButtonState] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [artistDetails, setArtistDetails] = useState([]);

  const { refreshKey } = useLikedRefresh(); // listen for likes/unlikes

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const countRes = await axios.get(`${BASE_URL}/api/liked/countLiked`, {
        headers,
      });
      const playlistRes = await axios.get(
        `${BASE_URL}/api/playlists/allPlaylists`,
        { headers },
      );
      const followedRes = await axios.get(
        `${BASE_URL}/api/artists/followedArtist`,
        { headers },
      );
      const ids = followedRes.data.map((a) => a.artist_id);
      const artistData = await Promise.all(
        ids.map((id) =>
          axios.get(`${BASE_URL}/api/artists/ArtistDetail/${id}`, { headers }),
        ),
      );
      setArtistDetails(artistData.map((res) => res.data));
      setPlaylists(playlistRes.data);
      setLikedCount(countRes.data.songs_count);
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  // Refetch when either a song like/unlike happens, OR when followed artists change (follow/unfollow)
  useEffect(() => {
    fetchData();
  }, [refreshKey, followedArtists]);

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${BASE_URL}/api/playlists/createPlaylist`,
        { playlist_name: playlistName, description },
        { headers },
      );
      setPlaylistName("");
      setDescription("");
      setAddButtonState(false);
      fetchData(); // refresh playlists after creation
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  const handleDeletePlaylist = async (playId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${BASE_URL}/api/playlists/deletePlaylist/${playId}`, {
        headers,
      });
      navigate("/");
      fetchData();
    } catch (err) {
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="sidebar">
      <div className="library-header">
        <div className="library-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2v20h2V2H9z"></path>
          </svg>
          <h2>Your Library</h2>
        </div>
        <button
          className="create-btn"
          onClick={() => setAddButtonState(!addButtonState)}
        >
          +
        </button>
      </div>
      {addButtonState && (
        <div className="input-playlist-desc-box">
          <input
            placeholder="Enter playlist name"
            className="input-playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <input
            placeholder="Enter description"
            className="input-playlist"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="followed-art create-playlist-btn"
            onClick={handleCreatePlaylist}
          >
            Create!
          </button>
        </div>
      )}
      <div className="playlist-list">
        <Link to="/liked" className="playlist-item">
          <div className="playlist-img liked-img">🤍</div>
          <div className="playlist-info">
            <h4>Liked Songs</h4>
            <p>Playlist • {likedCount} songs</p>
          </div>
        </Link>
        {Array.isArray(playlists) &&
          playlists.map((p) => (
            <Link
              key={p.playlist_id}
              to={`/playlist/${p.playlist_id}`}
              className="playlist-item"
            >
              <img
                src={`${BASE_URL}${p.image_url}`}
                className="playlist-img placeholder-img"
                alt=""
              />
              <div className="playlist-info">
                {editingId === p.playlist_id ? (
                  <input
                    className="input-playlist"
                    value={editName}
                    autoFocus
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        try {
                          const token = localStorage.getItem("token");
                          await axios.put(
                            `${BASE_URL}/api/playlists/renamePlaylist/${p.playlist_id}`,
                            { playlist_name: editName },
                            { headers: { Authorization: `Bearer ${token}` } },
                          );
                          setEditingId(null);
                          fetchData();
                        } catch (err) {
                          console.log(err);
                        }
                      }
                      if (e.key === "Escape") {
                        setEditingId(null);
                      }
                    }}
                    onBlur={() => setEditingId(null)}
                  />
                ) : (
                  <h4>{p.playlist_name}</h4>
                )}
                <p>Playlist • {p.user_name}</p>
              </div>
              <button
                className="delete-playlist"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeletePlaylist(p.playlist_id);
                }}
              >
                🗑️
              </button>
              <button
                className="delete-playlist"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditingId(p.playlist_id);
                  setEditName(p.playlist_name);
                }}
              >
                ✏️
              </button>
            </Link>
          ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h4 className="followed-art">Followed Artists</h4>
      </div>
      {Array.isArray(artistDetails) &&
        artistDetails.map((a) => (
          <Link
            key={a.artist_id}
            to={`/artist/${a.artist_id}`}
            className="playlist-item"
          >
            <img
              className="playlist-img placeholder-img"
              src={`${BASE_URL}${a.image_url}`}
              alt=""
            />
            <div className="playlist-info">
              <h4>{a.artist_name}</h4>
              <p>Artist</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Sidebar;

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import axios from "axios";

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState({ songs: [], artists: [] });
  const [loading, setLoading] = useState(false);

  const { setCurrentSong, setIsPlaying } = usePlayer();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5001/api/songs/search?q=${query}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setResults(response.data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="playlist-page" style={{ padding: "24px" }}>
      <h2 style={{ color: "white", marginBottom: "24px" }}>
        {query ? `Results for "${query}"` : "Search for songs or artists"}
      </h2>

      {loading ? (
        <p style={{ color: "#b3b3b3" }}>Searching the database...</p>
      ) : (
        <div className="search-results-container">
          {/* --- ARTISTS SECTION --- */}
          {results.artists?.length > 0 && (
            <div className="results-section" style={{ marginBottom: "40px" }}>
              <h3 style={{ color: "white", marginBottom: "16px" }}>Artists</h3>
              <div
                className="row-cards"
                style={{ display: "flex", gap: "15px" }}
              >
                {results.artists.map((artist) => (
                  <div
                    className="card"
                    key={artist.artist_id}
                    onClick={() => navigate(`/artist/${artist.artist_id}`)}
                  >
                    <img
                      src={
                        artist.artist_image || "https://via.placeholder.com/150"
                      }
                      alt={artist.artist_fname}
                      style={{ borderRadius: "50%" }}
                    ></img>
                    <h4>{`${artist.artist_fname} ${artist.artist_lname}`}</h4>
                    <p>Artist</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SONGS SECTION --- */}
          {results.songs?.length > 0 && (
            <div className="results-section">
              <h3 style={{ color: "white", marginBottom: "16px" }}>Songs</h3>
              <div className="tracklist-rows">
                {results.songs.map((track, index) => (
                  <div
                    className="track-row"
                    key={track.song_id}
                    onClick={() => {
                      setCurrentSong({
                        id: track.song_id,
                        title: track.song_name,
                        artist: track.artist_id,
                        img:
                          track.cover_image ||
                          "https://via.placeholder.com/150",
                        audio: track.file_path,
                      });
                      setIsPlaying(true);
                    }}
                  >
                    <div className="col-id">{index + 1}</div>
                    <div className="col-title">
                      <span className="track-name">{track.song_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!results.songs?.length && !results.artists?.length && query && (
            <p style={{ color: "#b3b3b3" }}>No matches found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

import { createContext, useState, useContext } from "react";
import axios from "axios";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);

  const playTrack = async (track) => {
    setCurrentSong({
      id: track.song_id || track.id,
      title: track.song_name || track.title,
      artist: track.artist_name || track.artist,
      img: track.cover_image || track.img || "https://via.placeholder.com/150",
      audio: track.file_path || track.audio,
    });
    setIsPlaying(true);

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const songId = track.song_id || track.id;

      await axios.put(
        `http://localhost:5001/api/song/playSong/${songId}`,
        {},
        config,
      );
      await axios.post(
        `http://localhost:5001/api/song/addToRecent/${songId}`,
        {},
        config,
      );
    } catch (err) {
      console.error("Stats update failed", err);
    }
  };

  const toggleLike = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        setIsPlaying,
        likedSongs,
        toggleLike,
        playTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayer = () => useContext(PlayerContext);

import { createContext, useState, useContext } from "react";
import axios from "axios";

const PlayerContext = createContext();
const BASE_URL = "http://localhost:5001";
export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);

  const playTrack = async (track) => {
    setCurrentSong({
      id: track.song_id,
      title: track.song_name,
      artist: track.artist_name,
      img: `${BASE_URL}${track.image_url}`,
      audio: track.song_audio_url,
    });
    setIsPlaying(true);

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const songId = track.song_id || track.id;

      await axios.put(`${BASE_URL}/api/songs/playSong/${songId}`, {}, config);
      await axios.post(
        `${BASE_URL}/api/songs/addToRecent/${songId}`,
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

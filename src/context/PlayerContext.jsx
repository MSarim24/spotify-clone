/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likedSongs, setLikedSongs] = useState([]);

  const toggleLike = (songId) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const contextValue = {
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    likedSongs,
    toggleLike,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

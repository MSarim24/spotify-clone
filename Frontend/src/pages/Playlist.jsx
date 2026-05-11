import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { usePlayer } from "../context/PlayerContext";

const BASE_URL = "http://localhost:5001";
function Playlist() {
  const { id } = useParams();
  const [playListSongs,SetPlaylistSongs]=useState([])
  const [playlistDetails,SetPlaylistDetails]=useState(null)
  const [AllSongs,setAllSongs]=useState([])
  const { playTrack } = usePlayer();

  const fetchData=async()=>{
    try
    {
      const token=localStorage.getItem("token")
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const songRes=await axios.get(
        `${BASE_URL}/api/playlists/aPlaylistSongs/${id}`,{headers}
      )
      const detailRes=await axios.get(
        `${BASE_URL}/api/playlists/playlistDetails/${id}`,{headers}
      )
      const allRes=await axios.get(
        `${BASE_URL}/api/songs/getAllSongs`,{headers}
      )
      setAllSongs(allRes.data)
      SetPlaylistSongs(songRes.data)
      SetPlaylistDetails(detailRes.data)
    }
    catch(err){
      console.log("API ERROR:", err.response?.data || err.message);
    }
  }

  const handleAddSong=async(s_id)=>{
    const token=localStorage.getItem("token")
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    await axios.post(
        `${BASE_URL}/api/playlists/addSong`,{song_id:s_id,playlist_id:id},{headers}
      )
    fetchData()
    console.log(playListSongs.length)
  }
  const handleDeleteSong=async(s_id)=>{
    const token=localStorage.getItem("token")
      const headers = {
        Authorization: `Bearer ${token}`,
      };
    await axios.delete(
        `${BASE_URL}/api/playlists/removeSong`,{data: { song_id: s_id, playlist_id: id },headers}
      )
    fetchData()
    console.log(playListSongs.length)
  }

  useEffect(()=>{
    fetchData()
  },[id])
  return (
    <>
      <div className="playlist-page">
        <div className="playlist-header">
          <img
            src={`${BASE_URL}${playlistDetails?.image_url}`}
            alt="Cover"
            className="playlist-cover"
          />
          <div className="playlist-header-info">
            <span className="playlist-type" style={{color:"#d1cbcb"}}>Playlist</span>
            <h1 className="playlist-title" style={{color:"#d1cbcb"}}>{playlistDetails?.playlist_name}</h1>
            <div className="playlist-meta">
              <img
                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                alt="Profile"
                className="profile-pic"
              />
              <span className="username" style={{color:"#d1cbcb"}}>{playlistDetails?.user_name}</span>
              <span className="dot" style={{color:"#d1cbcb"}}>•</span>
              <span className="song-count">{`${playListSongs.length} songs`}</span>
            </div>
            <p style={{color:"#d1cbcb"}}>{playlistDetails?.description}</p>
          </div>
        </div>

        <div className="tracklist">
          <div className="tracklist-header">
            <div className="col-id">#</div>
            <div className="col-title">Title</div>
            <div className="col-album">Album</div>
          </div>

          {<div className="tracklist-rows">
            {playListSongs.map((track, index) => (
              <div className="track-row" key={track.song_id} onClick={() => playTrack(track)}>
                <div className="col-id">{index + 1}</div>

                <div className="col-title track-title-cell">
                  <img src={`${BASE_URL}${track.image_url}`} alt={track.song_name} />
                  <div className="track-name-artist">
                    <span className="track-name">{track.song_name}</span>
                    <span className="track-artist">{track.artist_name}</span>
                  </div>
                </div>

                <div className="col-album">{track.album_name}</div>
                <button className="delete-playlist" 
                onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                handleDeleteSong(track.song_id)}}>🗑️</button>
                <h4></h4>
              </div>
            ))}
            <h2>Add songs:</h2>
            <div className="quick-access-grid">
        {
          Array.isArray(AllSongs) &&
          AllSongs.map((song) => (
            <div key={song.song_id} className="quick-card" onClick={() => playTrack(song)}>
              <img
                src={
                  `${BASE_URL}${song.image_url}`
                }
                alt={song.song_name}
              />
              <h4>{song.song_name}</h4>
              <button className="delete-playlist add-song-to-play"
              onClick={(e)=>{
                e.preventDefault();
                e.stopPropagation();
                handleAddSong(song.song_id)
              }}>➕</button>
            </div>
          ))
          }
      </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Playlist;

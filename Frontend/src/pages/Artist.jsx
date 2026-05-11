import { useState,useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import LikeButton from "../components/LikeButton";
import Row from "../components/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { FollowContext } from "../context/FollowContext";

const BASE_URL = "http://localhost:5001";
function Artist() {
  const navigate=useNavigate()
  const { id } = useParams();
  const artistId = Number(id);
  const { playTrack } = usePlayer();
  const [ArtistSongs,setSongs]=useState([])
  const [ArtistAlbums, setAlbums] = useState([]);
  const [artistDetail,setDetails] = useState(null);
  useEffect(()=>{
    const fetchData=async()=>{
      try
      {
        const token=localStorage.getItem("token")
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const songRes=await axios.get(
          `${BASE_URL}/api/songs/songByArtist/${id}`,{headers}
        )
        const albumRes=await axios.get(
          `${BASE_URL}/api/albums/artistAlbum/${id}`,{headers}
        )
        const detailRes=await axios.get(
          `${BASE_URL}/api/artists/ArtistDetail/${id}`,{headers}
        )
        setSongs(songRes.data)
        setAlbums(albumRes.data)
        setDetails(detailRes.data)
      }
      catch (err)
      {
        console.log("API ERROR:", err.response?.data || err.message);
      }
    }
    fetchData()
  },[id])
  

  const {followedArtists, setFollowedArtists} = useContext(FollowContext);
  const safeFollowedArtists = Array.isArray(followedArtists)
  ? followedArtists.map(Number)
  : [];
  const toggleFollow = async (targetId) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const isFollowed = safeFollowedArtists.includes(targetId);
      if (isFollowed) {
        await axios.delete(`${BASE_URL}/api/artists/unfollowArtist/${targetId}`, { headers });
        setFollowedArtists((prev) =>
          prev.filter((id) => id !== targetId)
        );
      } 
      else {
        await axios.post(
          `${BASE_URL}/api/artists/followArtist/${targetId}`,{},{ headers }
        );
        setFollowedArtists((prev) => [...prev, targetId]);
      }
    } 
    catch (err){
      console.log("API ERROR:", err.response?.data || err.message);
    }
  };
  return (
    <>
      <div className="artist-page">
        {/* 1. Hero Banner */}
        <div
          className="artist-hero"
          style={{
            backgroundImage: `url('${BASE_URL}${artistDetail?.image_url}')`,
            backgroundSize: "contain",     // 👈 poori image dikhe
            backgroundRepeat: "no-repeat", // 👈 repeat band
            backgroundPosition: "center",
          }}
        >
          <div className="artist-hero-content">
            <span className="verified">
              <span className="material-symbols-outlined">verified</span>
              Verified Artist
            </span>
            <h2 className="artist-title">{artistDetail?.artist_name}</h2>
            <p style={{color:"white",width:"500px"}}>{artistDetail?.about}</p>
          </div>
        </div>

        {/* 2. Action Bar */}
        <div className="artist-actions">
          <button className="play-btn-large" title="Play">
            <svg viewBox="0 0 24 24" fill="black" width="24" height="24">
              <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>

          <button
            className="follow-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollow(artistId);
            }}
          >
            {safeFollowedArtists.includes(artistId) ? "Following" : "Follow"}
          </button>

          <button className="more-btn">•••</button>
        </div>

        {/* 3. Popular Tracks */}
        <div className="popular-section">
          <h2>Songs</h2>
          <div className="popular-tracks">
            {ArtistSongs.map((track, index) => (
              <div className="popular-row" key={track.song_id} onClick={() => playTrack(track)}>
                <div className="col-id">{index + 1}</div>
                <div className="col-title track-title-cell">
                  <img src={`${BASE_URL}${track.image_url}`} alt={track.song_name} />
                  <span className="track-name">{track.song_name}</span>
                </div>
                <div className="col-plays">{track.plays}</div>
                <div className="col-time">{String(Math.floor(track.duration / 60))}:{String(track.duration % 60).padStart(2, "0")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Albums Row */}
        <Row title="Albums">
          {ArtistAlbums.length!=0 ?
          ArtistAlbums.map((album) => (
            <div className="album-card" title={album.album_name} key={album.album_id } onClick={() => {navigate(`/album/${album.album_id}`);}}>
              <div className="album-img-container">
                <img src={`${BASE_URL}${album.album_image_url}`} alt={album.album_name} className="artist_image" />
                <button className="card-play-btn">
                  <svg viewBox="0 0 24 24" fill="black" width="16" height="16">
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h4>{album.album_name}</h4>
              <p>Album</p>
            </div>
          )):
          <p>This artist has no albums!</p>}
        </Row>
      </div>
    </>
  );
}

export default Artist;

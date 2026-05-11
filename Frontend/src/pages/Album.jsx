import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState,useEffect } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

const BASE_URL = "http://localhost:5001";

function Album() {
    const { id } = useParams();
    
    const [albumSongs,setSongs]=useState([])
    const [albumDetails,setDetails]=useState(null)
    const { playTrack } = usePlayer();

    useEffect(()=>{
        const fetchData=async()=>{
        try
        {
            const token=localStorage.getItem("token")
            const headers = {
            Authorization: `Bearer ${token}`,
            };
            const songRes=await axios.get(
            `${BASE_URL}/api/albums/albumSongs/${id}`,{headers}
            )
            const detailRes=await axios.get(
            `${BASE_URL}/api/albums/albumDetails/${id}`,{headers}
            )
            setSongs(songRes.data)
            setDetails(detailRes.data)
    //         setAlbums(albumRes.data)
    //         setDetails(detailRes.data)
        }
        catch (err)
        {
            console.log("API ERROR:", err.response?.data || err.message);
        }
        }
        fetchData()
    },[id])
    
    const albumData = {
        title: "AM",
        artist: "Arctic Monkeys",
        year: "2013",
        songCount: "12 songs",
        duration: "41 min 47 sec",

        coverImg: "https://via.placeholder.com/232x232/121212/ffffff?text=AM+Cover",
    };

    const gridStyle = {
        gridTemplateColumns: "40px minmax(200px, 1fr) 200px 60px",
    };

    return (
        <>
        <div
            className="playlist-page"
            style={{
            background: "linear-gradient(to bottom, #4a4a4a 0%, #121212 400px)",
            }}
        >
            <div className="playlist-header">
            <img
                src={`${BASE_URL}${albumDetails?.album_image_url}`}
                alt={albumData.album_name}
                className="playlist-cover"
            />
            <div className="playlist-header-info">
                <span className="playlist-type" style={{color:"#d1cbcb"}}>Album</span>
                <h1 className="playlist-title" style={{color:"#d1cbcb"}}>{albumDetails?.album_name}</h1>
                <div className="playlist-meta">
                <img
                    src={`${BASE_URL}${albumDetails?.artist_image_url}`}
                    alt="Artist Profile"
                    className="profile-pic"
                />
                <span className="username" style={{color:"#d1cbcb"}}>{albumDetails?.artist_name}</span>
                <span className="dot">•</span>
                <span style={{color:"#d1cbcb"}}>
                    {albumDetails?.total_songs} songs
                    <span className="dot">•</span>
                    <span style={{ color: "#b3b3b3" }}>{String(Math.floor(Number(albumDetails?.total_duration) / 60)).padStart(2, "0")} mins {String(Number(albumDetails?.total_duration) % 60).padStart(2, "0")} secs</span>
                </span>
                </div>
            </div>
            </div>

            <div className="playlist-actions" style={{ gap: "24px" }}>
            <button className="play-btn-large" title="Play">
                <svg viewBox="0 0 24 24" fill="black" width="28" height="28">
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                </svg>
            </button>
            </div>

            <div className="tracklist">
            {/* Header Row */}
            <div className="tracklist-header" style={gridStyle}>
                <div className="col-id">#</div>
                <div className="col-title">Title</div>
                <div className="col-time" style={{ textAlign: "right" }}>
                <div>Duration</div>
                </div>
            </div>

            <div className="tracklist-rows">
                {albumSongs.map((track, index) => (
                <div
                    className="track-row"
                    key={track.song_id}
                    style={gridStyle}
                    onClick={() => {
                        playTrack(track);
                    }}
                >
                    <div className="col-id">{index + 1}</div>

                    <div className="col-title track-title-cell">
                    <img
                        src={`${BASE_URL}${track.image_url}`}
                        alt={track.song_name}
                        className="track-img"
                    />    
                <div className="track-name-artist">
                        <span className="track-name">{track.song_name}</span>
                        <span className="track-artist">{track.artist_name}</span>
                    </div>
                    </div>

                    <div
                    className="col-time"
                    style={{ textAlign: "right", color: "#b3b3b3" }}
                    >
                    {String(Math.floor(track.duration / 60)).padStart(2, "0")}:{String(track.duration % 60).padStart(2, "0")}
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </>
    );
}

export default Album;

import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import LikeButton from "../components/LikeButton";
import Row from "../components/Row";
import { usePlayer } from "../context/PlayerContext";
import track505 from "../assets/Arctic Monkeys- 505.mp3";

function Artist() {
  const { id } = useParams();
  const { setCurrentSong, setIsPlaying } = usePlayer();
  const navigate = useNavigate();

  const popularTracks = [
    {
      id: 1,
      title: "I Wanna Be Yours",
      plays: "3,751,311,401",
      duration: "3:03",
      img: "https://via.placeholder.com/40",
      audio: track505, // Our test audio!
    },
    {
      id: 2,
      title: "505",
      plays: "2,798,401,892",
      duration: "4:13",
      img: "https://via.placeholder.com/40",
      audio: track505, // Our test audio!
    },
    {
      id: 3,
      title: "Do I Wanna Know?",
      plays: "2,965,098,114",
      duration: "4:32",
      img: "https://via.placeholder.com/40",
      audio: track505, // Our test audio!
    },
  ];

  const albums = [
    {
      id: 1,
      title: "The Car",
      year: "2022",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Live at the Royal Albert Hall",
      year: "2020",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Tranquility Base Hotel & Casino",
      year: "2018",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "AM",
      year: "2013",
      img: "https://via.placeholder.com/150",
    },
  ];

  const [followed, setFollowed] = useState([]);

  const toggleFollow = (targetId) => {
    if (followed.includes(targetId)) {
      setFollowed(followed.filter((item) => item !== targetId));
    } else {
      setFollowed([...followed, targetId]);
    }
  };

  return (
    <Layout>
      <div className="artist-page">
        {/* 1. Hero Banner */}
        <div
          className="artist-hero"
          style={{
            backgroundImage: `url('https://via.placeholder.com/1200x400/333333/ffffff?text=Arctic+Monkeys+Banner')`,
          }}
        >
          <div className="artist-hero-content">
            <span className="verified">
              <span className="material-symbols-outlined">verified</span>
              Verified Artist
            </span>
            <h1 className="artist-title">Arctic Monkeys</h1>
          </div>
        </div>

        {/* 2. Action Bar */}
        <div className="artist-actions">
          <button className="play-btn-large" title="Play">
            <svg viewBox="0 0 24 24" fill="black" width="24" height="24">
              <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>

          <LikeButton
            className="follow-btn"
            followed={followed.includes(id)}
            onFollow={toggleFollow}
            type="artist"
            id={id}
          />

          <button className="more-btn">•••</button>
        </div>

        {/* 3. Popular Tracks */}
        <div className="popular-section">
          <h2>Popular</h2>
          <div className="popular-tracks">
            {popularTracks.map((track, index) => (
              <div
                className="popular-row"
                key={track.id}
                onClick={() => {
                  setCurrentSong({
                    id: track.id,
                    title: track.title,
                    artist: "Arctic Monkeys",
                    img: track.img,
                    audio: track.audio, // Our test audio!
                  });
                  setIsPlaying(true);
                }}
              >
                <div className="col-id">{index + 1}</div>
                <div className="col-title track-title-cell">
                  <img src={track.img} alt={track.title} />
                  <span className="track-name">{track.title}</span>
                </div>
                <div className="col-plays">{track.plays}</div>
                <div className="col-time">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Albums Row */}
        <Row title="Albums">
          {albums.map((album) => (
            <div
              className="album-card"
              key={album.id}
              onClick={() => {
                navigate(`/album/${id}`);
              }}
            >
              <div className="album-img-container">
                <img src={album.img} alt={album.title} />
                <button className="card-play-btn">
                  <svg viewBox="0 0 24 24" fill="black" width="16" height="16">
                    <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                  </svg>
                </button>
              </div>
              <h4>{album.title}</h4>
              <p>{album.year} • Album</p>
            </div>
          ))}
        </Row>
      </div>
    </Layout>
  );
}

export default Artist;

import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { usePlayer } from "../context/PlayerContext";

function Album() {
  const { id } = useParams();
  const { setCurrentSong, setIsPlaying } = usePlayer();

  const albumData = {
    title: "AM",
    artist: "Arctic Monkeys",
    year: "2013",
    songCount: "12 songs",
    duration: "41 min 47 sec",

    coverImg: "https://via.placeholder.com/232x232/121212/ffffff?text=AM+Cover",
  };

  const tracks = [
    {
      id: 1,
      title: "Do I Wanna Know?",
      duration: "4:32",
    },
    {
      id: 2,
      title: "R U Mine?",
      duration: "3:21",
    },
    {
      id: 3,
      title: "One For The Road",
      duration: "3:26",
    },
    {
      id: 4,
      title: "Arabella",
      duration: "3:27",
    },
  ];

  const gridStyle = {
    gridTemplateColumns: "40px minmax(200px, 1fr) 200px 60px",
  };

  return (
    <Layout>
      <div
        className="playlist-page"
        style={{
          background: "linear-gradient(to bottom, #4a4a4a 0%, #121212 400px)",
        }}
      >
        <div className="playlist-header">
          <img
            src={albumData.coverImg}
            alt={albumData.title}
            className="playlist-cover"
          />
          <div className="playlist-header-info">
            <span className="playlist-type">Album</span>
            <h1 className="playlist-title">{albumData.title}</h1>
            <div className="playlist-meta">
              <img
                src="https://via.placeholder.com/24"
                alt="Artist Profile"
                className="profile-pic"
              />
              <span className="username">{albumData.artist}</span>
              <span className="dot">•</span>
              <span>{albumData.year}</span>
              <span className="dot">•</span>
              <span>
                {albumData.songCount},{" "}
                <span style={{ color: "#b3b3b3" }}>{albumData.duration}</span>
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
              </svg>
            </div>
          </div>

          <div className="tracklist-rows">
            {tracks.map((track, index) => (
              <div
                className="track-row"
                key={track.id}
                style={gridStyle}
                onClick={() => {
                  setCurrentSong({
                    id: track.id,
                    title: track.title,
                    artist: albumData.artist,
                    img: albumData.coverImg,
                    audio: "",
                  });
                  setIsPlaying(true);
                }}
              >
                <div className="col-id">{index + 1}</div>

                <div className="col-title track-title-cell">
                  <div className="track-name-artist">
                    <span className="track-name">{track.title}</span>
                    <span className="track-artist">{albumData.artist}</span>
                  </div>
                </div>

                <div
                  className="col-time"
                  style={{ textAlign: "right", color: "#b3b3b3" }}
                >
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Album;

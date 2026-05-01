import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

function Playlist() {
  const { id } = useParams();

  const tracks = [
    {
      id: 1,
      title: "Cheap Thrills (feat. Sean Paul)",
      artist: "Sia, Sean Paul",
      album: "This Is Acting",
      date: "Feb 24, 2021",
      duration: "3:45",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      title: "Best Song Ever",
      artist: "One Direction",
      album: "Midnight Memories",
      date: "Feb 24, 2021",
      duration: "3:20",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      title: "I Don't Wanna Live Forever",
      artist: "ZAYN, Taylor Swift",
      album: "Fifty Shades Darker",
      date: "Feb 24, 2021",
      duration: "4:06",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      title: "i hate u, i love u (feat. olivia o'brien)",
      artist: "gnash, Olivia O'Brien",
      album: "us",
      date: "Feb 24, 2021",
      duration: "4:11",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      title: "Let Me Love You",
      artist: "DJ Snake, Justin Bieber",
      album: "Encore",
      date: "Feb 24, 2021",
      duration: "3:26",
      img: "https://via.placeholder.com/40",
    },
  ];

  return (
    <Layout>
      <div className="playlist-page">
        <div className="playlist-header">
          <img
            src="https://via.placeholder.com/232"
            alt="Cover"
            className="playlist-cover"
          />
          <div className="playlist-header-info">
            <span className="playlist-type">Playlist</span>
            <h1 className="playlist-title">English</h1>
            <div className="playlist-meta">
              <img
                src="https://via.placeholder.com/24"
                alt="Profile"
                className="profile-pic"
              />
              <span className="username">Sarim</span>
              <span className="dot">•</span>
              <span className="song-count">382 songs</span>
            </div>
          </div>
        </div>

        <div className="playlist-actions">
          <button className="play-btn-large" title="Play">
            <svg viewBox="0 0 24 24" fill="black" width="24" height="24">
              <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>
        </div>

        <div className="tracklist">
          <div className="tracklist-header">
            <div className="col-id">#</div>
            <div className="col-title">Title</div>
            <div className="col-album">Album</div>
            <div className="col-time">
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
              <div className="track-row" key={track.id}>
                <div className="col-id">{index + 1}</div>

                <div className="col-title track-title-cell">
                  <img src={track.img} alt={track.title} />
                  <div className="track-name-artist">
                    <span className="track-name">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                </div>

                <div className="col-album">{track.album}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Playlist;

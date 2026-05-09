import Layout from "../components/Layout";

function Liked() {
  const filters = [
    "Quiet",
    "Pop",
    "Energetic",
    "Slow",
    "Mellow",
    "Soft",
    "Moody",
    "Calm",
    "Cozy",
    "Love",
    "Emotional",
  ];

  const likedTracks = [
    {
      id: 1,
      title: "Lush Life",
      artist: "Zara Larsson",
      album: "So Good",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      title: "death bed, Pt. 2",
      artist: "Powfu, Daniel Saint, Chill Sebs",
      album: "tell me your feelings and i won't tell you mine",
      img: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      title: "death bed (coffee for your head)",
      artist: "Powfu, beabadoobee",
      album: "poems of the past",
      img: "https://via.placeholder.com/40",
    },
  ];

  return (
    <Layout>
      <div className="liked-page">
        {/* 1. Hero Header */}
        <div className="playlist-header">
          {/* Custom CSS gradient block with a heart instead of an image */}
          <div className="liked-cover-art">
            <svg viewBox="0 0 24 24" fill="white" width="64" height="64">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
          </div>
          <div className="playlist-header-info">
            <span className="playlist-type">Playlist</span>
            <h1 className="playlist-title">Liked Songs</h1>
            <div className="playlist-meta">
              <img
                src="https://via.placeholder.com/24"
                alt="Profile"
                className="profile-pic"
              />
              <span className="username">sarim</span>
              <span className="dot">•</span>
              <span className="song-count">93 songs</span>
            </div>
          </div>
        </div>

        {/* 2. Action Bar */}
        <div className="playlist-actions">
          <button className="play-btn-large" title="Play">
            <svg viewBox="0 0 24 24" fill="black" width="24" height="24">
              <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>
        </div>

        <div className="tracklist">
          {/* Header Row */}
          <div className="liked-track-grid tracklist-header">
            <div className="col-id">#</div>
            <div className="col-title">Title</div>
            <div className="col-album">Album</div>
          </div>

          {/* Songs Map */}
          <div className="tracklist-rows">
            {likedTracks.map((track, index) => (
              <div className="liked-track-grid track-row" key={track.id}>
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

export default Liked;

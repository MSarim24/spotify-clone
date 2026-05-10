import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { usePlayer } from "../context/PlayerContext";
import LikeButton from "../components/LikeButton";

function Search() {
  // Grab the "q" parameter from the URL (e.g., /search?q=hello)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const { setCurrentSong, setIsPlaying, likedSongs, toggleLike } = usePlayer();

  // Our temporary dummy database to search through
  const allTracks = [
    {
      id: 1,
      title: "Do I Wanna Know?",
      artist: "Arctic Monkeys",
      duration: "4:32",
      img: "https://via.placeholder.com/50/121212/ffffff?text=AM",
    },
    {
      id: 2,
      title: "Starboy",
      artist: "The Weeknd",
      duration: "3:50",
      img: "https://via.placeholder.com/50/ff0000/ffffff?text=SB",
    },
    {
      id: 3,
      title: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      img: "https://via.placeholder.com/50/ff0000/ffffff?text=BL",
    },
    {
      id: 4,
      title: "505",
      artist: "Arctic Monkeys",
      duration: "4:13",
      img: "https://via.placeholder.com/50/121212/ffffff?text=FWN",
    },
    {
      id: 5,
      title: "As It Was",
      artist: "Harry Styles",
      duration: "2:47",
      img: "https://via.placeholder.com/50/0000ff/ffffff?text=HS",
    },
  ];

  // THE MAGIC: Filter the tracks based on the search query
  const filteredTracks = allTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query),
  );

  return (
    <Layout>
      <div className="playlist-page" style={{ padding: "24px" }}>
        <h2 style={{ color: "white", marginBottom: "24px" }}>
          Search results for "{searchParams.get("q")}"
        </h2>

        {filteredTracks.length === 0 ? (
          <p style={{ color: "#b3b3b3" }}>
            No results found. Try a different spelling or artist.
          </p>
        ) : (
          <div className="tracklist-rows">
            {filteredTracks.map((track, index) => (
              <div
                className="track-row"
                key={track.id}
                style={{ gridTemplateColumns: "40px minmax(200px, 1fr) 60px" }}
                onClick={() => {
                  setCurrentSong({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    img: track.img,
                    audio: "", // Leave blank until we hook up the backend
                  });
                  setIsPlaying(true);
                }}
              >
                <div className="col-id">{index + 1}</div>

                <div className="col-title track-title-cell">
                  <img
                    src={track.img}
                    alt={track.title}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "4px",
                    }}
                  />
                  <div className="track-name-artist">
                    <span className="track-name">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                </div>

                <div
                  className="col-time"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: "flex-end",
                  }}
                >
                  <LikeButton
                    type="song"
                    id={track.id}
                    liked={likedSongs.includes(track.id)}
                    onLike={toggleLike}
                  />
                  <span style={{ color: "#b3b3b3" }}>{track.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Search;

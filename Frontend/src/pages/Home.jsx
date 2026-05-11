import Layout from "../components/Layout";
import axios from "axios";
import Row from "../components/Row";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

function Home() {
  const [quickAccess, setQuickAccess] = useState([]);
  const [oldSongs, setOldSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const { playTrack } = usePlayer();

  const BASE_URL = "http://localhost:5001";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        //Recent Songs
        const recentRes = await axios.get(
          `${BASE_URL}/api/songs/getRecentSongs`,
          { headers }
        );
        //OldSongs
        const oldSongsRes = await axios.get(
          `${BASE_URL}/api/songs/getOldSongs`,
          { headers }
        );
        //Artists
        const artistRes = await axios.get(
          `${BASE_URL}/api/artists/recentArtist`,
          { headers }
        );
        setQuickAccess(recentRes.data || []);
        setOldSongs(oldSongsRes.data || []);
        setArtists(artistRes.data || []);
      }
      catch (err) {
        console.log("API ERROR:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="quick-access-grid">
        {
          Array.isArray(quickAccess) ?
          quickAccess.map((song) => (
            <div key={song.song_id} className="quick-card" onClick={() => playTrack(song)}>
              <img
                src={
                  song.image_url && `${BASE_URL}${song.image_url}`
                }
                alt={song.song_name}
              />
              <h4>{song.song_name}</h4>
            </div>
          )):
          <p className="error-message">{quickAccess.message}</p>
          }
      </div>
      <Row title="Jump back in">
        {Array.isArray(oldSongs) ?
          oldSongs.map((song) => (
            <Card
              key={song.song_id}
              id={song.song_id}
              type="song"
              title={song.song_name}
              text={song.song_name}
              subtitle={"Song"}
              image={
                song.image_url && `${BASE_URL}${song.image_url}`
              }
              track={song}
            />
          )):
          <p className="error-message">{oldSongs.message}</p>
          }
      </Row>
      <Row title="Artists">
        {Array.isArray(artists) ?
          artists.map((a) => {
            const name = a.artist_lname
              ? `${a.artist_fname} ${a.artist_lname}`
              : a.artist_fname;

            return (
              <Card
                key={a.artist_id}
                id={a.artist_id}
                type="artist"
                title={name}
                text={name}
                subtitle="Artist"
                image={a.image_url && `${BASE_URL}${a.image_url}`}
              />
            );
          }):
          <p className="error-message">{artists.message}</p>
          }
      </Row>

    </>
  );
}

export default Home;
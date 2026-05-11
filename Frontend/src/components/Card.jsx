import { useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
function Card({ title, subtitle, image, type, id, text,track }) {
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const handleClick = () => {
    if (type === "artist") navigate(`/artist/${id}`);
    if (type === "playlist") navigate(`/playlist/${id}`);
    if (type === "song") {playTrack(track)};
  };

  return (
    <div className="card album-card" title={text} onClick={handleClick}>
      <img src={image} alt={title} className="artist_image" />
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}

export default Card;

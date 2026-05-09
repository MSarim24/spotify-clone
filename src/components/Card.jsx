import { useNavigate } from "react-router-dom";

function Card({ title, subtitle, image, type, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "artist") navigate(`/artist/${id}`);
    if (type === "playlist") navigate(`/playlist/${id}`);
    if (type === "album") navigate(`/album/${id}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}

export default Card;

function LikeButton({
  type,
  id,
  liked,
  followed,
  onLike,
  onFollow,
  className,
}) {
  const handleLike = (e) => {
    e.stopPropagation();
    onLike(id);
  };

  const handleFollow = (e) => {
    e.stopPropagation();
    onFollow(id);
  };

  return (
    <>
      {type === "artist" ? (
        // We pass the className down to the actual button
        <button className={className} onClick={handleFollow}>
          {followed ? "Following" : "Follow"}
        </button>
      ) : type === "song" ? (
        <button className={className} onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
      ) : null}
    </>
  );
}

export default LikeButton;

import axios from "axios";
import { useEffect, useState } from "react";
import { useLikedRefresh } from "../context/LikedContext";
import { FollowContext } from "../context/FollowContext";
import { useContext } from "react";

const BASE_URL = "http://localhost:5001";

function LikeButton({ type, id, onLike, onFollow, className }) {
  const [likedState, setLikedState] = useState(false);
  const { triggerRefresh: triggerLikedRefresh } = useLikedRefresh();
  const { triggerRefresh: triggerFollowRefresh } = useContext(FollowContext);

  const fetchLiked = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${BASE_URL}/api/liked/getLikedById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikedState(res.data?.isliked ?? false);
    } catch (err) {
      console.log("Error fetching liked status:", err);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const newState = !likedState;
    setLikedState(newState);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (newState) {
        await axios.post(
          `${BASE_URL}/api/liked/likeSong/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else {
        await axios.delete(`${BASE_URL}/api/liked/unLikeSong/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      triggerLikedRefresh();
      onLike?.(id);
    } catch (err) {
      setLikedState(!newState);
      console.log("Like/unlike failed:", err);
    }
  };

  const handleFollow = async (e) => {
    e.stopPropagation();
    // onFollow is expected to perform the actual follow/unfollow API call.
    // It may return a promise. We await it and then trigger refresh.
    try {
      if (onFollow) {
        await onFollow(id);
      }
      triggerFollowRefresh(); // refresh sidebar after follow/unfollow completes
    } catch (err) {
      console.log("Follow/unfollow error:", err);
    }
  };

  useEffect(() => {
    fetchLiked();
  }, [id]);

  if (type === "artist") {
    return (
      <button className={className} onClick={handleFollow}>
        {likedState ? "Following" : "Follow"}
      </button>
    );
  }

  if (type === "song") {
    return (
      <button className={className} onClick={handleLike}>
        {likedState ? "❤️" : "🤍"}
      </button>
    );
  }

  return null;
}

export default LikeButton;

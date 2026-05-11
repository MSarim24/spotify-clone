import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5001";

export const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
  const [followedArtists, setFollowedArtists] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const triggerRefresh = () => {
    setRefreshCounter((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const headers = { Authorization: `Bearer ${token}` };
        const followRes = await axios.get(
          `${BASE_URL}/api/artists/followedArtist`,
          { headers },
        );
        const idList = followRes.data?.map((i) => i.artist_id) || [];
        setFollowedArtists(idList);
      } catch (err) {
        console.log("API ERROR:", err.response?.data || err.message);
      }
    };
    fetchData();
  }, [refreshCounter]); // re‑fetch when refreshCounter changes

  return (
    <FollowContext.Provider
      value={{
        followedArtists,
        setFollowedArtists,
        triggerRefresh,
        refreshCounter,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

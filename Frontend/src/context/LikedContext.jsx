import { createContext, useContext, useState } from "react";

const LikedContext = createContext();

export function LikedProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <LikedContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </LikedContext.Provider>
  );
}

export function useLikedRefresh() {
  return useContext(LikedContext);
}

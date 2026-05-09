import Sidebar from "./sidebar";
import Player from "./player";
import TopBar from "./TopBar";
import Login from "./Login";
import { useState } from "react";

function Layout({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar />

      <div className="main-wrapper">
        <TopBar onOpenLogin={() => setIsLoginOpen(true)} />
        <div className="main-content">{children}</div>
      </div>

      <Player />
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
}

export default Layout;

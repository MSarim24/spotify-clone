import Sidebar from "./sidebar";
import Player from "./player";
import TopBar from "./TopBar";

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />

      <div className="main-wrapper">
        <TopBar />
        <div className="main-content">{children}</div>
      </div>

      <Player />
    </div>
  );
}

export default Layout;

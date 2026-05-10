import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Liked from "./pages/Liked";
import Album from "./pages/Album";
import Search from "./pages/Search";
import Login from "./components/Login";
import Layout from "./components/Layout";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {!token ? (
        <div style={{ backgroundColor: "#000", height: "100vh" }}>
          <Login onClose={() => {}} isClosable={false} />
        </div>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/liked" element={<Liked />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import Liked from "./pages/Liked";
import Album from "./pages/Album";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

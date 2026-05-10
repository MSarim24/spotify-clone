import { Link, useNavigate } from "react-router-dom";

function TopBar({ onOpenLogin }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="topbar">
      <div className="topbar-nav">
        <button
          className="nav-arrow"
          title="Go back"
          onClick={() => navigate(-1)}
        >
          {"<"}
        </button>
        <button
          className="nav-arrow"
          title="Go forward"
          onClick={() => navigate(1)}
        >
          {">"}
        </button>
      </div>

      <div className="topbar-center">
        <Link to="/" className="home-btn" title="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12.5 3.248a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.329z"></path>
          </svg>
        </Link>
        <div className="search-bar">
          <span className="search-icon">
            <span class="material-symbols-outlined">search</span>
          </span>
          <input
            type="text"
            placeholder="What do you want to play?"
            style={{
              border: "none",
              background: "transparent",
              color: "white",
              width: "100%",
              outline: "none",
              fontSize: "14px",
            }}
            onChange={(e) => {
              const query = e.target.value;
              if (query.trim() === "") {
                navigate("/");
              } else {
                navigate(`/search?q=${query}`);
              }
            }}
          />
        </div>
      </div>

      <div className="topbar-right">
        {token ? (
          <button
            className="login-btn"
            onClick={handleLogout}
            style={{
              backgroundColor: "#282828",
              color: "white",
              border: "1px solid #727272",
            }}
          >
            Log out
          </button>
        ) : (
          <button className="login-btn" onClick={onOpenLogin}>
            Log in
          </button>
        )}
      </div>
    </div>
  );
}

export default TopBar;

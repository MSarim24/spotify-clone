import Signup from "./Signup";
import { useState } from "react";
import axios from "axios";

function Login({ onClose, isClosable = true }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        },
      );
      localStorage.setItem("token", response.data.token);
      onClose();
      window.location.reload();
    } catch (err) {
      const backendMessage = err.response?.data?.message || "Login failed";
      setError(backendMessage);
    }
  };

  return (
    <div className="modal-overlay" onClick={isClosable ? onClose : undefined}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isClosable && (
          <button className="modal-close" onClick={onClose} title="Close">
            ✕
          </button>
        )}
        <div className="modal-header">
          {/* Spotify-style Logo SVG */}
          <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.625.625 0 0 1-.858.205c-2.348-1.435-5.3-1.76-8.783-.966a.624.624 0 1 1-.29-1.215c3.81-.87 7.076-.505 9.726 1.118a.625.625 0 0 1 .205.858zm1.22-2.735a.78.78 0 0 1-1.074.258c-2.684-1.65-6.784-2.126-9.965-1.163a.782.782 0 1 1-.453-1.498c3.626-1.1 8.332-.564 11.45 1.353a.78.78 0 0 1 .042 1.05zm.11-2.855c-3.216-1.91-8.522-2.086-11.593-1.155a.938.938 0 1 1-.54-1.796c3.54-1.076 9.42-.87 13.11 1.325a.938.938 0 1 1-.977 1.626z"></path>
          </svg>
          <h1>Welcome back</h1>
        </div>

        {error && (
          <div
            style={{
              color: "#f15e6c",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {error}
          </div>
        )}
        <form className="modal-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="modal-submit-btn">
            Continue
          </button>
        </form>

        <div className="modal-footer">
          <p>Don't have an account?</p>
          <button className="signup-link" onClick={() => setIsSignupOpen(true)}>
            Sign up
          </button>

          {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

export default Login;

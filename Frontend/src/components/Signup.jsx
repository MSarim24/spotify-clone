import { useState } from "react";
import axios from "axios";

function Signup({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          user_name: username,
          email,
          password,
        },
      );
      alert("Signup successful! You can now log in.");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          ✕
        </button>
        <div className="modal-header">
          <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.625.625 0 0 1-.858.205c-2.348-1.435-5.3-1.76-8.783-.966a.624.624 0 1 1-.29-1.215c3.81-.87 7.076-.505 9.726 1.118a.625.625 0 0 1 .205.858zm1.22-2.735a.78.78 0 0 1-1.074.258c-2.684-1.65-6.784-2.126-9.965-1.163a.782.782 0 1 1-.453-1.498c3.626-1.1 8.332-.564 11.45 1.353a.78.78 0 0 1 .042 1.05zm.11-2.855c-3.216-1.91-8.522-2.086-11.593-1.155a.938.938 0 1 1-.54-1.796c3.54-1.076 9.42-.87 13.11 1.325a.938.938 0 1 1-.977 1.626z"></path>
          </svg>
          <h1>Welcome to spotify</h1>
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
        <form className="modal-form" onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="modal-submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx'
import { FollowProvider } from './context/FollowContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FollowProvider>
    <PlayerProvider>
    <App />
    </PlayerProvider>
    </FollowProvider>
  </StrictMode>,
)

import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './app/Layout'
import { PlayerProfilePage } from './pages/PlayerProfilePage'
import { PlayersPage } from './pages/PlayersPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PlayersPage />} />
        <Route path="/players/:playerId" element={<PlayerProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App

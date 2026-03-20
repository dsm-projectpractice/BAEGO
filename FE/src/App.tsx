import { Routes, Route, Navigate } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext'
import SplashPage from './pages/SplashPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import MyPage from './pages/MyPage'

export default function App() {
  return (
    <div className="flex justify-center min-h-screen bg-[#E8E8E8]">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative overflow-x-hidden">
        <FavoritesProvider>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FavoritesProvider>
      </div>
    </div>
  )
}

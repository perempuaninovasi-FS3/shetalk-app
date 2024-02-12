import '../src/css/App.css';
import '../src/css/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProfileAhli from './pages/ProfileAhli';
import DetailPost from './pages/DetailPost';
import Sertifikat from './pages/Sertifikat';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/post/:slug' element={<DetailPost />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile-ahli' element={<ProfileAhli />} />
            <Route path='/sertifikat' element={<Sertifikat />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

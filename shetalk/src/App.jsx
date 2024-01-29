import './App.css';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DashboardAhli from './pages/DashboardAhli';
import ProfileAhli from './pages/ProfileAhli';
import DetailPost from './pages/DetailPost';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/detail-post' element={<DetailPost />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard-ahli' element={<DashboardAhli />} />
            <Route path='/profile-ahli' element={<ProfileAhli />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

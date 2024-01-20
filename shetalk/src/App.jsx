import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import CreateUserGeneral from './components/molecules/CreateUserGeneral';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/create-user-general" element={<CreateUserGeneral />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

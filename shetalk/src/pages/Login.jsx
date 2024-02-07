import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import background from '../assets/img/form-login.svg';
import icon from '../assets/img/login-icon.svg';
import Logo from '../components/atoms/Logo';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail('');
        setPassword('');
        navigate('/dashboard');
        alert('Berhasil Login !');
      }
    });
  };

  return (
    
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '130vh',
      }}
    >
      <div className="row">
        <div className="col-4 d-none d-lg-block" style={{ margin: '92px', marginTop: '200px' }}>
          <img src={icon} alt="Login Icon" />
        </div>
        <div
          className="col-md-4 mx-auto text-center p-4  "
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '24px',

            width: '320px',
            height: '400px',
            marginTop: '120px',
          }}
        >
          <Form onSubmit={handleLogin}>
            <div style={{ marginBottom: '60px' }}>
              <Logo />
            </div>
            <Form.Group controlId="email" className="mb-3">
              <Form.Control type="email" name="email" placeholder="email pengguna.." value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Control type="password" name="password" placeholder="kata sandi.." value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button
              className="btn-picks-avatar"
              style={{
                backgroundColor: '#43d7c2',
                border: 'none',
                marginBottom: '14px',
                marginTop: '60px',
                padding: '10px',
                width: '100%',
                transition: 'transform 0.3s',
              }}
              type="submit"
            >
              {loading ? 'Loading...' : 'Masuk'}
            </Button>
            {error && error.length > 0 && (
              <h6 className="" style={{ color: 'red', fontSize: '0.8rem' }}>
                {error}
              </h6>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import background from '../assets/img/form-login.svg';
import icon from '../assets/img/login-icon.svg';
import Logo from '../components/atoms/Logo'

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username.trim() === '' || formData.password.trim() === '') {
            alert('Mohon isi username dan password');
        } else {
            console.log('Data login:', formData);
        }
    };

    return (
        <div
            className="container-fluid"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                height: '100vh',
            }}
        >
            <div className="row" >
                <div className='col-4' style={{ margin: '92px', marginTop: '200px' }}>
                    <img src={icon} alt="Login Icon" />
                </div>
                <div
                    className="col-4 text-center"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '40px',
                        borderRadius: '8px',
                        margin: '100px',
                        marginTop: '120px'
                    }}
                >
                    <Form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '60px' }}><Logo /></div>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label></Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder='nama pengguna..'
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder='kata sandi..'
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Dropdown onSelect={(eventKey) => setFormData({ ...formData, role: eventKey })} className="mb-3" >
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" style={{ width: '100%' }} >
                                {formData.role === 'admin' ? 'Masuk sebagai Admin' : 'Masuk sebagai Ahli'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ width: '100%' }}>
                                <Dropdown.Item eventKey="ahli">Ahli</Dropdown.Item>
                                <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            className='btn-picks-avatar'
                            style={{
                                backgroundColor: '#43d7c2',
                                border: 'none',
                                marginBottom: '14px',
                                marginTop: '60px',
                                padding: '10px',
                                width: '100%',
                                transition: 'transform 0.3s',
                            }}>
                            Masuk
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;

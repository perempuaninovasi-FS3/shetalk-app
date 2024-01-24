import React from 'react';
import Logo from '../atoms/Logo';
import { dummyAvatar } from '../../assets';
import { Dropdown } from 'react-bootstrap';

const NavbarAhli = () => {
    return (
        <div className="d-flex justify-content-between align-items-center shadow-sm px-md-5 py-md-2 px-4 py-2 bg-body-tertiary rounded mb-4">
            <Logo />
            <div className="d-flex align-items-center">
                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                        style={{ background: 'none', border: 'none', color: '#FF6565' }}
                    >
                        <img
                            src={dummyAvatar}
                            alt="Profile"
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/certificates">Sertifikat</Dropdown.Item>
                        <Dropdown.Item href="#/logout">Keluar</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default NavbarAhli;

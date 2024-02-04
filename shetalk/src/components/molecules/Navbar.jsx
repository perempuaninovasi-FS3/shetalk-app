import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../atoms/Logo';
import { Dropdown } from 'react-bootstrap';
import { selectSelectedAvatar } from '../../redux/slice/avatarSlice';
import { getUser } from '../../utils/userUtils'
import { logoutUser } from '../../redux/slice/authSlice';

const Navbar = () => {
  const user = getUser();
  const selectedAvatar = useSelector(selectSelectedAvatar);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className="d-flex justify-content-between align-items-center shadow-sm px-md-5 py-md-2 px-4 py-2 bg-body-tertiary rounded mb-md-4 mb-2">
      <Logo />
      <div className="ml-auto d-flex align-items-center">
        {user ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-secondary"
              id="dropdown-basic"
              style={{ background: 'none', border: 'none', color: '#FF6565' }}
            >
              <img
                src={user.profile}
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={'/profile-ahli'}>Profile</Dropdown.Item>
              <Dropdown.Item href="#/certificates">Sertifikat</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout} href={'/login'}>Keluar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          selectedAvatar ? (
            <div className="ml-auto">
              <img
                src={selectedAvatar.avatar_img}
                alt="Selected Avatar"
                className="rounded-circle"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Navbar;

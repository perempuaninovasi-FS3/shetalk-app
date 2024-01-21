import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../atoms/Logo';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const selectedProfile = location.state?.selectedProfile;

  return (
    <div className="d-flex justify-content-between align-items-center shadow-sm  p-2 px-5 bg-body-tertiary rounded mb-4">
      <Logo />
      {/* <a href="#"> */}
      {selectedProfile && (
        <div>
          {/* <span className="me-3">{selectedProfile.username}</span> */}
          <img
            src={selectedProfile.profile}
            alt="Selected Profile"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        </div>
      )}
      {/* </a> */}
    </div>
  );
};

export default Navbar;

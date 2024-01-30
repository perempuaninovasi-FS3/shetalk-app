import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../atoms/Logo';
import { useLocation } from 'react-router-dom';
import { selectSelectedAvatar } from '../../redux/slice/avatarSlice';

const Navbar = () => {
  const location = useLocation();
  const selectedAvatar = useSelector(selectSelectedAvatar);

  return (
    <div className="d-flex justify-content-between align-items-center shadow-sm px-md-5 py-md-2 px-4 py-2 bg-body-tertiary rounded mb-md-4 mb-2">
      <Logo />
      {selectedAvatar && (
        <div className="ml-auto">
          <img
            src={selectedAvatar.avatar_img}
            alt="Selected Avatar"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;

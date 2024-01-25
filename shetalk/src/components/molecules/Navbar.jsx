import React from 'react';
import Logo from '../atoms/Logo';
import { dummyAvatar } from '../../assets';

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center shadow-sm  p-2 px-5 bg-body-tertiary rounded mb-4">
      <Logo />
      <a href="#">
        <img src={dummyAvatar} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </a>
    </div>
  );
};

export default Navbar;

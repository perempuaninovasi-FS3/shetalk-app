import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useLocation } from 'react-router-dom';

function NavMobile() {
  const [topicSelected, setTopicSelected] = useState(false);
  const navLinkStyle = {
    color: 'grey',
    textDecoration: 'none',
  };

  const location = useLocation();

  // Fungsi untuk menentukan apakah link aktif atau tidak
  const isActive = (filter) => {
    const urlParams = new URLSearchParams(location.search);
    const currentFilter = urlParams.get('filter');
    if (!filter) {
      return !currentFilter;
    }
    return currentFilter === filter;
  };

  return (
    <Nav variant="underline" defaultActiveKey="/dashboard" className="d-md-none justify-content-center h-50">
      {/* Menggunakan NavLink untuk menavigasi dan menentukan link mana yang aktif */}
      <Nav.Item>
        <NavLink to="/dashboard" style={navLinkStyle} className={(isActive(null) && !topicSelected) ? 'active-menu' : ''}>
          Beranda
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard?filter=jawab-pertanyaan" style={navLinkStyle} className={isActive('jawab-pertanyaan') ? 'active-menu' : ''}>
          Jawab Pertanyaan
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/dashboard?filter=informasi" style={navLinkStyle} className={isActive('informasi') ? 'active-menu' : ''}>
          Informasi
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default NavMobile;

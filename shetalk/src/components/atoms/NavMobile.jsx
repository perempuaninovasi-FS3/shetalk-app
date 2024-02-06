import React from 'react';
import Nav from 'react-bootstrap/Nav';

function NavMobile() {
  const navLinkStyle = {
    color: 'grey',
    textDecoration: 'none',
  };



  return (
    <Nav variant="underline" defaultActiveKey="/dashboard" className="d-md-none justify-content-center h-50 ">
      <Nav.Item>
        <Nav.Link href="/dashboard" style={navLinkStyle} >
          Beranda
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#beranda" style={navLinkStyle} >
          Jawab Pertanyaan
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#simpan" style={navLinkStyle} >
          Tersimpan
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavMobile;

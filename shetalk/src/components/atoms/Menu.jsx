import React from 'react';

const Menu = ({ img, title }) => {
  return (
    <div className="custome-color d-flex mb-3 mt-2 gap-2 align-items-center  ">
      <img src={img} alt="icon-menu" className="d-none d-md-block" />
      <div className="menu-sidebar d-flex text-decoration-none text-body active align-items-center  " >
        {title}
      </div>
    </div>
  );
};

export default Menu;

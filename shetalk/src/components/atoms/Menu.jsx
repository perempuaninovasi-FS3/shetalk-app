import React from 'react';

const Menu = ({ img, title }) => {
  return (
    <div className="custome-color d-flex mb-3 gap-2 align-items-center ">
      <img src={img} alt="icon-menu" />
      <a href="#" className="d-flex text-decoration-none text-body active align-items-center  " >
        {title}
      </a>
    </div>
  );
};

export default Menu;

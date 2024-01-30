import React from 'react';

const Topics = ({ fillColor, title }) => {
  return (
    <>
      <div className="custome-color d-flex mb-3 gap-2 align-items-center ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill={fillColor} />
        </svg>
        <div className="menu-sidebar text-decoration-none text-body active align-items-center  ">
          {title}
        </div>
      </div>
    </>
  );
};

export default Topics;

import React from 'react';

const Comment = ({ avatar, nama, time, textComment }) => {
  return (
    <>
      <div className="mx-md-5 mx-3  d-flex gap-4">
        <div className="mt-2">
          <img src={avatar} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
        </div>

        <div>
          <div className="d-flex align-items-center gap-3 mb-2">
            <p className="mb-0 fw-semibold custom-text fs-6">{nama}</p>
            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>{time}</p>
          </div>
          <div>
            <p className="text-muted">{textComment}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;

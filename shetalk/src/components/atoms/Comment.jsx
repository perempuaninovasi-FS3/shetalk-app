import React from 'react';

const Comment = ({ avatar, nama, time, textComment }) => {
  return (
    <>
      <div className="m-5 d-flex gap-4">
        <div className="mt-2">
          <img src={avatar} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
        </div>

        <div>
          <div className="d-flex align-items-center gap-3">
            <p className="mb-0 fw-semibold custom-text fs-5">{nama}</p>
            <p className="mb-0 text-muted">{time}</p>
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

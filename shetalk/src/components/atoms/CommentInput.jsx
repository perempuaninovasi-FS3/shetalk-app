import React, { useState } from 'react';
import { dummyAvatar } from '../../assets';

const CommentInput = () => {
  const [valueComment, setValueComment] = useState('');

  const handleChange = (e) => {
    setValueComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (valueComment.trim() === '') {
      return false;
    } else {
      const newValueComment = { text: valueComment, id: Date.now() };
      setValueComment('');
    }
  };

  return (
    <div className="d-flex align-items-center gap-3 m-md-5 m-2  bg-white ">
      <img src={dummyAvatar} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      <form onSubmit={handleSubmitComment} className="w-100">
        <input type="text" placeholder="Tulis balasan" className=" custome-input border-0 ml-2 w-100  border-bottom " value={valueComment} onChange={handleChange} />
      </form>
    </div>
  );
};

export default CommentInput;

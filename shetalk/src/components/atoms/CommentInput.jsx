import React, { useState, useEffect } from 'react';
import { getUser, getAvatar } from '../../utils/userUtils';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/slice/commentSlice';
import send from '../../assets/Icons/send.svg'

const CommentInput = ({ postId }) => {
  const user = getUser();
  const avatar = getAvatar();
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setLoading(true);

    let comments = { comment }

    try {
      await dispatch(createComment(comments));
      setComment('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center gap-3 mt-md-4 mb-md-2 mx-md-4 bg-white">
      <img src={user ? user.profile : avatar.avatar_url} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      <form onSubmit={handleSubmitComment} className="w-100 d-flex align-items-center">
        <input type="text" placeholder="Tulis balasan" className="custome-input border-0 flex-grow-1 border-bottom" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit" style={{ border: 'none', background: 'none', padding: 0 }}>
          <img src={send} alt="Send Icon" />
        </button>
        {loading && <div>Loading...</div>}
      </form>
    </div>
  );
};

export default CommentInput;

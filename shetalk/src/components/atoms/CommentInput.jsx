import React, { useState } from 'react';
import { getUser, getAvatar } from '../../utils/userUtils';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/slice/commentSlice';

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
      alert('Berhasil membuat komentar');
    } catch (error) {
      console.error('Gagal membuat komentar:', error);
      setLoading(false);
      alert('Gagal membuat komentar');
    }
  };

  return (
    <div className="d-flex align-items-center gap-3 m-md-5 m-2  bg-white ">
      <img src={user ? user.profile : avatar.avatar_url} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      <form onSubmit={handleSubmitComment} className="w-100">
        <input type="text" placeholder="Tulis balasan" className=" custome-input border-0 ml-2 w-100  border-bottom " value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Kirim</button>
        <div> {loading ? 'Loading...' : ' '}</div>
      </form>
    </div>
  );
};

export default CommentInput;

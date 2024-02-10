import CommentInput from '../atoms/CommentInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allPosts } from '../../redux/slice/postSlice';

const PostCard = ({ avatar, nama, tanggal, judul, konten, topik, showComment }) => {

  const posts = useSelector(allPosts);

  const [showCommentLocal, setShowCommentLocal] = useState(showComment);

  const toggleComment = () => {
    setShowCommentLocal(!showCommentLocal);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate(`/post/${posts.slug}`);
    } else {
      toggleComment();
    }
  };
  return (
    <>
      {/* tampilan postingan */}
      <div className="p-4  mx-auto   rounded-3 mb-3" id="listKonten" style={{ cursor: 'pointer' }}>
        <div className="d-flex align-items-center gap-3 mb-3" id="postCard">
          {/* Image */}
          <img src={avatar} alt="Profile" className="rounded-circle " style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          <div>
            {/* nama, tanggal */}
            <h5 className="mb-0 fw-bold fs-md-3 fs-6 custom-text ">{nama}</h5>
            <p className="mb-0 text-muted " style={{ fontSize: '13px' }}>
              {tanggal}
            </p>
          </div>
        </div>
        <div>
          {/* judul dan isi content */}
          <h5 className="custom-text judul-post fw-bold">{judul}</h5>
          <div className="text-content">{konten}</div>
          <p className="custom-btn fw-bold d-inline-flex text-decoration-none text-white active align-items-center px-2  rounded-2" style={{ fontSize: '14px' }}>
            {topik}
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '100%' }}> {/* Mengatur lebar maksimum atau lebar penuh */}
            {/* Tampilan input komentar */}
            {showCommentLocal && (
              <div id="comment">
                <CommentInput />
              </div>
            )}
          </div>

          <div
            onClick={handleClick}
            style={{ cursor: 'pointer' }} // Menambahkan kursor pointer
          >
            {/* Icon komentar */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="mdi:message-reply">
                <path
                  id="Vector"
                  d="M27.5 5C27.5 4.33696 27.2366 3.70107 26.7678 3.23223C26.2989 2.76339 25.663 2.5 25 2.5H5C4.33696 2.5 3.70107 2.76339 3.23223 3.23223C2.76339 3.70107 2.5 4.33696 2.5 5V20C2.5 20.663 2.76339 21.2989 3.23223 21.7678C3.70107 22.2366 4.33696 22.5 5 22.5H22.5L27.5 27.5V5Z"
                  fill="#AAAAAA"
                />
              </g>
            </svg>
          </div>
        </div>


      </div>
    </>
  );
};

export default PostCard;

{
  /* <Comment
avatar={dummyAvatar}
nama="anonim"
time=" 30 menit yang lalu"
textComment="
Lama menstruasi yang dianggap normal bervariasi antara setiap individu. Secara umum, siklus menstruasi normal berkisar antara 21 hingga 35 hari, dan durasi menstruasi sendiri biasanya berlangsung selama 2 hingga 7 hari"
/>
<Comment avatar={dummyAvatar} nama="anonim" time="10 menit yang lalu" textComment="Normalnya 7 hari" />
<Comment avatar={dummyAvatar} nama="anonim" time="15 menit yang lalu" textComment="3 hari mungkin" /> */
}

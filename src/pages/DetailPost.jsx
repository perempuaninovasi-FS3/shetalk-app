import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug, selectedPost } from '../redux/slice/postSlice';
import { fetchCommentsByPostId, getComments, deleteComment } from '../redux/slice/commentSlice';
import PostCard from '../components/molecules/PostCard';
import Comment from '../components/atoms/Comment';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import { getUser } from '../utils/userUtils';
import formatDate from '../utils/dateUtils';


const DetailPost = () => {

  const { slug } = useParams();
  const dispatch = useDispatch();
  const detailPost = useSelector(selectedPost);
  const comments = useSelector(getComments);
  const user = getUser();

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const [selectedComment, setSelectedComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(state => state.comments.totalPages);
  const totalComments = useSelector(state => state.comments.totalComments);

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (detailPost) {
      dispatch(fetchCommentsByPostId(currentPage));
    }
  }, [dispatch, detailPost, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  if (!detailPost) {
    return <div>Loading...</div>;
  }

  const handleCommentClick = (comment) => {
    sessionStorage.setItem('selectedComment', JSON.stringify(comment));
    setSelectedComment(comment);
  };

  const handleDeleteComment = () => {
    setLoading(true);
    dispatch(deleteComment())
      .then(() => {
        setLoading(false);
        alert('Komentar berhasil dihapus!');
      })
      .catch((error) => {
        setLoading(false)
        console.log('Error deleting comment:', error);
      });
  };

  const loggedInUserId = user?.id;
  const selectedCommentUserId = selectedComment ? selectedComment.user.id : null;

  return (
    <>
      <div className="">
        <div className="sticky-top">
          <Navbar />
        </div>
        <div className="container">
          <div className='content-dashboard'>
            <div className="row flex justify-content-between">
              <div className="col-md-3 mb-3 sidebar-desktop">
                <SideBar />
              </div>
              <div className="col-md-9 post-desktop">
                <div className="p-3 mx-md-5">
                  {/* tombol kembali ke beranda */}
                  {/* <div className="mb-4">
                    <a href="#" onClick={() => navigate('/dashboard')}>
                      <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <title>ionicons-v5-a</title>
                        <polyline points="244 400 100 256 244 112" fill="none" stroke="#43D7C2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} />
                        <line x1="120" y1="256" x2="412" y2="256" fill="none" stroke="#43D7C2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={48} />
                      </svg>
                    </a>
                  </div> */}

                  {/* isi detail post */}
                  <PostCard
                    avatar={detailPost.user && detailPost.user.profile ? `${API_URL}/image/profiles/${detailPost.user.profile}` : detailPost.user ? `${API_URL}/image/no-profile.png` : detailPost.avatar.avatar_url}
                    nama={detailPost.user ? detailPost.user.name : detailPost.avatar.avatar_name}
                    tanggal={formatDate(detailPost.createdAt)}
                    judul={detailPost.title}
                    konten={<div dangerouslySetInnerHTML={{ __html: detailPost.description }} style={{ maxWidth: '100%', overflowX: 'hidden', wordWrap: 'break-word' }} />}
                    topik={detailPost.topic.name}
                    // showComment bernilai default true ketika di detail post
                    showComment={true}
                  />

                  {/* komentar */}
                  <p className="p-3">komentar ({totalComments})</p>
                  {Array.isArray(comments) ? (
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className={`comment-container ${selectedComment && selectedComment.id === comment.id ? 'selected' : ''} d-flex align-items-center`}
                        onClick={() => handleCommentClick(comment)}
                        style={{ position: 'relative', marginBottom: '10px', paddingRight: '50px' }}>
                        <Comment
                          key={comment.id}
                          avatar={comment.user.profile ? `${API_URL}/image/profiles/${comment.user.profile}` : `${API_URL}/image/no-profile.png`}
                          nama={comment.user.name}
                          time={formatDate(comment.createdAt)}
                          textComment={comment.comment}

                        />
                        {(selectedComment && loggedInUserId === selectedCommentUserId && selectedComment.id === comment.id) && (
                          <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                            <button className="btn btn-danger" onClick={handleDeleteComment}>Hapus</button>
                            <div>{loading ? 'Loading...' : ' '}</div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Belum ada komentar.</p>
                  )}
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} style={{ backgroundColor: currentPage === 1 ? '' : '#43D7C2', color: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
                          Kembali
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map(page => (
                        <li key={page + 1} className={`page-item ${currentPage === page + 1 && 'active'}`}>
                          <button className={`page-link ${currentPage === page + 1 && 'active'}`} onClick={() => handleChangePage(page + 1)} style={{ backgroundColor: currentPage === page + 1 ? '#89eedf' : 'transparent', color: currentPage === page + 1 ? '#fff' : '#000', border: 'none' }}>
                            {page + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages} style={{ backgroundColor: currentPage === totalPages ? '' : '#43D7C2', color: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
                          Lanjut
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPost;

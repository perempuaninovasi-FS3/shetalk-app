import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostBySlug, selectedPost } from '../redux/slice/postSlice';
import { fetchCommentsByPostId, getComments } from '../redux/slice/commentSlice';
import PostCard from '../components/molecules/PostCard';
import Comment from '../components/atoms/Comment';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';


const DetailPost = () => {

  const { slug } = useParams();
  const dispatch = useDispatch();
  const detailPost = useSelector(selectedPost);
  const comments = useSelector(getComments);

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (detailPost) {
      dispatch(fetchCommentsByPostId());
    }
  }, [dispatch, detailPost]);


  if (!detailPost) {
    return <div>Loading...</div>;
  }

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
                    avatar={detailPost.user ? detailPost.user.profiles : detailPost.avatar.avatar_img}
                    nama={detailPost.user ? detailPost.user.name : detailPost.avatar.avatar_name}
                    tanggal={detailPost.createdAt}
                    judul={detailPost.title}
                    konten={detailPost.description}
                    topik={detailPost.topic.name}
                    // showComment bernilai default true ketika di detail post
                    showComment={true}
                  />

                  {/* komentar */}
                  <p className="p-3">komentar</p>
                  {Array.isArray(comments) ? (
                    comments.map((comment) => (
                      <Comment key={comment.id} avatar={comment.user.profiles} nama={comment.user.name} time={comment.createdAt} textComment={comment.comment} />
                    ))
                  ) : (
                    <p>Belum ada komentar.</p>
                  )}
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

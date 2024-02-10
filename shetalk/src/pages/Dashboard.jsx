import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allPosts, fetchPosts } from '../redux/slice/postSlice';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const dispatch = useDispatch();
  const posts = useSelector(allPosts);
  const location = useLocation();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const totalPages = useSelector(state => state.posts.totalPages);

  useEffect(() => {
    if (currentPage) {
      dispatch(fetchPosts(currentPage));
    }
  }, [dispatch, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    dispatch(fetchPosts(page));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const topicParam = urlParams.get('topic');
    const filterParam = urlParams.get('filter');

    if (topicParam) {
      setFilteredPosts(posts.filter(post => post.topic.id === topicParam));
      setSelectedTopic(topicParam);
      // setFilteredPosts(posts.filter(post => post.topic.id === parseInt(topicParam)));
      // setSelectedTopic(parseInt(topicParam));
    } else if (filterParam === 'jawab-pertanyaan') {
      setFilteredPosts(posts.filter(post => !post.description));
    } else if (filterParam === 'informasi') {
      setFilteredPosts(posts.filter(post => post.description));
    } else {
      setFilteredPosts(posts);
      setSelectedTopic(null);
    }
  }, [location.search, posts]);

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
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post.id}>
                      <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <PostCard
                          avatar={post.user && post.user.profile ? `${API_URL}/image/profiles/${post.user.profile}` : post.user ? `${API_URL}/image/no-profile.png` : post.avatar.avatar_url}
                          nama={post.user ? post.user.name : post.avatar.avatar_name}
                          tanggal={post.createdAt}
                          judul={post.title}
                          konten={<div dangerouslySetInnerHTML={{ __html: post.description }} style={{ maxWidth: '100%', overflowX: 'hidden', wordWrap: 'break-word' }} />}
                          topik={post.topic.name}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>Belum ada postingan terkait</div>
                )}
                <div>
                  Current Page: {currentPage} | Total Pages: {totalPages}
                  <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                  <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
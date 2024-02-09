import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { allPosts } from '../redux/slice/postSlice';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const posts = useSelector(allPosts);
  const location = useLocation();

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const topicParam = urlParams.get('topic');
    const filterParam = urlParams.get('filter');

    if (topicParam) {
      setFilteredPosts(posts.filter(post => post.topic.id === topicParam));
      setSelectedTopic(topicParam);
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
                          avatar={
                            post.user && post.user.profile
                              ? `${API_URL}/image/profiles/${post.user.profile}`
                              : post.avatar && post.avatar.avatar_url
                                ? post.avatar.avatar_url
                                : `${API_URL}/image/no-profile.png`
                          }
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
                  <div>Loading...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

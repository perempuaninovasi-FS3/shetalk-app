import React from 'react';
import { useSelector } from 'react-redux';
import { allPosts } from '../redux/slice/postSlice';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const posts = useSelector(allPosts);

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
                {posts ? (
                  posts.map((post) => (
                    <div key={post.id}>
                      <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <PostCard
                          avatar={post.user ? post.user.profiles : post.avatar.avatar_url}
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

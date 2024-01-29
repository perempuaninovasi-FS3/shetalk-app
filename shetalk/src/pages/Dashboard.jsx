import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import { dummyAvatar } from '../assets';
import PostCard from '../components/molecules/PostCard';
import { fetchPosts } from '../redux/slice/postSlice';
import { fetchUsers } from '../redux/slice/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const users = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <div className=''>
        <div className="sticky-top  ">
          <Navbar />
        </div>
        <div className="container">
          <div >
            <div className="row flex justify-content-between">
              {/* sidebar */}
              <div className="col-md-3 mb-3  sidebar-desktop">
                <SideBar />
              </div>

              {/* tempat Postingan */}
              <div className="col-md-9 post-desktop">
                {posts ? (
                  posts.map((post) => {
                    const user = Array.isArray(users) ? users.find((user) => user.id === post.user_id) : null;
                    return <PostCard key={post.id} avatar={user ? user.profile : dummyAvatar} nama={user ? user.username : 'Anonim'} tanggal={post.createdAt} judul={post.title} konten={post.description} topik={post.category} />;
                  })
                ) : (
                  <p>Loading...</p>
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

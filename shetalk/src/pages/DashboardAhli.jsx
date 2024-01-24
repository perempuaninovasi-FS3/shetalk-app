import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavAhli from '../components/molecules/NavAhli';
import SideBar from '../components/molecules/Sidebar';
import { dummyAvatar } from '../assets';
import PostCard from '../components/molecules/PostCard';
import { fetchPosts } from '../redux/slice/postSlice';
import { fetchUsers } from '../redux/slice/userSlice';

const DashboardAhli = () => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);


    return (
        <>

            <NavAhli />

            <div className="mx-md-3 ">
                <div className="row mx-4">
                    {/* sidebar */}
                    <div className="col-md-3 mb-5">
                        <div className="position-fixed">
                            <SideBar />
                        </div>
                    </div>

                    {/* tempat Postingan */}
                    <div className="col-md-9 mt-5  ">
                        {posts ? (
                            posts.map((post) => {
                                const user = Array.isArray(users) ? users.find((user) => user.id === post.user_id) : null;
                                return (
                                    <PostCard
                                        key={post.id}
                                        avatar={user ? user.profile : dummyAvatar}
                                        nama={user ? user.username : 'Anonim'}
                                        tanggal={post.createdAt}
                                        judul={post.title}
                                        konten={post.description}
                                        topik={post.category}
                                    />
                                );
                            })
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardAhli;

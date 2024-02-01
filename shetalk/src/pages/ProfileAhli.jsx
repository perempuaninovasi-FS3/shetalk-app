import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { fetchPosts } from '../redux/slice/postSlice';
import { fetchUsers } from '../redux/slice/userSlice';
import { dummyAvatar } from '../assets';

const ProfileAhli = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.user.user);
    const [activeTab, setActiveTab] = useState('tab1');

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);

    const showEditProfileModal = () => {
        // Implement modal show logic here
    };

    const logout = () => {
        // Implement logout logic here
    };

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

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
                                {/* Tempat profile */}
                                <div>
                                    {/* Profile Header */}
                                    <div className="profile-header bg-info rounded-top">
                                        <div className="row">
                                            <div className="col">
                                                <img className="profile-avatar" src={dummyAvatar} alt="Profile Avatar" />
                                            </div>
                                            <div className="col">
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <Button
                                                        className='btn-picks-avatar'
                                                        style={{
                                                            backgroundColor: '#43d7c2',
                                                            border: 'none',
                                                            marginBottom: '14px',
                                                            marginTop: '180px',
                                                            padding: '10px',
                                                            transition: 'transform 0.3s',
                                                        }}>
                                                        Edit Profile
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="profile-info">
                                        <h1><strong>Ahliiiiii</strong></h1>
                                        <p>@username</p>
                                        <p id="bio">biooooooooooooooooooooooooo ahli ahli ahli</p>
                                    </div>

                                    {/* Tabs */}
                                    <ul className="tabs">
                                        <li className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => showTab('tab1')} data-tab="tab1">
                                            Postingan
                                        </li>
                                        <li className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => showTab('tab2')} data-tab="tab2">
                                            Balasan
                                        </li>
                                    </ul>

                                    <hr className="tab-divider" id="active-tab-line" />

                                    {/* Tab Content */}
                                    <div id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
                                        <div id="ahliPost">
                                            {posts ? (
                                                posts.map((post) => {
                                                    const user = Array.isArray(users) ? users.find((user) => user.id === post.user_id) : null;
                                                    return (
                                                        <PostCard
                                                            key={post.id}
                                                            avatar={dummyAvatar}
                                                            nama="Ahli"
                                                            tanggal="03/12/2023, 21:25:00"
                                                            judul="Mengenal HIV/AIDS"
                                                            konten="HIV adalah virus yang menyerang sistem kekebalan tubuh manusia, mengganggu kemampuannya untuk melawan infeksi dan penyakit. Jika tidak diobati, HIV dapat berkembang menjadi AIDS."
                                                            topik="HIV/AIDS"
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    </div>
                                    <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                                        {/* tab komenan  */}
                                    </div>

                                    {/* rencana modal buat edit profile */}
                                    <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                                        {/* isi*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileAhli;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Tab, Tabs, Form } from 'react-bootstrap';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { fetchPosts } from '../redux/slice/postSlice';
import { fetchUsers } from '../redux/slice/userSlice';
import { dummyAvatar } from '../assets';
import { getUser } from '../utils/userUtils';

const ProfileAhli = () => {
    const user = getUser();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const users = useSelector((state) => state.user.user);
    const [activeTab, setActiveTab] = useState('tab1');
    const [activeTabModal, setActiveTabModal] = useState('edit-data');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLink = (link) => { setActiveTabModal(link) };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // let post = { title, description, topic_id };

        // try {
        //   await dispatch(createPost(post));
        //   setTitle('');
        //   setDescription('');
        //   setTopic_id('');
        //   handleClose();
        //   alert('Berhasil membuat postingan');
        // } catch (error) {
        //   console.error('Gagal membuat postingan:', error);
        // } finally {
        //   setLoading(false);
        // }
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
                                <div>
                                    <div className="profile-header bg-info rounded-top">
                                        <div className="row">
                                            <div className="col">
                                                <img className="profile-avatar" src={user.profile} alt="Profile Avatar" />
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
                                                        }}
                                                        onClick={handleShow}
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-info">
                                        <h1><strong>{user.name}</strong></h1>
                                        <p>{user.email}</p>
                                    </div>
                                    <ul className="tabs">
                                        <li className={`tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => showTab('tab1')} data-tab="tab1">
                                            Postingan
                                        </li>
                                        <li className={`tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => showTab('tab2')} data-tab="tab2">
                                            Balasan
                                        </li>
                                    </ul>
                                    <hr className="tab-divider" id="active-tab-line" />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between mx-sm-5 mb-4 active fw-semibold custom-text-a">
                        <div
                            className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeTabModal === 'edit-data' ? 'active' : ''}`}
                            onClick={() => handleLink('edit-data')}
                        >
                            Edit Data
                        </div>
                        <div
                            className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeTabModal === 'edit-password' ? 'active' : ''}`}
                            onClick={() => handleLink('edit-password')}
                        >
                            Edit Password
                        </div>
                        <div
                            className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeTabModal === 'edit-photo' ? 'active' : ''}`}
                            onClick={() => handleLink('edit-photo')}
                        >
                            Edit Foto Profile
                        </div>
                    </div>

                    {activeTabModal === 'edit-data' && (
                        <div className="p-3">
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Nama ({user.name})</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan nama baru" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Alamat email ({user.email})</Form.Label>
                                <Form.Control type="email" placeholder="Masukkan email baru" />
                            </Form.Group>
                        </div>
                    )}
                    {activeTabModal === 'edit-password' && (
                        <div className="p-3">
                            <Form.Group controlId="formOldPassword">
                                <Form.Label>Password lama</Form.Label>
                                <Form.Control type="password" placeholder="Masukkan password yang masih anda gunakan" />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>Password baru</Form.Label>
                                <Form.Control type="password" placeholder="Masukkan password baru" />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Konfirmasi password baru</Form.Label>
                                <Form.Control type="password" placeholder="Masukkan lagi password baru anda" />
                            </Form.Group>
                        </div>
                    )}
                    {activeTabModal === 'edit-photo' && (
                        <div className="d-flex justify-content-between align-items-center p-3">
                            <div style={{ padding: '3rem' }}>
                                <p className='text-center'>Foto lama anda</p>
                                <img
                                    className="profile-avatar"
                                    src={user.profile} alt="Profile Avatar"
                                    style={{ width: '12rem', height: '12rem', margin: '0' }} />
                            </div>
                            <div style={{ padding: '3rem' }}>
                                <Form.Group>
                                    <Form.Label>Masukkan foto baru anda disini:</Form.Label>
                                    <Form.Control type='file' />
                                </Form.Group>
                            </div>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: '#43d7c2',
                            border: 'none',
                            fontWeight: 'bold',
                            padding: '10px',
                            transition: 'transform 0.3s',
                        }}
                        className='btn-picks-avatar'>
                        {loading ? 'Loading...' : 'Kirim'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileAhli;

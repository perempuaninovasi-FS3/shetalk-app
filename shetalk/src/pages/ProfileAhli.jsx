import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import Navbar from '../components/molecules/Navbar';
import SideBar from '../components/molecules/Sidebar';
import PostCard from '../components/molecules/PostCard';
import { getUser, setUser } from '../utils/userUtils';
import { editUser, editUserProfile, fetchUpdatedUserData, allPostsUser, allCommentsUser } from '../redux/slice/userSlice';
import { allTopics } from '../redux/slice/topicSlice';
import ModalSertif from '../components/molecules/ModalSertif';

const ProfileAhli = () => {

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const dispatch = useDispatch();
    const user = getUser();
    const posts = useSelector(allPostsUser);
    const comments = useSelector(allCommentsUser);
    const topics = useSelector(allTopics);

    console.log(comments)

    const [activeTab, setActiveTab] = useState('tab1');
    const [activeTabModal, setActiveTabModal] = useState('edit-data');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchUpdatedUserData());
    }, [dispatch]);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setEmail(user.email);
        setName(user.name);
    };
    const handleLink = (link) => { setActiveTabModal(link) };

    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [recent_password, setRecent_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [confirmation_new_password, setConfirmation_new_password] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        let edit = { email, name };

        if (recent_password && new_password && confirmation_new_password) {
            edit = { ...edit, recent_password, new_password, confirmation_new_password };
        }

        try {
            await dispatch(editUser(edit));

            setUser({ ...user, email, name });
            setEmail('');
            setName('');
            setRecent_password('');
            setNew_password('');
            setConfirmation_new_password('');
            handleClose();
            alert('Berhasil edit profile');
        } catch (error) {
            console.error('Gagal edit profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditPhoto = async () => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('profile', file);
            await dispatch(editUserProfile(formData));

            const updatedUserData = await dispatch(fetchUpdatedUserData());
            const updateProfile = updatedUserData.payload.profile;

            setUser({ ...user, profile: updateProfile });
            setFile('');
            handleClose();
            alert('Berhasil edit photo profile');
        } catch (error) {
            console.error('Gagal edit profile:', error);
        } finally {
            setLoading(false);
        }
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
                                <div>
                                    <div className="profile-header bg-info rounded-top">
                                        <div className="row">
                                            <div className="col">
                                                <img className="profile-avatar" src={user.profile} alt="Profile Avatar" />
                                            </div>
                                            <div className="col">
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    <div style={{ border: 'none', marginBottom: '14px', marginTop: '180px', padding: '10px', }}>
                                                        <Dropdown>
                                                            <Dropdown.Toggle style={{ backgroundColor: '#43d7c2', border: 'none', color: 'white' }} >
                                                                Pilihan
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={handleShow}>Edit Profile</Dropdown.Item>
                                                                <Dropdown.Item><ModalSertif /></Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
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
                                                    return (
                                                        <PostCard
                                                            key={post.id}
                                                            avatar={user.profile}
                                                            nama={user.name}
                                                            tanggal={post.createdAt}
                                                            judul={post.title}
                                                            konten={<div dangerouslySetInnerHTML={{ __html: post.description }} style={{ maxWidth: '100%', overflowX: 'hidden', wordWrap: 'break-word' }} />}
                                                            topik={topics.find(topic => topic.id === post.topic_id)?.name || 'Unknown'}
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    </div>
                                    <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                                        <div>comment user</div>
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
                            <Form>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nama ({user.name})</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Masukkan nama baru"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Alamat email ({user.email})</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Masukkan email baru"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </div>
                    )}
                    {activeTabModal === 'edit-password' && (
                        <div className="p-3">
                            <Form>
                                <Form.Group controlId="formOldPassword">
                                    <Form.Label>Password lama</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Masukkan password yang masih anda gunakan"
                                        value={recent_password}
                                        onChange={(e) => setRecent_password(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>Password baru</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Masukkan password baru"
                                        value={new_password}
                                        onChange={(e) => setNew_password(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Konfirmasi password baru</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Masukkan lagi password baru anda"
                                        value={confirmation_new_password}
                                        onChange={(e) => setConfirmation_new_password(e.target.value)} />
                                </Form.Group>
                            </Form>
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
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Masukkan foto baru anda disini:</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    )}

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        onClick={() => {
                            if (activeTabModal === 'edit-data' || activeTabModal === 'edit-password') {
                                handleSubmit();
                            } else if (activeTabModal === 'edit-photo') {
                                handleEditPhoto();
                            }
                        }}
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
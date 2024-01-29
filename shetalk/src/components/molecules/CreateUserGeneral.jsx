import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvatars, setSelectedAvatar, setLoggedInUser, selectAvatars, selectSelectedAvatar } from '../../redux/slice/avatarSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CreateUserGeneral = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const avatars = useSelector(selectAvatars);
    const selectedAvatar = useSelector(selectSelectedAvatar);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchAvatars());
    }, [dispatch]);

    const handleProfileSelect = (avatar) => {
        dispatch(setSelectedAvatar(avatar));
    };

    const handleLogin = () => {
        if (selectedAvatar) {
            dispatch(setLoggedInUser(selectedAvatar));
            navigate('/dashboard');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

            <div>
                <h5 style={{ marginBottom: '20px', marginTop: '10px' }}>Pilih avatar sebelum lanjut ke halaman diskusi</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {
                        avatars.map((avatar, id) => (
                            <div
                                key={id}
                                onClick={() => handleProfileSelect(avatar)}
                                className={`avatar-container ${selectedAvatar === avatar ? 'selected' : ''}`}
                                style={{
                                    margin: '10px',
                                    textAlign: 'center',
                                    border: `2px solid ${avatar.borderColor || '#43d7c2'}`,
                                    padding: '10px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src={avatar.avatar_img}
                                    alt={`Profile ${id + 1}`}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                    }}
                                />
                                <p style={{ marginTop: '10px' }}>{avatar.avatar_name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{ width: '95%' }}>
                <Button
                    className='btn-picks-avatar'
                    style={{
                        backgroundColor: '#43d7c2',
                        border: 'none',
                        marginBottom: '14px',
                        marginTop: '20px',
                        padding: '10px',
                        width: '100%',
                        transition: 'transform 0.3s',
                        cursor: 'pointer',
                    }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : (
                        <>
                            {selectedAvatar ? (
                                <>
                                    <span>Lanjut sebagai </span>
                                    <span>{selectedAvatar.avatar_name} </span>
                                    <img
                                        src={selectedAvatar.avatar_img}
                                        alt="Selected Profile"
                                        style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </>
                            ) : (
                                <span>Pilih dengan 'klik' pada avatar yang kamu sukai</span>
                            )}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CreateUserGeneral;

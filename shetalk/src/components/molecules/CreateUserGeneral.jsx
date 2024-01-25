import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendUserToApi } from '../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const CreateUserGeneral = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profiles = [
        {
            profile: 'https://production.listennotes.com/podcasts/riri-cerita-anak/legenda-roro-jonggrang-Dv-rF2UiX87-uAxS5F-J_0n.300x300.jpg',
            username: 'Roro Jonggrang'
        },
        {
            profile: 'https://i.pinimg.com/736x/fa/a8/96/faa8960cfe14a5339c70aa663ccb52e5.jpg',
            username: 'Nawang Wulan'
        },
        {
            profile: 'https://i.pinimg.com/originals/84/2b/fe/842bfe22986d9f51671407cb6912e053.jpg',
            username: 'Timun Mas'
        },
        {
            profile: 'https://i0.wp.com/catatanbunda.id/wp-content/uploads/2021/06/Sangkuriang-1.jpg?resize=1000%2C562&ssl=1',
            username: 'Dayang Sumbi'
        },
        {
            profile: 'https://e7.pngegg.com/pngimages/606/242/png-clipart-keong-emas-fairy-tale-child-legend-folklore-ma-am-child-leaf.png',
            username: 'Keong Mas'
        },
    ];

    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [loading, setLoading] = useState(false);

    const handleProfileSelect = async () => {
        try {
            setLoading(true);
            await dispatch(sendUserToApi({
                profile: selectedProfile.profile,
                username: selectedProfile.username,
                role: 'general'
            }));
            navigate('/dashboard', { state: { selectedProfile } });
        } catch (error) {
            console.error('Error registering user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

            <div>
                <h5 style={{ marginBottom: '20px', marginTop: '10px' }}>Pilih avatar sebelum lanjut ke halaman diskusi</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {profiles.map((profile, index) => (
                        <div key={index}
                            onClick={() => setSelectedProfile(profile)}
                            className="avatar-container"
                            style={{
                                margin: '10px',
                                textAlign: 'center',
                                border: `2px solid ${profile.borderColor || '#43d7c2'}`,
                                padding: '10px',
                                borderRadius: '10px'
                            }}>
                            <img
                                src={profile.profile}
                                alt={`Profile ${index + 1}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    cursor: 'pointer'
                                }}
                            />
                            <p style={{ marginTop: '10px' }}>{profile.username}</p>
                        </div>
                    ))}
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
                    }}
                    onClick={() => handleProfileSelect()}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : (
                        <>
                            <span>Lanjut sebagai </span>
                            <span>{selectedProfile.username} </span>
                            <img
                                src={selectedProfile.profile}
                                alt="Selected Profile"
                                style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </>
                    )}
                </Button>
            </div>

        </div>
    );
};

export default CreateUserGeneral;

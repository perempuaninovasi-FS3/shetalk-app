import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, sendUserToApi } from '../../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';

const CreateUserGeneral = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profiles = [
        { profile: 'https://production.listennotes.com/podcasts/riri-cerita-anak/legenda-roro-jonggrang-Dv-rF2UiX87-uAxS5F-J_0n.300x300.jpg', username: 'roro jonggrang' },
        { profile: 'https://i.pinimg.com/736x/fa/a8/96/faa8960cfe14a5339c70aa663ccb52e5.jpg', username: 'nawang wulan' },
        { profile: 'https://i.pinimg.com/originals/84/2b/fe/842bfe22986d9f51671407cb6912e053.jpg', username: 'timun mas' },
    ];

    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

    const handleProfileSelect = async () => {
        // Use the action creator to send user data to API
        await dispatch(sendUserToApi({ profile: selectedProfile.profile, username: selectedProfile.username, role: 'general' }));
        navigate('/dashboard', { state: { selectedProfile } });
    };

    return (
        <div>
            <h2>User Registration</h2>
            <div>
                <h3>Choose Your Profile:</h3>
                <div>
                    {profiles.map((profile, index) => (
                        <img
                            key={index}
                            src={profile.profile}
                            alt={`Profile ${index + 1}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
                            onClick={() => setSelectedProfile(profile)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3>Register with Selected Profile:</h3>
                <button onClick={() => handleProfileSelect()}>
                    <img
                        src={selectedProfile.profile}
                        alt="Selected Profile"
                        style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                </button>
            </div>
        </div>
    );
};

export default CreateUserGeneral;

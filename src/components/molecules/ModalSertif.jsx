import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { getUser } from '../../utils/userUtils';
import { badgeImage, badgeName } from '../../utils/badgeUtils';
import bronzeBadge from '../../assets/img/bronzebadge.svg'
import silverBadge from '../../assets/img/silverbadge.svg'
import goldBadge from '../../assets/img/goldbadge.svg'

const ModalSertif = () => {

    const user = getUser();
    const totalAnswered = user.total_answered || 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow}>
                Sertifikat
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <div>
                    <Modal.Header closeButton>
                        <Modal.Title>Sertifikat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {totalAnswered < 20 ? (
                            <div style={{ color: '#333', fontSize: '16px', lineHeight: '1.5', padding: '2rem' }}>
                                <p>Hi! Sepertinya anda belum mendapatkan sertifikat, Anda harus berpartisipasi aktif dalam menjawab pertanyaan-pertanyaan user general untuk mendapatkan sertifikat</p>
                                Ada beberapa tingkatan keaktifan dalam perolehan sertifikat ini:<br />
                                <ul style={{ paddingLeft: '20px', margin: '10px 0', listStyleType: 'none' }}>
                                    <li><img src={goldBadge} alt='badge' style={{ width: '5rem' }} /> - [Gold Badge] untuk anda yang berpartisipasi aktif menjawab 100 pertanyaan</li>
                                    <li><img src={silverBadge} alt='badge' style={{ width: '5rem' }} />  - [Silver Badge] untuk anda yang berpartisipasi aktif menjawab 50 pertanyaan</li>
                                    <li><img src={bronzeBadge} alt='badge' style={{ width: '5rem' }} />  - [Bronze Badge] untuk anda yang berpartisipasi aktif menjawab 20 pertanyaan</li>
                                </ul>
                                <h5 className='mt-5'>Selamat berdiskusi!</h5>
                            </div>
                        ) : (
                            <div style={{ color: '#333', fontSize: '16px', lineHeight: '1.5', padding: '2rem' }}>
                                <p>Selamat ! Anda telah berhasil mendapatkan {badgeName} {badgeImage && <img src={badgeImage} alt="Badge" style={{ width: '50px', height: '50px' }} />}</p>
                                <p>Anda juga memperoleh sertifikat atas keaktifan anda</p>
                                <Link to="/sertifikat">
                                    <Button className='btn-picks-avatar'
                                        style={{
                                            backgroundColor: '#43d7c2',
                                            border: 'none',
                                            marginBottom: '14px',
                                            marginTop: '20px',
                                            padding: '10px',
                                            transition: 'transform 0.3s',
                                            cursor: 'pointer',
                                        }}>
                                        Lihat Sertifikat
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Modal.Body>

                    <Modal.Footer>

                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};

export default ModalSertif;
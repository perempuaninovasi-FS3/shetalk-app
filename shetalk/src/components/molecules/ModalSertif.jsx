import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getUser } from '../../utils/userUtils';
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
                            // Menampilkan informasi jika totalAnswered kurang dari 20
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
                            // Menampilkan konten yang sesuai jika totalAnswered lebih dari atau sama dengan 20
                            <div>
                                <p>Selamat ! anda sekarang dalam tingkatan (icon) anda mendapat sertifikat atas keaktifan anda !</p>
                                <button>Unduh sertifikat disini</button>
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
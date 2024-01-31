import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AvatarPick from '../components/molecules/AvatarPick';

function LandingPage() {
    const [showModal, setShowModal] = useState(false);

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    return (
        <>
            <Button variant="primary" onClick={handleModalShow}>
                Gabung
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AvatarPick closeModal={handleModalClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LandingPage;

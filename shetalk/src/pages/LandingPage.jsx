import React, { useState } from 'react';
import { Modal, Button, Navbar, Card, Col, Row } from 'react-bootstrap';
import CreateUserGeneral from '../components/molecules/CreateUserGeneral';
import Logo from '../components/atoms/Logo';
import tagbrand from '../assets/img/tag-brand.svg';
import people from '../assets/img/People.svg';
import footer from '../assets/img/footer.svg' ;

function LandingPage() {
    const [showModal, setShowModal] = useState(false);

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    return (
        <>
            {/*Navbar*/}
            <div className= "d-flex justify-content-between align-items-center shadow-sm  px-md-5 py-md-4 px-4 py-2 bg-body-tertiary rounded ">
                <Logo/>
            </div>

            {/*Home*/}
            <div className="container-fluid">
                <div className='row'>
                    <div className='col align-self-center'>
                        <figure class="text-center">
                            <blockquote class="blockquote">
                            <h1 class="text1">Selamat datang di SheTalk</h1>
                            <p class="text2">Platform yang didedikasikan untuk menyediakan</p>
                            <p class="text2">ruang diskusi terpercaya bagi perempuan untuk curhat seputar</p>
                            <p class="text3">kesehatan reproduksi dan seksual</p>
                            </blockquote> 
                        </figure>
                    </div>
                </div>

                {/*Tag brand*/}
                <div className='row justify-content-center'>
                    <img className='img-fluid' src={tagbrand} style={{ width:'60rem' , height:'60rem'}} />
                </div>

                {/*Promo*/}
                <figure class="text-center">
                    <blockquote class="blockquote">
                    <h1 class="text4">Mengapa SheTalk?</h1>
                    </blockquote> 
                </figure>

                <div class="row align-items-start">
                    <div class="col-sm border rounded">
                        <h5 class="text5">Anonim dan Aman</h5>
                        <p class="text6">Privasimu adalah prioritas kami. Berdiskusi tanpa perlu khawatir tentang identitas terungkap.</p>
                    </div>
                    <div class="col-sm border rounded">
                        <h5 class="text5">Diskusi Terbuka dan Beragam</h5>
                        <p class="text6">Temukan solusi, bagaikan pengalaman, dan berdialog secara positif untuk membangun pengetahuan.</p>
                    </div>
                    <div class="col-sm border rounded">
                        <h5 class="text5">Sertifikat Penghargaan</h5>
                        <p class="text6">Jadilah volunteer kesehatan yang aktif berinteraksi dan membangun dampak positif.</p>
                    </div>
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-md">
                <div class="card-img">
                    <img class="img-fluid" src={people}/>
                </div>
                </div>
                <div class="col-md">
                <div class="card-text">
                    <p class="fs-5">Jadilah bagian dari SheTalk dan mulai perjalanan kamu menuju pemahaman yang lebih baik tentang kesehatan reproduksi dan seksual.</p>
                    <p class="fs-5">Bergabunglah sekarang untuk mendiskusikan, belajar, dan berbagi pengalaman. Mari kita jaga kesehatan reproduksi dan seksual kita bersama-sama!</p>
                </div>
                </div>
            </div>

            <Card>
                <Card.Img src={footer} alt='Card image' />
                <Card.ImgOverlay>
                    <Row style={{marginTop:'6rem'}}>
                        <Col md={6} className='d-flex justify-content-center align-items-center'>
                            <Card.Title className='fs-2' style={{color:'white'}}>Curhat Aman Sehat</Card.Title>
                        </Col>
                        <Col md={6} className='d-flex justify-content-center align-items-center'>
                            <Button variant="danger" className='fs-5' onClick={handleModalShow}>
                                Gabung
                            </Button>
                        </Col>
                    </Row>
                </Card.ImgOverlay>
                
            </Card>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateUserGeneral closeModal={handleModalClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LandingPage;

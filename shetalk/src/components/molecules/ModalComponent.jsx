import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectTopics from './SelectTopik';
import { Form } from 'react-bootstrap';

const ModalComponent = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeLink, setActiveLink] = useState('pertanyaan');

  const handleLink = (link) => {
    setActiveLink(link);
  };

  return (
    <>

      <Button onClick={handleShow} className='border-0 fw-bold py-2' style={{ backgroundColor: '#43d7c2', marginBottom: '8px', fontSize: '80%'}}>
        Mulai Diskusi Baru
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>

          <div className="d-flex justify-content-between   mx-sm-5 mb-4 active fw-semibold custom-text-a">
            <div
              className={`tab d-flex text-decoration-none fs-md-5   align-items-center custom-text-a ${activeLink === 'pertanyaan' ? 'active' : ''}`}
              onClick={() => handleLink('pertanyaan')} >
              Tambah Pertanyaan
            </div>
            <div
              className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeLink === 'kiriman' ? 'active' : ''}`}
              onClick={() => handleLink('kiriman')}
            >
              Buat Kiriman
            </div>
          </div>

          {/* form buat pertanyaan */}
          {activeLink === 'pertanyaan' && (
            <div>
              <div className="custome-bg-modal p-3 m-3">
                <p >
                  Kiat untuk mendapatkan jawaban yang baik dengan cepat <br />
                  1.Pastikan pertanyaan kamu belum pernah diajukan sebelumnya <br /> 2.Pastikan pertanyaan kamu singkat, padat, dan lugas
                </p>
              </div>
              <div className="m-3">
                <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" placeholder="Tulis Pertanyaanmu disini.." rows={3} className='border-0 outline-0' />
                </Form.Group>
              </div>
            </div>
          )}

          {/* form buat kiriman */}
          {activeLink === 'kiriman' && (
            <div className="m-3">
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="tulis judul disini..." autoFocus />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label></Form.Label>
                  <Form.Control as="textarea" placeholder="katakan sesuatu.." rows={3} />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <SelectTopics />
          <Button onClick={handleClose} style={{ backgroundColor: '#43d7c2', border: 'none', fontWeight: 'bold' }}>
            Posting
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;

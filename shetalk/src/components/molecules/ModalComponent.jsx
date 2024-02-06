import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/slice/postSlice';
import { allTopics } from '../../redux/slice/topicSlice';

const ModalComponent = () => {

  const dispatch = useDispatch();
  const topics = useSelector(allTopics);

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState('pertanyaan');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLink = (link) => { setActiveLink(link) };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic_id, setTopic_id] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let post = { title, description, topic_id };

    try {
      await dispatch(createPost(post));
      setTitle('');
      setDescription('');
      setTopic_id('');
      handleClose();
      alert('Berhasil membuat postingan');
    } catch (error) {
      console.error('Gagal membuat postingan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="border-0 fw-bold py-2" style={{ backgroundColor: '#43d7c2', marginBottom: '8px', fontSize: '80%' }}>
        Mulai Diskusi Baru
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <div>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-between mx-sm-5 mb-4 active fw-semibold custom-text-a">
              <div
                className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeLink === 'pertanyaan' ? 'active' : ''}`}
                onClick={() => handleLink('pertanyaan')}
              >
                Tambah Pertanyaan
              </div>
              <div
                className={`tab d-flex text-decoration-none fs-md-5 align-items-center custom-text-a ${activeLink === 'kiriman' ? 'active' : ''}`}
                onClick={() => handleLink('kiriman')}
              >
                Buat Kiriman
              </div>
            </div>

            {activeLink === 'pertanyaan' && (
              <div>
                <div className="custome-bg-modal p-3 m-3">
                  <p>
                    Kiat untuk mendapatkan jawaban yang baik dengan cepat <br />
                    1. Pastikan pertanyaan kamu belum pernah diajukan sebelumnya <br />
                    2. Pastikan pertanyaan kamu singkat, padat, dan lugas
                  </p>
                </div>
                <div className="m-3">
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Tulis Pertanyaanmu disini.."
                      rows={3}
                      className="border-0 outline-0"
                    />
                  </Form.Group>
                </div>
              </div>
            )}

            {activeLink === 'kiriman' && (
              <div className="m-3">
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="tulis judul disini..."
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label></Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="katakan sesuatu.."
                      rows={3}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Form>
              <Form.Select name="topic id" value={topic_id} onChange={(e) => setTopic_id(e.target.value)}>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </Form.Select>
            </Form>
            <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#43d7c2', border: 'none', fontWeight: 'bold' }}>
              {loading ? 'Loading...' : 'Posting'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;

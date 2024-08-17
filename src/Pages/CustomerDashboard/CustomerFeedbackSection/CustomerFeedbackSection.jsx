import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeNavBar from '../../../components/HomeNavBar/HomeNavBar';
import Footer from '../../../components/Footer/Footer';
import { Modal, Button, Form } from 'react-bootstrap';
import './CustomerFeedbackSection.css'
import axios from 'axios';


const CustomerFeedbackSection = () => {
    const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const userType = sessionStorage.getItem('user_type');
    const userId = sessionStorage.getItem('user_id');
    const email = sessionStorage.getItem('email');
    
    if (userType !== 'customer') {
      sessionStorage.clear();
      navigate('/');
    } else {
      setUserId(userId || '');
      setEmail(email || '');
      if (userId) {
        fetchFeedbacks(userId);
    }
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;
  
    try {
      const response = await axios.post('http://localhost/quickmatch_api/customerWriteFeedback.php', {
        user_id: userId,
        email: email,
        feedback: feedback,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.success) {
        fetchFeedbacks(userId);
        setFeedback("");
        handleClose();
      } else {
        console.error("Failed to submit feedback:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  


  const fetchFeedbacks = async (userId) => {
    try {
        const response = await axios.get(`http://localhost/quickmatch_api/customerFeedbacks.php`, {
            params: { user_id: userId }
        });

        if (response.data && Array.isArray(response.data.data)) {
            setFeedbacks(response.data.data);
        } else {
            console.error("Failed to fetch feedbacks:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
    }
};



    

  return (
    <>
     <HomeNavBar />

     <div className="container feedback-container">
        <h2>Customer Feedback Section</h2>
        <Button variant="primary" onClick={handleShow}>
          Write Feedback
        </Button>

        {/* Feedback Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Write Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} readOnly/>
              </Form.Group>
              <Form.Group controlId="formFeedback" className="mt-3">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit Feedback
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Display Feedbacks */}
        <div className="mt-4">
        {feedbacks.map((fb, index) => (
                        <div key={index} className="feedback-item">
                            <p>{fb.feedback}</p>
                            <span className="feedback-date">{new Date(fb.date).toLocaleString()}</span>
                        </div>
                    ))}
        </div>
      </div>
     
     <Footer />
    </>
  )
}

export default CustomerFeedbackSection
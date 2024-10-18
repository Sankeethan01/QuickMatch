import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import '../CustomerDashboard/CustomerFeedbackSection/CustomerFeedbackSection.css'
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import ProviderNav from '../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav';
import feebackImg from '../../assets/feedback_section.jpg';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const ProviderFeedbackSection = () => {
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userType = sessionStorage.getItem('user_type');
    const userId = sessionStorage.getItem('user_id');
    const email = sessionStorage.getItem('email');

    console.log("User Type:", userType);
    console.log("User ID:", userId);
    console.log("Email:", email);

    if (userType !== 'provider') {
      sessionStorage.clear();
      navigate('/');
    } else {
      setUserId(userId || '');
      setEmail(email || '');
      if (userId) {
        setTimeout(() => {
          setLoading(false);
          fetchFeedbacks(userId);
        }, 2000);

      }
    }
  }, [navigate]);



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
        toast.success(response.data.message);
        fetchFeedbacks(userId);
        setFeedback("");
        setFeedbackModal(false);
      } else {
        toast.error(response.data.message);
        console.error("Failed to submit feedback:", response.data.message);
        setFeedback("");
        setFeedbackModal(false);
      }
    } catch (error) {
      toast.error("Error occurred");
      console.error("Error submitting feedback:", error);
      setFeedback("");
        setFeedbackModal(false);
    }
  };



  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }


  return (
    <>
    <>
      <ProviderNav />
      <div className="container feedback-container">
        <div className='image-section'>
          <img src={feebackImg} />
        </div>
        <div className='feedback-content'>
          <h2 style={{ textAlign: "center" }}>Provider Feedback Section</h2>
          <Button variant="primary" onClick={()=>setFeedbackModal(true)}>
            Write Feedback
          </Button>

          {/* Feedback Modal */}
          <Modal show={feedbackModal} onHide={()=>setFeedbackModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Write Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} readOnly />
                </Form.Group>
                <Form.Group controlId="formFeedback" className="mt-3">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)

                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setFeedbackModal(false)}>
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
      </div>
      <Footer />
    </>
    <ToastContainer />
    </>
  )
}

export default ProviderFeedbackSection
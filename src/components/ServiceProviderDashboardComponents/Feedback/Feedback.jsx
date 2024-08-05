// src/components/Feedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css';
import ShowModal from '../../Write Feedback/ShowModal'

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const providerId = 501; // Set the provider ID

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost/quickmatch_api/providerDetails.php?action=customerFeedbackById&provider_id=${providerId}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [providerId]);

  return (
    <>
      <div className="feedback-container">
        <h2 className="feedback-title">Customer Feedback</h2>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div className="feedback-item" key={feedback.id}>
              <div className="customer-name">{feedback.reviewer}</div>
              <div className="star-rating">{'⭐️'.repeat(feedback.rating)}</div>
              <p className="review-text">{feedback.comment}</p>
            </div>
          ))
        ) : (
          <p className="no-feedback">No feedbacks available.</p>
        )}
      </div>
      <div className='feedback-container'>
        <ShowModal username="John Smith" email="smith78@gmail.com" user="Service Provider"/>
      </div>
    </>
  );
};

export default Feedback;
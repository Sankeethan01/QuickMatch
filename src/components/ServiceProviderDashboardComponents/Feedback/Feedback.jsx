// src/components/Feedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css';
import reviewImg from '../../../assets/customerReview_img.jpg'

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {

    const user_id = sessionStorage.getItem('user_id');
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost/quickmatch_api/getCustomerReviews.php?user_id=${user_id}`);
        if (Array.isArray(response.data.data)) {
          setFeedbacks(response.data.data);
        } else {
          setFeedbacks([]);  // Or handle the unexpected response format
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
       setFeedbacks([]);  // Handle the error by setting feedbacks to an empty array
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <div className="feedback-container">
        <div className='review-img'>
        <h2 className="feedback-title">Customer Feedback</h2>
        <img src={reviewImg} alt="" />
        </div>
        
        <div className='review-content'>
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
       
      </div>
      
    </>
  );
};

export default Feedback;
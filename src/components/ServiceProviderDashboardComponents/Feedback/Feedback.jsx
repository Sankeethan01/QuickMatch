// src/components/Feedback.js
import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      rating: 5,
      comment: 'Excellent service! Highly recommend.',
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      rating: 4,
      comment: 'Good job, but can improve punctuality.',
    },
    {
      id: 3,
      customerName: 'Alice Johnson',
      rating: 3,
      comment: 'Average experience, expected better communication.',
    },
  ]);

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Customer Feedback</h2>
      {feedbacks.map((feedback) => (
        <div className="feedback-item" key={feedback.id}>
          <div className="customer-name">{feedback.customerName}</div>
          <div className="star-rating">{'⭐'.repeat(feedback.rating)}</div>
          <p className="review-text">{feedback.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedback;

import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Form,
  Carousel,
  Container,
} from "react-bootstrap";
import Rating from "react-rating-stars-component";
import BookNowPortal from "../BookNowPortal/BookNowPortal";
import axios from "axios";
import "./CenterPage.css";

const CenterPage = (props) => {
  const [bookNowShow, setBookNowShow] = useState(false);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost/quickmatch_api/Review.php?provider_id=${props.provider_id}`)
      .then((response) => setCustomerReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [props.provider_id]);

  const handleBookNowClose = () => setBookNowShow(false);
  const handleBookNowShow = () => setBookNowShow(true);
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      provider_id: props.provider_id,
      ...newReview,
    };

    axios
      .post("http://localhost/quickmatch_api/Review.php", reviewData)
      .then((response) => {
        setCustomerReviews([...customerReviews, response.data]);
        setNewReview({ reviewer: "", comment: "", rating: 0 });
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  return (
    <>
      {bookNowShow ? (
        <BookNowPortal
          {...props}
          show={bookNowShow}
          onHide={handleBookNowClose}
          provider_id={props.provider_id}
          service_category_id={props.service_category_id}
          provider_name={props.name}
          service_name={props.service_name}
        />
      ) : (
        <Modal className="center-page"
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Service Provider Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="User-container">
              <div className="header-section text-center">
                <h2>{props.name}</h2>
                <img src={`http://localhost/quickmatch_api/profile_images/${props.profile}`} alt="Profile" className="profile-img" />
              </div>
              <div className="info-section">
                <h3>Business Hours</h3>
                <p>
                  <strong>Monday - Saturday:</strong> 08:00 AM - 06:00 PM
                </p>
                <p>
                  <strong>Sunday:</strong> Not available
                </p>
                <h3>Languages</h3>
                <p>English, Tamil, Sinhala</p>
                <h3>Experience</h3>
                <p>{props.exp}</p>
              </div>
              <h3 className="review">Customer Reviews</h3>
              <div className="cardreview">
                <Carousel className="reviews-section mb-4">
                  {customerReviews.map((review) => (
                    <Carousel.Item key={review.id}>
                      <Card className="review-card">
                        <Card.Body>
                          <div className="reviewer-info">
                            <div className="reviewer-details">
                              <Card.Title>{review.reviewer}</Card.Title>
                              <Card.Text className="cardtext1">
                                {review.comment.length > 150
                                  ? `${review.comment.substring(0, 150)}...`
                                  : review.comment}
                              </Card.Text>
                            </div>
                          </div>
                          <Card.Text className="cardtext2">
                            <div className="rating-stars">
                              <Rating
                                value={review.rating}
                                edit={false} // Set to true if you want interactive ratings
                                size={24} // Size of stars
                                activeColor="#ffc107" // Color of active stars
                              />
                            </div>
                            <small className="text-muted">
                              Reviewed on{" "}
                              {new Date(review.timestamp).toLocaleDateString()}
                            </small>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <Form onSubmit={handleReviewSubmit} className="mb-4" action="GET">
                <Form.Group controlId="reviewerName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="reviewer"
                    value={newReview.reviewer}
                    onChange={handleReviewChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="reviewComment">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={newReview.comment}
                    onChange={handleReviewChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="reviewRating">
                  <Form.Label>Your Rating</Form.Label>
                  <Rating
                    value={newReview.rating}
                    onChange={(newValue) =>
                      setNewReview({ ...newReview, rating: newValue })
                    }
                    size={24}
                    activeColor="#ffc107"
                  />
                </Form.Group>
                <Button type="submit" className="submitbutton">
                  Submit Review
                </Button>
              </Form>
              <div className="text-center">
                <Button
                  variant="outline-success"
                  className="bookbutton"
                  onClick={handleBookNowShow}
                >
                  Book Now
                </Button>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer className="Details">
            <Row className="w-100">
              <Col md={4}>
                <p>
                  <strong>Address:</strong> {props.city}
                </p>
              </Col>
              <Col md={4}>
                <p>
                  <strong>Email:</strong> {props.email}
                </p>
              </Col>
              <Col md={4}>
                <p>
                  <strong>Contact Number:</strong> {props.phone}
                </p>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CenterPage;
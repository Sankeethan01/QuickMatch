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
import { toast, ToastContainer } from "react-toastify";

const CenterPage = (props) => {
  const [bookNowShow, setBookNowShow] = useState(false);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    // Fetching reviews for the provider
    axios
      .get(
        `http://localhost/quickmatch_api/getCustomerReviews.php?provider_id=${props.provider_id}`
      )
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setCustomerReviews(response.data.data);
        } else {
          setCustomerReviews([]); // Handle unexpected response
        }
      })
      .catch((error) => {
        console.error("No feedbacks for the provider.");
        setCustomerReviews([]); // Handle error scenario
      });
    // Fetching the customer details using the user ID stored in sessionStorage
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      axios
        .get(
          `http://localhost/quickmatch_api/getCustomerDetail.php?user_id=${userId}`
        )
        .then((response) => {
          if (response.data && response.data.name) {
            setNewReview((prevReview) => ({
              ...prevReview,
              reviewer: response.data.name, // Set the reviewer name
            }));
          }
        })
        .catch((error) =>
          console.error("Error fetching customer details:", error)
        );
    }
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
      .post("http://localhost/quickmatch_api/addCustomerReview.php", reviewData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Review added successfully...");
          
          const newCustomerReview = {
            reviewer: newReview.reviewer,
            comment: newReview.comment,
            rating: newReview.rating,
            timestamp: new Date().toISOString(),
          };
  
          setCustomerReviews([...customerReviews, newCustomerReview]);


          setNewReview({ reviewer: newReview.reviewer, comment: "", rating: 0 });

        } else {
          console.error("Error: ", response.data.message);
          toast.error("Error while adding review...");
        }
      })
      .catch((error) => {console.error("Error submitting review:", error);
        toast.error("Error occurred...")
      });
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
        <Modal
          className="center-page"
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
                <img
                  src={`http://localhost/quickmatch_api/profile_images/${props.profile}`}
                  alt="Profile"
                  className="profile-img"
                />
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
                <h3>Services</h3>
                <p>{props.services}</p>
                <h3>Experience</h3>
                <p>{props.exp}</p>
                <h3>Charges</h3>
                <p>{props.charge}</p>
                <h3>Qualification</h3>
                <p>{props.qualification}</p>
              </div>
              <h3 style={{textAlign:"center", marginTop:"20px" ,fontSize:"2rem" ,fontWeight:"bold"}}>Customer Reviews</h3>
              <div className="cardreview">
                <Carousel className="reviews-section mb-4" interval={2000}>
                  {Array.isArray(customerReviews) &&
                    customerReviews.map((review) => (
                      <Carousel.Item key={review.id}>
                        <Card className="review-card">
                          <Card.Body>
                            <div className="reviewer-info">
                              <div className="reviewer-details">
                                <Card.Title>{review.reviewer}</Card.Title>
                                <Card.Text className="cardtext1">
                                  {review.comment
                                    ? review.comment.length > 150
                                      ? `${review.comment.substring(0, 150)}...`
                                      : review.comment
                                    : "No comment provided."}
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
                                {new Date(
                                  review.timestamp
                                ).toLocaleDateString()}
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
                    readOnly
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
              <Col md={3}></Col>
              <Col md={5}>
                <p>
                  <strong>Email:</strong> {props.email}
                </p>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default CenterPage;

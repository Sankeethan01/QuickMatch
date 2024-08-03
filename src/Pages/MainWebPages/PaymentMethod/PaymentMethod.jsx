import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import './PaymentMethod.css';
import visaImg1 from '../../../assets/visaImg1.png'; 
import masterImg2 from '../../../assets/masterImg2.jpg'; 

const PaymentMethod = ({ onPaymentSuccess }) => {
    
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
  
    const handlePayment = () => {
      // Validate payment method and card details
      if (paymentMethod && cardNumber && expiryDate && cvv) {
        // Simulate payment processing
        setTimeout(() => {
          onPaymentSuccess();
        }, 1000); // Simulating async payment process
      } else {
        alert("Please fill in all card details.");
      }
    };
  
    const getCardImage = () => {
      if (paymentMethod === "visa") {
        return visaImg1;
      } else if (paymentMethod === "mastercard") {
        return masterImg2;
      } else {
        return null;
      }
    };
  
     
  return (
    <div className="Paymentpage">
      <Form.Group>
        <Form.Label>Select Payment Method:</Form.Label>
        <Form.Control
        className="mb-10"
          as="select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          {/* Add more payment options as needed */}
        </Form.Control>
      </Form.Group>

      {paymentMethod && (
        <Row>
          <Col sm={6}>
            <div>
              <Form.Group>
                <Form.Label>Card Number:</Form.Label>
                <Form.Control
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Expiry Date:</Form.Label>
                <Form.Control
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>CVV:</Form.Label>
                <Form.Control
                  type="text"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  placeholder="Enter CVV"
                />
              </Form.Group>

              <Button  className="paynowbutton" onClick={handlePayment}>
                Pay Now
              </Button>
            </div>
          </Col>
          <Col sm={6}>
            <div style={{ textAlign: "center" }}>
              <img
                src={getCardImage()}
                alt="Card"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default PaymentMethod;
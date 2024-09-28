import React from "react";
import "./Review.css";
import next from "../../assets/next-icon.png";
import back from "../../assets/back-icon.png";
import user_1 from "../../assets/user-1.png";
import user_2 from "../../assets/user-2.png";
import user_3 from "../../assets/user-3.png";
import user_4 from "../../assets/user-4.png";
import { useRef } from "react";

const Review = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className="review">
      <img src={next} alt="" className="next-btn" onClick={slideForward} />
      <img src={back} alt="" className="back-btn" onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt="" />
                <div>
                  <h3>Raveendran Rajeepan</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
                "QuickMatch made finding a reliable service provider so easy!
                The app is user-friendly, and I loved reading real customer
                reviews before booking. The entire process was seamless, and the
                service I received was excellent. I highly recommend QuickMatch
                for anyone looking for quality services effortlessly."
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="" />
                <div>
                  <h3>Anura Kumara Dissanayaka</h3>
                  <span>Anuradapura, Sri Lanka</span>
                </div>
              </div>
              <p>
              "QuickMatch made finding a reliable service provider so easy! The booking process was seamless, and the service quality exceeded my expectations. Highly recommend this app for hassle-free service bookings."
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="" />
                <div>
                  <h3>Harini Abayasinha</h3>
                  <span>Colombu, Sri Lanka</span>
                </div>
              </div>
              <p>
              "QuickMatch is fantastic! I quickly found a great plumber and booked through the app. The service was prompt and professional. This app makes finding and hiring service providers incredibly simple and stress-free."
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Manula Alahakone</h3>
                  <span>Kandy, Sri Lanka</span>
                </div>
              </div>
              <p>
              "Using QuickMatch was a breeze. I found a dependable cleaner within minutes and booked instantly. The service was excellent and the app is very user-friendly. Definitely recommend for anyone needing reliable services."
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Ravindu Dilshan</h3>
                  <span>Galle, Sri Lanka</span>
                </div>
              </div>
              <p>
              "Cannot wait to access many more services from QuickMatch. Its so helpful for me to find a suitable person.I am so happy to share this review with all.Thank You...."
              </p>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="" />
                <div>
                  <h3>Deluxshana Amalathas</h3>
                  <span>Jaffna, Sri Lanka</span>
                </div>
              </div>
              <p>
              "QuickMatch made finding a reliable service provider so easy!
                The app is user-friendly, and I loved reading real customer
                reviews before booking. The entire process was seamless, and the
                service I received was excellent. I highly recommend QuickMatch
                for anyone looking for quality services effortlessly."
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Review;

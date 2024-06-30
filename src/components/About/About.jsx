import React from "react";
import "./About.css";
import play_icon from "../../assets/play-icon.png";
import logo from "../../assets/logo.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={logo} alt="" className="about-img" />
        <img src={play_icon} alt="" className="play-icon" />
      </div>
      <div className="about-right">
        <h3>QuickMatch</h3>
        <h2>Connecting Customers and Service Providers</h2>
        <p>
          QuickMatch is a groundbreaking web application created by a group of
          dedicated university students, designed to seamlessly connect service
          seekers with the best service providers in various categories. Our
          primary goal is to simplify the process of finding and booking
          reliable service providers, making it a hassle-free experience for
          users.
        </p>
        <p>
          Inspired by our own challenges in locating trustworthy services,
          QuickMatch offers an intuitive platform where users can effortlessly
          browse, compare, and book providers. The user-friendly interface
          ensures easy navigation through different categories, enabling users
          to search for specific services, read genuine reviews, and make
          informed decisions based on feedback from other customers. This
          transparency helps build trust and ensures high-quality service
          delivery.
        </p>
        <p>
          Service providers, on the other hand, benefit from increased
          visibility and business growth opportunities. By creating a profile on
          QuickMatch, they can showcase their expertise, receive direct
          bookings, and establish credibility through customer reviews. This
          enhanced visibility helps them reach a broader audience and build a
          solid reputation.
        </p>
        <p>
          As university students, we are proud of QuickMatch and believe it will
          significantly improve the service-seeking experience. We invite you to
          explore QuickMatch, experience its convenience, and join us in
          revolutionizing the way people find and book services.
        </p>
      </div>
    </div>
  );
};

export default About;

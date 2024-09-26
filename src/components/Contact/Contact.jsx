import React from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail from "../../assets/mail-icon.png";
import phone from "../../assets/phone-icon.png";
import address from "../../assets/location-icon.png";
import arrow from "../../assets/white-arrow.png";
import { ToastContainer,toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "0ed48288-89bd-440e-a152-cb1cd8142033");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      toast.success("Email sent successfully..");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error("Error sending email...")
      setResult(data.message);
    }
  };
  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="" />
        </h3>
        <p>
          In our Contact section, you can easily reach out to us with any
          inquiries, feedback, or support needs. Whether you have questions
          about using QuickMatch, need assistance with your account, or want to
          provide feedback to help us improve, we're here to help. Fill out the
          contact form with your details and message, and our dedicated support
          team will respond promptly. Your satisfaction is our priority, and we
          strive to provide excellent customer service. Thank you for choosing
          QuickMatch! We look forward to assisting you.
        </p>
        <ul>
          <li>
            <img src={mail} alt="" />
            findquickmatch@gmail.com
          </li>
          <li>
            <img src={phone} alt="" />
            +77 8337 669
          </li>
          <li>
            <img src={address} alt="" />
          Passara Road, Badulla, Sri Lanka
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name "
            required
          />
          <label htmlFor="">Email Address</label>
          <input
            type="tel"
            name="email"
            placeholder="Enter Email Address"
            required
          />
          <label htmlFor="">Write Your Message Here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter Your Message"
            required
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Submit Now <img src={arrow} alt="" />
          </button>
        </form>
        <span>{result}</span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;

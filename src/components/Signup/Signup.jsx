import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css";
import "./Signup.css";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Signup = ({ onclose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost/quickmatch_api/Register.php", {
        username,
        email,
        password,
      });
      if (response.data.message) {
        
        toast.success("Registered Successfully, You can login now...");
        setTimeout(() => {
          window.location.reload(); 
        }, 3000); 
      
        
      } else {
        toast.error("Registration failed. Please check your credentials and try again.");
       
        
      }
      
    } catch (error) {
      toast.error("Sign up failed.");
      
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    }
  };

  return (
    <>
      <div className="login">
        <div className="signup-container">
          <div className="titleCloseBtn">
            <ClearIcon
              className="cancel-btn"
              onClick={() => {
                onclose(false);
              }}
            />
          </div>
          <div className="form">
            <form onSubmit={handleSignup}>
              <h2>Customer Sign up</h2>
              <div className="input_box">
                <input
                  type="text"
                  placeholder="Enter a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <AccountCircleIcon className="icon" />
              </div>
              <div className="input_box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <EmailIcon className="icon" />
              </div>
              <div className="input_box">
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <LockIcon className="icon" />
              </div>
              <div className="input_box">
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <LockIcon className="icon" />
              </div>
              <button className="button" type="submit">
                Register Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;

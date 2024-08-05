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
import registerimg from "../../assets/register.png";
import Instruction from "../ProviderInstructions/Instruction";

const Signup = ({ signupClose, loginClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openInstruct, setOpenInstruct] = useState(false);
  const [providerData, setProviderData] = useState({});

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
          signupClose(false);
          loginClose(true);
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

  const handleProviderRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setProviderData({ username, email, password });
    setOpenInstruct(true);
  };

  return (
    <>
      <div className="login">
        <div className="signup-container">
          <div className="titleCloseBtn">
            <ClearIcon
              className="cancel-btn"
              onClick={() => {
                signupClose(false);
              }}
            />
          </div>
          <div className="form">
            <div className="form-section">
              <form onSubmit={handleSignup}>
                <h2>Sign up</h2>
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
                <div className="button-div">
                  <button className="button" type="submit">
                    Register as Customer
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={handleProviderRegister}
                  >
                    Register as Provider
                  </button>
                </div>
                <div className="login_signup">
                  Already have an account?
                  <span
                    onClick={() => {
                      signupClose(false);
                      loginClose(true);
                    }}
                  >
                    Login
                  </span>
                </div>
              </form>
            </div>
            <div className="form-img">
              <img className="register-img" src={registerimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      {openInstruct && (
        <Instruction closeInstruct={setOpenInstruct} providerData={providerData} />
      )}
      <ToastContainer />
    </>
  );
};

export default Signup;

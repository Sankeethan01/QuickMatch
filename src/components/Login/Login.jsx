import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import loginGif from "../../assets/login.gif";
import registergif from "../../assets/register.webp";

const Login = ({ loginClose, signupClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/quickmatch_api/Login.php", {
        email,
        password,
        remember_me: rememberMe,
      });
      setMessage(response.data.message);
      console.log(response.data);
      const userType = response.data.user_type;
      if (userType === 'admin') {
        navigate('/adminhome');
      } else if (userType === 'customer') {
        navigate('/home');
      } else if (userType === 'provider') {
        navigate('/providerhome');
      }
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
       Logged in Successfully
    </Alert>
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed.");
      }
      console.error("Login error:", error); 
    }
  };

  return (
    <>
      <div className="login">
      <img className="login-gif" src={loginGif} alt="" />
        <div className="login-container">
          <div className="titleCloseBtn">
            <ClearIcon
              className="cancel-btn"
              onClick={() => {
                loginClose(false);
              }}
            />
          </div>
          <div className="form">
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <LockIcon className="icon" />
              </div>
              <div className="option_field">
                <span className="checkbox">
                  <input
                    type="checkbox"
                    id="check"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="check">Remember me</label>
                </span>
                <a href="#4" className="forgot_pw">
                  Forgot password?
                </a>
              </div>
              <button className="button" type="submit">
                Login Now
              </button>
              {message && <p>{message}</p>}
              <div className="login_signup">
                Don't have an account?
                <span
                  onClick={() => {
                    loginClose(false);
                    signupClose(true);
                  }}
                >
                  Register
                </span>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Login;

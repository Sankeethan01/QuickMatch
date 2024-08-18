import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import loginGif from "../../assets/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

const Login = ({ loginClose, signupClose }) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email.includes('@gmail.com'))
      {
        toast.error("Please enter valid email..");
        return;
      }
    try {
      const response = await axios.post(
        "http://localhost/quickmatch_api/login.php",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      if(response.data.success)
      {
        const { user_type, user_id } = response.data;

        toast.success(response.data.message);
  
        setTimeout(() => {
        
            sessionStorage.setItem("user_type", user_type);
            sessionStorage.setItem("user_id", user_id);
            sessionStorage.setItem("email", email);
    
          if (user_type === "admin") {
            navigate("/adminhome");
          } else if (user_type === "customer") {
            navigate("/home");
          } else if (user_type === "provider") {
            navigate("/providerIntro");
          }
  
        }, 3000);
      }
     else{
      toast.error(response.data.message);
     }
      
      
     
     
      
    } catch (error) {
      if (error.response && error.response.data) {
       toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Try again..");
      }
      
    }
  };

  const handleForgotPassword = async () => {
    if(!forgotPasswordEmail.includes('@gmail.com'))
      {
        toast.error("Please enter valid email..");
        return;
      }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if(!passwordRegex.test(newPassword))
    {
      toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one number.");
      return;
    }
   

    try {
      const response = await axios.post(
        "http://localhost/quickmatch_api/changePassword.php",
        {
          email: forgotPasswordEmail,
          new_password: newPassword,
        }
      );

      toast.success(response.data.message);
      setShowForgotPasswordModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Password reset failed.");
      }
    }
  };

  return (
    <>
      <div className="login">
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
            <div className="login-img">
              <img className="login-gif" src={loginGif} alt="" />
            </div>
            <div className="login-form">
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
                  <span
                    className="forgot_pw"
                    onClick={() => setShowForgotPasswordModal(true)}
                  >
                    Forgot password?
                  </span>
                </div>
                <button className="button" type="submit">
                  Login Now
                </button>
                
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
      </div>

      <Modal
        show={showForgotPasswordModal}
        onHide={() => setShowForgotPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Login;

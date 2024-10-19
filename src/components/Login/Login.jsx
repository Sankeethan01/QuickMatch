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
  const [forgotPasswordUsername,setForgotPasswordUsername] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [checkOTP,setCheckOTP] = useState("");

  //Handle login 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.includes('@gmail.com')) {
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
      if (response.data.success) {
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
      else {
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
// Handle forgot password
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.includes('@gmail.com')) {
      toast.error("Please enter valid email..");
      return;
    }
    try {
      if(step === 1)
      {
        const response = await axios.post("http://localhost/quickmatch_api/generateOTP.php",
          {
            email: forgotPasswordEmail,
            username: forgotPasswordUsername,
          }
        );

        if(response.data.success)
        {
          toast.success(response.data.message);
          setCheckOTP(response.data.otp);
          console.log(response.data.otp);
          setStep(2);
        }
        else{
          toast.error(response.data.message);
        }
      }
      else if(step === 2)
      {
        console.log(otp);
        if(parseInt(otp) === parseInt(checkOTP))
        {
          toast.success("OTP verified successfully...");
          setCheckOTP("");
          setStep(3);
        }
        else{
          toast.error("Invalid OTP, Try again later...");
          setTimeout(() => {
            setShowForgotPasswordModal(false);
          }, 1000); 
        }
      }
      else if(step === 3)
      {
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    
        if (!passwordRegex.test(newPassword)) {
          toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one number.");
          return;
        }

        const response = await axios.post(
          "http://localhost/quickmatch_api/changePassword.php",
          {
            email: forgotPasswordEmail,
            new_password: newPassword,
          }
        );

        if(response.data.success)
        {
          toast.success(response.data.message);
          setTimeout(() => {
            setShowForgotPasswordModal(false);
          }, 1000); 
        }
        else{
          toast.error(response.data.message);
          setTimeout(() => {
            setShowForgotPasswordModal(false);
          }, 1000); 
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Password reset failed.");
      }
    }
  }
  // login page

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
        className="forgot-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {step === 1 &&
             <>
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
              <Form.Group>
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Username"
                  value={forgotPasswordUsername}
                  onChange={(e) => setForgotPasswordUsername(e.target.value)}
                  required
                />
              </Form.Group>
             </>
              }

            {step === 2 &&
              <Form.Group controlId="formOtp">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
            }

            {step === 3 &&
              <>
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
              </>
            }

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowForgotPasswordModal(false)}
          >
            close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Login;

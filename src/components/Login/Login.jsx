import React from "react";
import "./Login.css";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = ({ loginClose, signupClose }) => {
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
            <form>
              <h2>Login</h2>

              <div className="input_box">
                <input type="email" placeholder="Enter your email" required />
                <EmailIcon className="icon" />
              </div>
              <div className="input_box">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <LockIcon className="icon" />
              </div>

              <div className="option_field">
                <span className="checkbox">
                  <input type="checkbox" id="check" />
                  <label for="check">Remember me</label>
                </span>
                <a href="#4" className="forgot_pw">
                  Forgot password?
                </a>
                              </div>

              <button className="button">Login Now</button>

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

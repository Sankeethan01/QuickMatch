import React from 'react'
import ClearIcon from "@mui/icons-material/Clear";
import '../Login/Login.css'
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const ForgotPassword = ({closeForgotPassword}) => {
  return (
    <>   <div className="login">
    <div className="login-container">
      <div className="titleCloseBtn">
        <ClearIcon
          className="cancel-btn"
          onClick={() => {
            closeForgotPassword(false);
          }}
        />
      </div>
      <div className="form">
        <div className="login-img"><img className="login-gif" src="" alt="" /></div>
        <div className="login-form">
          <form >
          <h2>Change Password</h2>
          <div className="input_box">
            <input
              type="email"
              placeholder="Enter your email"
             
             
              required
            />
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
         
          <button className="button" type="submit">
            Change Password
          </button>
          
          <div className="login_signup">
            Don't have an account?
            
          </div>
        </form>
        </div>
      </div>
    </div>
    
  </div></>
  )
}

export default ForgotPassword
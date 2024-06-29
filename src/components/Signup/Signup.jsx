import React from 'react'
import '../Login/Login.css'
import './Signup.css'
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Signup = ({onclose}) => {



  return (
    <>
    <div className="login">
      <div className="signup-container">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={()=>{
            onclose(false)}} />
        </div>
        <div className="form">
          <form>
            <h2>Customer Sign up</h2>
            <div className="input_box">
              <input type="text" placeholder="Enter a username" required />
              <AccountCircleIcon className="icon"/>
            </div>

            <div className="input_box">
              <input type="email" placeholder="Enter your email" required />
              <EmailIcon className="icon"/>
            </div>
            <div className="input_box">
              <input
                type="password"
                placeholder="Create password"
                required
              />
              <LockIcon className="icon" />
            </div>

            <div className="input_box">
              <input
                type="password"
                placeholder="Confirm password"
                required
              />
              <LockIcon className="icon" />
            </div>

            

            <button className="button" onClick={()=>{
                onclose(false)
            }}>Register Now</button>

          </form>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Signup
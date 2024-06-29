import React, { useState } from 'react'
import './SignupProvider.css'
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Instruction from '../ProviderInstructions/Instruction';

const SignupProvider = ({setClose}) => {

    const [showInstruction,setShowInstruction] = useState(false);
     
  return (
    <>
    <div className="login">
      <div className="signup-container">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={()=>{
            setClose(false)}} />
        </div>
        <div className="form">
          <form>
            <h2>Provider Sign up</h2>
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
                setShowInstruction(true);
            }}>Next</button>

          </form>
        </div>
      </div>
    </div>
      {
        showInstruction && (
            <Instruction  closeInstruct={setShowInstruction}/>
        )
      }
    </>
  )
}

export default SignupProvider
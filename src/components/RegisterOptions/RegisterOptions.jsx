import React, { useState } from 'react'
import './RegisterOptions.css'
import ClearIcon from "@mui/icons-material/Clear";
import Signup from '../Signup/Signup';
import SignupProvider from '../SignupProvider/SignupProvider';

const RegisterOptions = ({signupClose,loginClose}) => {

     const [customerSignup,setCustomerSignup] = useState(false);
     const [providerSignup,setProviderSignup] = useState(false);
     
     
  return (
    <>
      <div className='register-option'>
        <div className='option-continer'>
        <div className="titleCloseBtn">
        <ClearIcon className="cancel-btn" onClick={()=>{
            signupClose(false)}} />
              </div>
              <div className="button-div">
              <button className="button" onClick={()=>{
                setCustomerSignup(true);
                
              }}>Register as Customer</button>
              <button className="button" onClick={()=>{
                setProviderSignup(true);
              
              }}>Register as Service Provider</button>
              </div>
              <div className="login_signup">
              Already have an account?
              <span onClick={()=>{
                signupClose(false);
                loginClose(true);
              }}>Login</span>
            </div>
        </div>
         {customerSignup && (
            <Signup onclose ={setCustomerSignup} />
         )}
         {
            providerSignup && (
                <SignupProvider setClose={setProviderSignup} />
            )
         }
      </div>
    </>
  )
}

export default RegisterOptions
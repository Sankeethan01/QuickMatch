import React, { useEffect } from 'react'
import './PopupVerification.css'
import ClearIcon from "@mui/icons-material/Clear";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

const PopupVerification = ({ data, onclose }) => {

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const response = await axios.get(`http://localhost/quickmatch_api/checkVerifyId.php?verify_id=${data.id}`);
        console.log(response.data);
        if (response.data) {
          document.getElementById('veryfyBtn').style.display = 'none';
          document.getElementById('verificationStatus').style.display = 'block';
        }

      } catch (error) {
        toast.error('Error checking verification status:', error);
      }
    };

    checkVerificationStatus();
  }, [data.id]);
    const handleVerify = async () => {
      try {
        console.log(data.id);
        const response = await axios.post('http://localhost/quickmatch_api/providerSignup.php?',
          {
            verify_id: data.id,
          }
        );
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message);
           
          
        } else {
          toast.error( response.data.message);
          onclose(false);
        }
      } catch (error) {
       toast.error('Error verifying provider:', error);
      }
    };


  return (
    <div className='popup-verify' open onClose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Verification Details</h3>
          <p>Verification Id: {data.id}</p>
          <p>Username: {data.username}</p>
        </div>
        <div className='body'>
          <p className="small-head">Required Details</p>
          <div className='info'>
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Service: {data.service_category}</p>
            <p>Registered: {data.date}</p>
          </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
         
          <p>Description: {data.description}</p>
          <p>Services: {data.services}</p>
          <p>
            <a
              href={`http://localhost/quickmatch_api/verifypdfs/${data.proof}`} // Assuming `data.proof` holds the file name
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              View Proof PDF
            </a>
          </p>
        </div>
        <div className="footer-btn">
          <button onClick={handleVerify} id='veryfyBtn'>Verify</button>
          <span id="verificationStatus" style={{display:'none',color:'green',marginRight:'10px',fontSize:'1.3rem'}}>Verified</span>
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
};

export default PopupVerification;

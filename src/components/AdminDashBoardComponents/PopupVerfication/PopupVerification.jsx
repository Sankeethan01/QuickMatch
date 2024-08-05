import React from 'react'
import './PopupVerification.css'
import ClearIcon from "@mui/icons-material/Clear";
import axios from 'axios';

const PopupVerification = ({ data, onclose }) => {

  
    const handleVerify = async () => {
      try {
        const response = await axios.post('http://localhost/quickmatch_api/verificationDetails.php', { id: data.id });
        if (response.data.success) {
          alert('Provider verified and added successfully!');
          
        } else {
          alert( response.data.message);
          onclose(false);
        }
      } catch (error) {
        console.error('Error verifying provider:', error);
        alert('An error occurred while verifying the provider.');
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
          <button onClick={handleVerify}>Verify</button>
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
};

export default PopupVerification;

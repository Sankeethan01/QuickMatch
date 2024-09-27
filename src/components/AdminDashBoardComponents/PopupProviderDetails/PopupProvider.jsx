import React, { useEffect, useState } from 'react'
import './PopupProvider.css'
import ClearIcon from "@mui/icons-material/Clear";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const PopupProvider = ({ data, onclose }) => {

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(data.disable_status === "disabled");
    console.log(data.disable_status);
  }, [data.disable_status]);

  const handleDisableUser = async () => {
    const newStatus = isDisabled ? 'active' : 'disabled'; // Determine the new status
    console.log(`Attempting to change status to: ${newStatus}`); // Log the status being sent
  
    try {
      const response = await axios.get(`http://localhost/quickmatch_api/disableUser.php`, {
        params: { 
          id: data.user_id, 
          status: newStatus 
        }
      });
  
      if (response.data.success) {
        console.log(`Status successfully updated to: ${newStatus}`);
        toast.warn(`Customer status  changed : ${newStatus}`);
        setIsDisabled(!isDisabled);  
        data.status = newStatus;     
      } else {
        console.error("Failed to update status", response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the user status!", error);
    }
  };
  


  return (
    <div className='popup-provider' open onclose={onclose}>
        <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Provider Details</h3>
          <p>Provider Id : {data.id}</p>
          <p>Username : {data.username}</p>
        </div>
        <div className='body'>
        <p className="small-head">Required Details</p>
        <div className='info'>
        <img src={`http://localhost/quickmatch_api/profile_images/${data.profile_image}`} alt="" />
        
        <div className=''>
        <h5>{data.name}</h5>
         
          <p>{data.email}</p>
          <p>{data.service_category}</p>
        </div>
        </div>
        </div>
        
        <div className="body">
          <p className="small-head">Additional Details</p>
          <p>Address : {data.address}</p>
          <p>Status : {data.status ? 'Online' : 'Offline'}</p>
          
          
        </div>
        <div className="body-more">
          <p className="small-head">More Details</p>
          <p>Description : {data.description}</p>
          <p>Services : {data.services}</p>
          <p>Qualification : {data.qualification}</p>
          <p>Charge : {data.charge}</p>
          
        </div>
        <div className="footer-btn">
        <button
            onClick={handleDisableUser}
            id="disableBtn"
            style={{
              backgroundColor: isDisabled ? "gray" : "darkblue",
              color: "white",
            }}
            
          >
            {isDisabled ? "Disabled" : "Disable User"}
          </button>
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PopupProvider
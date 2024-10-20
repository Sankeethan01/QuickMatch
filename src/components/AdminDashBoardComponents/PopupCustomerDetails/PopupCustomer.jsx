import React, { useEffect, useState } from "react";
import "./PopupCustomer.css";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PopupCustomer = ({ data, onclose }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsDisabled(data.status === "disabled");
    console.log(data.status);
  }, [data.status]);

  const handleDisableUser = async () => {
    const newStatus = isDisabled ? 'active' : 'disabled';
    setIsLoading(true);
    console.log(`Attempting to change status to: ${newStatus}`);

    try {
      const response = await axios.get(`http://localhost/quickmatch_api/disableUser.php`, {
        params: {
          id: data.id,
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
    setIsLoading(false);
  };


  return (
    <div className="popup-customer" open onclose={onclose}>
      <div className="popup-box">
        <div className="titleCloseBtn">
          <ClearIcon className="cancel-btn" onClick={onclose} />
        </div>
        <div className="title">
          <h3>Customer Details</h3>
          <p>Customer Id : {data.id}</p>
          <p>Username : {data.username}</p>
        </div>
        <div className="body">
          <p className="small-head">Required Details</p>
          <div className="info">
            <img
              src={`http://localhost/quickmatch_api/profile_images/${data.profile_image}`}
              alt=""
            />

            <div className="">
              <h5>{data.name}</h5>

              <p>{data.email}</p>
            </div>
          </div>
        </div>

        <div className="body">
          <p className="small-head">Additional Details</p>

          <p>Contact No : {data.phone}</p>

          <p>National ID : {data.national_id}</p>
          <p>Address : {data.address}</p>
        </div>
        <div className="footer-btn">
          <button
            onClick={handleDisableUser}
            id="disableBtn"
            disabled={isLoading}
            style={{
              backgroundColor: isDisabled ? "gray" : "darkblue",
              color: "white",
            }}
          >
            {isLoading
              ? isDisabled
                ? "Enabling..."
                : "Disabling..."
              : isDisabled
                ? "Disabled"
                : "Disable User"}
          </button>
          <button onClick={onclose} id="cancelBtn">
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PopupCustomer;

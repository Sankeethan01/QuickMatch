import React from "react";
import "./AdminSettings.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PublishIcon from "@mui/icons-material/Publish";
import user from '../../../assets/user-1.png'
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";

const AdminSettings = () => {
  return (
    <div className="admin-settings">
      <AdminNavbar />
      
          <PageTitle  heading='Settings'/>
          <div className="admin-profile">
            <div className="adminContainer">
              <div className="userShow">
                <div className="userShowTop">
                  <img
                    src={user}
                    alt=""
                    className="userShowImg"
                  />
                  <div className="userShowTopTitle">
                    <span className="userShowUsername">Deluxshana</span>
                    <span className="userShowUserTitle">Admin</span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>
                  <div className="userShowInfo">
                    <PersonOutlineIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">dinasana10</span>
                  </div>
                  <div className="userShowInfo">
                  <EmailIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      dinasana10@gmail.com
                    </span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <PhoneIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">+76 411 1147</span>
                  </div>
                  <div className="userShowInfo">
                    <AddLocationIcon className="userShowIcon" />
                    <span className="userShowInfoTitle">Point Pedro | Jaffna</span>
                  </div>
                </div>
              </div>
              <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="annabeck99"
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Deluxshana"
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Email</label>
                      <input
                        type="text"
                        placeholder="dinasana10@gmail.com"
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Phone</label>
                      <input
                        type="text"
                        placeholder="+76 411 1147"
                        className="userUpdateInput"
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Point Pedro | Jaffna"
                        className="userUpdateInput"
                      />
                    </div>
                  </div>
                  <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                      <img
                        className="userUpdateImg"
                        src={user}
                        alt=""
                      />
                      <label htmlFor="file">
                        <PublishIcon className="userUpdateIcon" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
                    </div>
                    <button className="userUpdateButton">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    
    </div>
  );
};

export default AdminSettings;

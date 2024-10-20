import React, { useEffect, useRef, useState } from "react";
import "./AdminSettings.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PublishIcon from "@mui/icons-material/Publish";
import PageTitle from "../../../components/AdminDashBoardComponents/PageTitle/PageTitle";
import AdminNavbar from "../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar";
import axios from "axios";
import userAvatar from "../../../assets/user-3.png"; // Import userAvatar if it's not imported
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../../components/Footer/Footer";

const AdminSettings = () => {
  const [inputs, setInputs] = useState({
    user_id: "",
    name: "",
    username: "",
    email: "",
    type: "",
    phone: "",
    address: "",
    profile_image: null,
  });
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [profileImageChanged, setProfileImageChanged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }

     if(sessionStorage.getItem('user_type') !== 'admin')
      {
           sessionStorage.clear();
            navigate('/');
      }
    const user_id = sessionStorage.getItem("user_id");

    if (user_id) {
      setTimeout(() => {
        fetchData(user_id);
      }, 1000);
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost/quickmatch_api/getAdminDetail.php?user_id=${user_id}`);
      const data = response.data;
      if (data) {
        setInputs({
          ...data,
          profile_image: data.profile_image ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}` : userAvatar,
        });
        console.log(inputs);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleImageChange = (event) => {
    setInputs((prevInputs) => ({ ...prevInputs, profile_image: event.target.files[0] }));
    setProfileImageChanged(true);
  };

  const handleSubmit = async (event) => {
  
    event.preventDefault();

    const formData = new FormData();
    formData.append('user_id', inputs.user_id);
    formData.append('name', inputs.name);
    formData.append('username', inputs.username);
    formData.append('phone', inputs.phone);
    formData.append('address', inputs.address);

    if (profileImageChanged) {
      formData.append("profile_image", inputs.profile_image);
    }

    try {
      const response = await axios.post('http://localhost/quickmatch_api/updateAdminProfile.php', formData);
      console.log(response.data);
      toast.success("Profile updated successfully...");
    } catch (error) {
      console.error('There was an error!', error);
      toast.error("Error occurred while updating...");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }

  const profileImageUrl = inputs.profile_image instanceof File
    ? URL.createObjectURL(inputs.profile_image)
    : inputs.profile_image;

  return (
    <>
    <div className="admin-settings">
      <AdminNavbar />
      <PageTitle heading="Profile Settings" />
      <div className="admin-profile">
        <div className="adminContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src={profileImageUrl} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{inputs.name}</span>
                <span className="userShowUserTitle">Admin</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PersonOutlineIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{inputs.username}</span>
              </div>
              <div className="userShowInfo">
                <EmailIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{inputs.email}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{inputs.phone}</span>
              </div>
              <div className="userShowInfo">
                <AddLocationIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{inputs.address}</span>
              </div>
            </div>
          </div>

          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={inputs.username}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Contact No</label>
                  <input
                    type="text"
                    name="phone"
                    value={inputs.phone}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={inputs.address}
                    className="userUpdateInput"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={profileImageUrl}
                    alt="Profile"
                  />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <button className="userUpdateButton" type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer />
    </>
  );
};

export default AdminSettings;

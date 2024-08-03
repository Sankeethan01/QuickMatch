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

const AdminSettings = () => {

   const [inputs,setInputs] = useState({});
   const [loading, setLoading] = useState(true);
   const scrollRef = useRef(null);
   const [profileImageChanged, setProfileImageChanged] = useState(false);

   const adminId= 1;
    
   useEffect(() => {
    
    getAdminDetails(adminId);
   },[adminId]);

   useEffect(() => {
    // Restore scroll position after reload
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);


   const getAdminDetails = async (adminId) => {
     try{
        const response = await axios.get(`http://localhost/quickmatch_api/admin.php?id=${adminId}`);
       
        setInputs(response.data);
         
        setLoading(false);
     }
     catch(error) {
       console.error('Error fetching admin details: ', error);
     }
   }

   const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  const handleImageChange = (event) => {
    setInputs(inputs => ({ ...inputs, profile_image: event.target.files[0] }));
    setProfileImageChanged(true);
  };

   const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('id',adminId);
    formData.append('name',inputs.name);
    formData.append('username',inputs.username);
    formData.append('phone',inputs.phone);
    formData.append('address',inputs.address);

    if (profileImageChanged) {
      formData.append("profile_image", inputs.profile_image);
    }
   
      axios.post('http://localhost/quickmatch_api/admin.php', formData)
      .then(response => {
        console.log(response.data);
        window.location.reload();
        
      })
      .catch(error => console.error('There was an error!', error));

     

  };
   

   if (loading) {
    return <div>Loading...</div>;
  }

  

  const profileImageUrl =
    inputs.profile_image &&
    (inputs.profile_image instanceof File
      ? URL.createObjectURL(inputs.profile_image)
      : `http://localhost/quickmatch_api/profile_images/${inputs.profile_image}`);


  return (
    <div className="admin-settings">
      <AdminNavbar />
      
          <PageTitle  heading='Profile Settings'/>
          <div className="admin-profile">
            <div className="adminContainer">
              <div className="userShow">
                <div className="userShowTop">
                  <img
                    src={profileImageUrl}
                    alt=""
                    className="userShowImg"
                  />
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
                    <span className="userShowInfoTitle">
                    {inputs.email}
                    </span>
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
                        placeholder={inputs.username || ''}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder={inputs.name || ''}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="userUpdateItem">
                      <label>Contact No</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder={inputs.phone || ''}
                        className="userUpdateInput"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder={inputs.address || ''}
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
    
    </div>
  );
};

export default AdminSettings;

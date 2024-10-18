import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ServiceProviderDashboardComponents/Profile/Profile.css'; // Import the CSS file
import userAvatar from "../../../assets/user-3.png";
import { ToastContainer, toast } from "react-toastify";

const districts = [
  '','Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    type: "",
    avatar: "",
    username: "",
    email: "",
    contactNumber: "",
    nationalId: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    ...profile,
    city: "", 
    district: "", 
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch user ID from session (local storage in this case)
      const user_id = sessionStorage.getItem('user_id'); 
      if (!user_id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost/quickmatch_api/getCustomerDetail.php?user_id=${user_id}`);
      const data = response.data;
      if (data) { 
        const address = data.address;
        const [city, district] = data.address.split(' | ');
        setProfile({
          user_id:data.user_id,
          name: data.name,
          username: data.username,
          email: data.email,
          type: data.user_type,
          avatar: data.profile_image ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}` : userAvatar,
          contactNumber: data.phone,
          nationalId: data.national_id,
          location: address,
        });
        setForm({
          user_id:data.user_id,
          name: data.name,
          username: data.username,
          email: data.email,
          type: data.user_type,
          contactNumber: data.phone,
          nationalId: data.national_id,
          city: city || "",
          district: district || "",
          avatar: data.profile_image ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}` : userAvatar,
        });
      }
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      const city = name === "city" ? value : updatedForm.city;
      const district = name === "district" ? value : updatedForm.district;
      updatedForm.location = `${city} | ${district}`;
      return updatedForm;
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfilePicFile(file);
        setForm((prevForm) => {
            const city = prevForm.city || "";
            const district = prevForm.district || "";
            return {
                ...prevForm,
                avatar: URL.createObjectURL(file),
                location: `${city} | ${district}`, 
            };
        });
    }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const location = form.location || profile.location;

    const formData = new FormData();
    formData.append('user_id',form.user_id);
    formData.append('name', form.name);
    formData.append('username', form.username);
    formData.append('contactNumber', form.contactNumber);
    formData.append('location', location);
    formData.append('nationalId', form.nationalId);

    if (profilePicFile) {
      formData.append('profile_image', profilePicFile);
    }

    try {
      const response = await axios.post("http://localhost/quickmatch_api/updateCustomerProfile.php", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setProfile({ ...form ,location});
          setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
    <div className="profile-container">
      <h2>Profile Settings</h2>
      <div className="profile-card">
        <img
          src={profile.avatar}
          alt="Profile"
          className="profile-picture"
        />
        {isEditing ? (
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <label>
              Name :
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Username :
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email :
              <input
                type="email"
                name="email"
                value={form.email}
                
              />
            </label>
            <label>
              Contact Number :
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleInputChange}
                maxLength={10}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInputChange}
              />
            </label>
            <label>
              District:
              <select
                name="district"
                value={form.district}
                onChange={handleInputChange}
              >
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </label>
            <label>
              National ID:
              <input
                type="text"
                name="nationalId"
                value={form.nationalId}
                onChange={handleInputChange}
                maxLength={12}
              />
            </label>
            <label>
              Profile Picture :
              <input
                type="file"
               name='profile_image'
                onChange={handleProfilePicChange}
              />
            </label>
            <button
              type="submit"
  
              className="save-button"
              disabled={loading}
            >
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className='cancel-button'>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Name :</strong> {profile.name}</p>
            <p><strong>Username :</strong> {profile.username}</p>
            <p><strong>Email :</strong> {profile.email}</p>
            <p><strong>Contact Number :</strong> {profile.contactNumber}</p>
            <p><strong>National ID :</strong> {profile.nationalId}</p>
            <p><strong>Address :</strong> {profile.location}</p>
            <button
              onClick={handleEditClick}
              className="edit-button"
            >
              Edit Profile
            </button>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default ProfilePage;

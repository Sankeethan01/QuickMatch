import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../ServiceProviderDashboardComponents/Profile/Profile.css'; // Import the CSS file
import userAvatar from "../../../assets/user-3.png";

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
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
  const [form, setForm] = useState(profile);
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
      const user_id = sessionStorage.getItem('user_id')  ||  localStorage.getItem('user_id'); 
      if (!user_id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost/quickmatch_api/customerDetails.php?user_id=${user_id}`);
      const data = response.data;
      if (data && data.length > 0) {
        const fetchedUser = data[0];
        setProfile({
          user_id:fetchedUser.user_id,
          name: fetchedUser.name,
          username: fetchedUser.username,
          email: fetchedUser.email,
          type: fetchedUser.user_type,
          avatar: fetchedUser.profile_image ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}` : userAvatar,
          contactNumber: fetchedUser.phone,
          nationalId: fetchedUser.national_id,
          location: fetchedUser.address,
        });
        setForm({
          user_id:fetchedUser.user_id,
          name: fetchedUser.name,
          username: fetchedUser.username,
          email: fetchedUser.email,
          type: fetchedUser.user_type,
          avatar: fetchedUser.profile_image ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}` : userAvatar,
          contactNumber: fetchedUser.phone,
          nationalId: fetchedUser.national_id,
          location: fetchedUser.address,
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
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setForm({
        ...form,
        avatar: URL.createObjectURL(file),
      });
    }
  };
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('id',form.user_id );
    formData.append('name', form.name);
    formData.append('username', form.username);
    formData.append('phone', form.contactNumber);
    formData.append('address', form.location);
    formData.append('national_id', form.nationalId);
    if (profilePicFile) {
      formData.append('profile_image', profilePicFile);
    }

    try {
      const response = await axios.post("http://localhost/quickmatch_api/customerDetails.php", formData);
      if (response.data.success) {
        setProfile(form);
        setIsEditing(false);
      
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      setError("Failed to update profile");
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
              Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <select
                name="location"
                value={form.location}
                onChange={handleInputChange}
              >
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
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
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                accept="image/*"
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
            <button type="button" onClick={() => setIsEditing(false)} className='save-button'>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Contact Number:</strong> {profile.contactNumber}</p>
            <p><strong>National ID:</strong> {profile.nationalId}</p>
            <p><strong>Location:</strong> {profile.location}</p>
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
  );
};

export default ProfilePage;

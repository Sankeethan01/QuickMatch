import React, { useState } from 'react';
import '../../ServiceProviderDashboardComponents/Profile/Profile.css'; // Import the CSS file

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    contactNumber: '123-456-7890',
    
    profilePicture: 'https://via.placeholder.com/150',
    
    location: 'Colombo',
    
    nationalId: '123456789V', // National ID Card Number
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);

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
      setForm({
        ...form,
        profilePicture: URL.createObjectURL(file),
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Account Settings</h2>
      <div className="profile-card">
        <img
          src={profile.profilePicture}
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
            >
              Save
            </button>
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
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useState } from 'react';
import './Profile.css'; // Import the CSS file

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
    bio: 'Experienced service provider specializing in electrical services.',
    profilePicture: 'https://via.placeholder.com/150',
    serviceType: 'Electric services',
    location: 'Colombo',
    qualifications: 'Certified Electrician with 10 years of experience.',
    services: 'Electrical installations, Repairs, Maintenance.',
    chargesPerDay: { min: 5000, max: 10000 }, // Charges per day range
    certificates: [],
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

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      chargesPerDay: {
        ...form.chargesPerDay,
        [name]: Number(value)
      }
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({
      ...form,
      certificates: files,
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
              Bio:
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Service Type:
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleInputChange}
              >
                <option value="Electric and electronic services">Electric and electronic services</option>
                <option value="Construction services">Construction services</option>
                <option value="Event management services">Event management services</option>
              </select>
            </label>
            <label>
              Services:
              <textarea
                name="services"
                value={form.services}
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
              Charges per Day (LKR):
              <div className="range-inputs">
                <input
                  type="number"
                  name="min"
                  value={form.chargesPerDay.min}
                  onChange={handleRangeChange}
                  placeholder="Min"
                  className="range-input"
                />
                <span> - </span>
                <input
                  type="number"
                  name="max"
                  value={form.chargesPerDay.max}
                  onChange={handleRangeChange}
                  placeholder="Max"
                  className="range-input"
                />
              </div>
            </label>
            <label>
              Qualifications:
              <textarea
                name="qualifications"
                value={form.qualifications}
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
            <label>
              Certificate Images:
              <input
                type="file"
                name="certificates"
                multiple
                onChange={handleFileChange}
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
            <p><strong>Bio:</strong> <div className="text-box">{profile.bio}</div></p>
            <p><strong>Service Type:</strong> {profile.serviceType}</p>
            <p><strong>Services:</strong> <div className="text-box">{profile.services}</div></p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Charges per Day:</strong> LKR {profile.chargesPerDay.min} - {profile.chargesPerDay.max}</p>
            <p><strong>Qualifications:</strong> <div className="text-box">{profile.qualifications}</div></p>
            {profile.certificates.length > 0 && (
              <div>
                <strong>Certificate Images:</strong>
                <div className="certificate-images">
                  {profile.certificates.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Certificate ${index + 1}`}
                      className="certificate-thumbnail"
                    />
                  ))}
                </div>
              </div>
            )}
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

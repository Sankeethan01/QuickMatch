import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import the CSS file
import axios from 'axios';
import userAvatar from "../../../assets/user-3.png";

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
  'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    user_id: "",
    name: "",
    username: "",
    email: "",
    type: "",
    avatar: userAvatar,
    contactNumber: "",
    nationalId: "",
    location: "",
    bio: "",
    status: "",
    serviceType: "",
    services: "",
    chargesPerDay: "",
    qualifications: "",
    certificates: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [certificateFiles, setCertificateFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user_id = sessionStorage.getItem('user_id') || localStorage.getItem('user_id');
      if (!user_id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost/quickmatch_api/providerDetails.php?user_id=${user_id}`);
      const data = response.data;
      if (data && data.length > 0) {
        const fetchedUser = data[0];
        setProfile({
          user_id: fetchedUser.user_id,
          name: fetchedUser.name,
          username: fetchedUser.username,
          email: fetchedUser.email,
          type: fetchedUser.user_type,
          avatar: fetchedUser.profile_image ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}` : userAvatar,
          contactNumber: fetchedUser.phone,
          nationalId: fetchedUser.national_id,
          location: fetchedUser.address,
          status: fetchedUser.status === "yes" ? "1" : "0",
          bio: fetchedUser.description || "",
          serviceType: fetchedUser.user_type || "",
          services: fetchedUser.services || "",
          chargesPerDay: fetchedUser.charge,
          qualifications: fetchedUser.qualification || "",
          certificates: fetchedUser.certificates || [],
        });
        setForm({
          user_id: fetchedUser.user_id,
          name: fetchedUser.name,
          username: fetchedUser.username,
          email: fetchedUser.email,
          type: fetchedUser.user_type,
          avatar: fetchedUser.profile_image ? `http://localhost/quickmatch_api/profile_images/${fetchedUser.profile_image}` : userAvatar,
          contactNumber: fetchedUser.phone,
          nationalId: fetchedUser.national_id,
          location: fetchedUser.address,
          status: fetchedUser.status === "yes" ? "1" : "0",
          bio: fetchedUser.description || "",
          serviceType: fetchedUser.user_type || "",
          services: fetchedUser.services || "",
          chargesPerDay: fetchedUser.charge,
          qualifications: fetchedUser.qualification || "",
          certificates: fetchedUser.certificates || [],
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCertificateFiles(files);
    setForm({
      ...form,
      certificates: files,
    });
  };

  

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setForm({
      ...form,
      status: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('id', form.user_id);
    formData.append('name', form.name);
    formData.append('username', form.username);
    formData.append('phone', form.contactNumber);
    formData.append('address', form.location);
    formData.append('national_id', form.nationalId);
    formData.append('status', form.status);
    formData.append('bio', form.bio);
    formData.append('serviceType', form.serviceType);
    formData.append('services', form.services);
    formData.append('chargesPerDay', form.chargesPerDay);
    formData.append('qualifications', form.qualifications);

    if (profilePicFile) {
      formData.append('profile_image', profilePicFile);
    }

    certificateFiles.forEach((file, index) => {
      formData.append('certificates', file);
    });

    try {
      const response = await axios.post("http://localhost/quickmatch_api/providerDetails.php", formData);
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
                Provider Status:
               <div className="radio-group">
               <label>Yes</label>
             <input
      type="radio"
      name="status"
      value="1"
      checked={form.status === "yes"}
      onChange={handleStatusChange}
    />
      <label>No</label>
    <input
      type="radio"
      name="status"
      value="0"
      checked={form.status === "no"}
      onChange={handleStatusChange}
    />
  
  </div>
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
              Charges Per Day: {form.chargesPerDay}
              <input
                type="text"
                name="chargesPerDay"
                value={form.chargesPerDay}
                onChange={handleInputChange}
              />
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
                name="profilePic"
                onChange={handleProfilePicChange}
              />
            </label>
            <label>
              Certificates:
              <input
                type="file"
                name="certificates"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <button type="submit" className='save-button'>Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className='save-button'>Cancel</button>
          </form>
        ) : (
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Contact Number: {profile.contactNumber}</p>
            <p>Provider Status: {profile.status === 1 ? "Yes" : "No"}</p>
            <p>Bio: {profile.bio}</p>
            <p>Service Type: {profile.serviceType}</p>
            <p>Services: {profile.services}</p>
            <p>Location: {profile.location}</p>
            <p>National ID: {profile.nationalId}</p>
            <p>Charges Per Day: {profile.chargesPerDay}</p>
            <p>Qualifications: {profile.qualifications}</p>
            
            <button onClick={handleEditClick} className='edit-button'>Edit Profile</button>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProfilePage;


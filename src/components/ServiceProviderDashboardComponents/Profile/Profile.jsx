import React, { useState, useEffect } from "react";
import "./Profile.css"; // Import the CSS file
import axios from "axios";
import userAvatar from "../../../assets/user-3.png";

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    user_id: "",
    name: "",
    username: "",
    email: "",
    type: "",
    contactNumber: "",
    nationalId: "",
    location: "",
    bio: "",
    status: "",
    serviceType: "",
    services: "",
    chargesPerDay: "",
    qualifications: "",
    avatar: "",
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
      const user_id = sessionStorage.getItem("user_id");
      if (!user_id) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost/quickmatch_api/getProviderDetail.php?user_id=${user_id}`
      );
      const data = response.data;
      if (data) {
        const address = data.address;
        const [city, district] = data.address.split(" | ");
        setProfile({
          user_id: data.user_id,
          provider_id: data.provider_id,
          name: data.name,
          username: data.username,
          email: data.email,
          serviceType: data.service_category_id,
          avatar: data.profile_image
            ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}`
            : userAvatar,
          contactNumber: data.phone,
          nationalId: data.national_id,
          location: address,
          bio: data.description,
          services: data.services || "",
          chargesPerDay: data.charge_per_day,
          qualifications: data.qualification || "",
        });
        setForm({
          user_id: data.user_id,
          provider_id: data.provider_id,
          name: data.name,
          username: data.username,
          email: data.email,
          serviceType: data.service_category_id,
          avatar: data.profile_image
            ? `http://localhost/quickmatch_api/profile_images/${data.profile_image}`
            : userAvatar,
          contactNumber: data.phone,
          nationalId: data.national_id,
          city: city || "",
          district: district || "",
          bio: data.description,
          services: data.services || "",
          chargesPerDay: data.charge_per_day,
          qualifications: data.qualification || "",
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

  const serviceTypeMapping = {
    S01: "Electric Service",
    S02: "Electronic Service",
    S03: "Construction Service",
    S04: "Event Management Service",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("user_id", profile.user_id);
    formData.append("provider_id", profile.provider_id);
    formData.append("name", form.name || "");
    formData.append("username", form.username || "");
    formData.append("contactNumber", form.contactNumber || "");
    formData.append("location", form.location || "");
    formData.append("nationalId", form.nationalId || "");
    formData.append("status", form.status || "");
    formData.append("bio", form.bio || "");
    formData.append("services", form.services || "");
    formData.append("chargesPerDay", form.chargesPerDay || "");
    formData.append("qualifications", form.qualifications || "");

    if (profilePicFile) {
      formData.append("profile_image", profilePicFile);
    }

    try {
      const response = await axios.post(
        "http://localhost/quickmatch_api/updateProviderProfile.php",
        formData
      );
      if (response.data.success) {
        setProfile({ ...form });
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
        <img src={profile.avatar} alt="Profile" className="profile-picture" />

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
              Username :
              <input
                type="text"
                name="username"
                value={form.username}
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
                readOnly
              />
            </label>
            <label>
              Contact Number:
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
              Bio:
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
              />
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

            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Name :</strong> {profile.name}
            </p>
            <p>
              <strong>Username :</strong> {profile.username}
            </p>
            <p>
              <strong>Email :</strong> {profile.email}
            </p>
            <p>
              <strong>Contact Number :</strong> {profile.contactNumber}
            </p>
            <p>
              <strong>Description :</strong> {profile.bio}
            </p>
            <p>
              <strong>Service Category :</strong>{" "}
              {serviceTypeMapping[profile.serviceType] || "Unknown Service"}
            </p>
            <p>
              <strong>Services :</strong> {profile.services}
            </p>
            <p>
              <strong>Address :</strong> {profile.location}
            </p>
            <p>
              <strong>National ID :</strong> {profile.nationalId}
            </p>
            <p>
              <strong>Charge per Day :</strong> {profile.chargesPerDay}
            </p>
            <p>
              <strong>Qualifications :</strong> {profile.qualifications}
            </p>

            <button onClick={handleEditClick} className="edit-button">
              Edit Profile
            </button>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProfilePage;

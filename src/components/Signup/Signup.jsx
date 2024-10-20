import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.css";
import "./Signup.css";
import ClearIcon from "@mui/icons-material/Clear";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import registerimg from "../../assets/register.png";
import Instruction from "../ProviderInstructions/Instruction";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Signup = ({ signupClose, loginClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openInstruct, setOpenInstruct] = useState(false);
  const [providerData, setProviderData] = useState({});

  const districts = [
    '', 'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !city || !district || !username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      toast.error("First name and last name should only contain letters.");
      return;
    }

    const usernameRegex = /.*\d.*/;
    if (!usernameRegex.test(username)) {
      toast.error("Username must contain at least one number.");
      return;
    }
    if (!email.includes('@gmail.com')) {
      toast.error("Please enter valid email..");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one number.");
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const fullAddress = `${city} | ${district}`;

    try {
      const response = await axios.post("http://localhost/quickmatch_api/customersignup.php", {
        fullName,
        fullAddress,
        username,
        email,
        password,
      });
      if (response.data.message) {
        toast.success("Registered Successfully, You can login now...");
        setTimeout(() => {
          signupClose(false);
          loginClose(true);
        }, 3000);
      } else {
        toast.error("Registration failed. Please check your credentials and try again.");
      }
    } catch (error) {
      toast.error("Customer email is already exists.");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };



  const handleProviderRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !city || !district || !username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      toast.error("First name and last name should only contain letters.");
      return;
    }

    const usernameRegex = /.*\d.*/;
    if (!usernameRegex.test(username)) {
      toast.error("Username must contain at least one number.");
      return;
    }
    if (!email.includes('@gmail.com')) {
      toast.error("Please enter valid email..");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one number.");
      return;
    }

    const fullName = `${firstName} ${lastName}`;
    const fullAddress = `${city} | ${district}`;

    setProviderData({ fullName, fullAddress, username, email, password });
    setOpenInstruct(true);
  };

  return (
    <>
      <div className="login">
        <div className="signup-container">
          <div className="titleCloseBtn">
            <ClearIcon
              className="cancel-btn"
              onClick={() => {
                signupClose(false);
              }}
            />
          </div>
          <div className="form">
            <div className="form-section">
              <form onSubmit={handleSignup}>
                <h2>Sign up</h2>

                {/* First Name and Last Name */}
                <div className="input_row">
                  <div className="input_box small_input">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <PersonIcon className="icon" />
                  </div>
                  <div className="input_box small_input">
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <PersonIcon className="icon" />
                  </div>
                </div>

                {/* Username */}
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <AccountCircleIcon className="icon" />
                </div>

                {/* Email */}
                <div className="input_box">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <EmailIcon className="icon" />
                </div>

                {/* City and District */}
                <div className="input_row">
                  <div className="input_box small_input">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    <LocationOnIcon className="icon" />
                  </div>
                  <div className="input_box small_input">
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                      placeholder='district'
                    >
                      <option value="">District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    <LocationOnIcon className="icon" />
                  </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="input_box">
                  <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <LockIcon className="icon" />
                </div>
                <div className="input_box">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <LockIcon className="icon" />
                </div>
                <div className="button-div">
                  <button className="button" type="submit">
                    Register as Customer
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={handleProviderRegister}
                  >
                    Register as Provider
                  </button>
                </div>
                <div className="login_signup">
                  Already have an account?
                  <span
                    onClick={() => {
                      signupClose(false);
                      loginClose(true);
                    }}
                  >
                    Login
                  </span>
                </div>
              </form>
            </div>
            <div className="form-img">
              <img className="register-img" src={registerimg} alt="" />
            </div>
          </div>
        </div>
      </div>
      {openInstruct && (
        <Instruction closeInstruct={setOpenInstruct} providerData={providerData} />
      )}
      <ToastContainer />
    </>
  );
};

export default Signup;

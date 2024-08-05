import React, { useState } from "react";
import axios from "axios";
import "./ProviderRegistration.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ToastContainer, toast } from "react-toastify";
import provider_img from '../../assets/provider_img.jpg'

const ProviderRegistration = ({ providerData, openFinalReg }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [serviceCategory, setServiceCategory] = useState("electric");
  const [proof, setProof] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", providerData.username);
    formData.append("email", providerData.email);
    formData.append("password", providerData.password);
    formData.append("fullName", fullName);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("serviceCategory", serviceCategory);
    formData.append("proof", proof);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost/quickmatch_api/verificationDetails.php",
        formData
      );
      if (response.data.message) {
        toast.success("Provider registered successfully!");
        setTimeout(() => {
          window.location.reload();
          openFinalReg(false);
        }, 3000);
      } else {
        toast.error("Provider registration failed.");
      }
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  return (
    <>
      <div className="essential-registration">
        <div className="register-container">
          <div className="provider-form">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <h2>Filling Essentials</h2>
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <PersonOutlineIcon className="icon" />
                </div>

                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                  <LocalPhoneIcon className="icon" />
                </div>

                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <LocationOnIcon className="icon" />
                </div>

                <div className="input_box">
                  <p>
                    Service Category :
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                    >
                      <option value="Electric Service">
                        Electric Services
                      </option>
                      <option value="Electronic Service">
                        Electronic Services
                      </option>
                      <option value="Construction Service">
                        Construction Services
                      </option>
                      <option value="Event Management Service">
                        Event Management Services
                      </option>
                    </select>
                  </p>
                </div>

                <div className="input_box">
                  <p>
                    Attach Proof :
                    <input
                      className="input_proof"
                      type="file"
                      onChange={handleFileChange}
                      required
                    />
                  </p>
                </div>

                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter Provider Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="button-div">
                  <button
                    className="button"
                    type="button"
                    onClick={() => openFinalReg(false)}
                  >
                    Back
                  </button>
                  <button className="button" type="submit">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="provider_img">
            <img src={provider_img} alt="" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProviderRegistration;

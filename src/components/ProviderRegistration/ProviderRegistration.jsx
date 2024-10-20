import React, { useState } from "react";
import axios from "axios";
import "./ProviderRegistration.css";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { ToastContainer, toast } from "react-toastify";
import provider_img from '../../assets/provider_img.jpg'
import { DropdownButton, Form } from "react-bootstrap";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const ProviderRegistration = ({ providerData, openFinalReg }) => {
  const [serviceCategory, setServiceCategory] = useState("");
  const [proof, setProof] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const electricWorksSelect = [
    "Switch and outlet repair and installation",
    "Lighting repair, installation, and upgrades",
    "Ceiling fan installation",
    "Wiring and rewiring",
    "Data and Communication Wiring",
    "Home Automation Systems",
    "Electrical Panel Upgrades",
    "Electrical Repairs",
    "Electrical Installations",
    "Circuit Breaker Replacement",
    "Emergency electrical services",
    "Backup power solutions",
  ];

  const electronicWorksSelect = [
    "Home Appliance Repair",
    "Mobile Device Repair",
    "Computer and Laptop Repair",
    "Audio and Visual Equipment Repair",
    "Network Installation and Troubleshooting",
    "Security Systems Installation and Maintenance",
    "Battery Replacement Services",
    "Gaming Console Repair",
  ];

  const constructionWorksSelect = [
    "Painting",
    "Building works",
    "Office building",
    "Hall works",
    "Civil Construction",
    "General Contracting",
    "Design-Build Services",
    "Commercial Construction",
    "Industrial Construction",
    "Site Preparation",
    "Project Management",
    "Commercial Construction",
  ];

  const eventWorksSelect = [
    "Corporate Events",
    "Weddings, Parties",
    "Festivals, Workshops and Training Sessions",
    "Virtual Events",
    "Corporate Events",
    "Sports Events",
    "Award Ceremonies",
  ];

  const categories = {
    S01: electricWorksSelect,
    S02: electronicWorksSelect,
    S03: constructionWorksSelect,
    S04: eventWorksSelect,
  };


  const handleFileChange = (e) => {
    setProof(e.target.files[0]);
  };

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedServices(prev =>
      e.target.checked
        ? [...prev, service]
        : prev.filter(s => s !== service)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedServices || !serviceCategory || !proof || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", providerData.fullName);
    formData.append("username", providerData.username);
    formData.append("email", providerData.email);
    formData.append("password", providerData.password);
    formData.append("address", providerData.fullAddress);
    formData.append("serviceCategory", serviceCategory);
    formData.append("proof", proof);
    formData.append("description", description);
    formData.append("services", selectedServices.join(", "));

    try {
      const response = await axios.post(
        "http://localhost/quickmatch_api/addVerification.php",
        formData
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success("Provider Registration successfull, wait until you got verified..");
        setTimeout(() => {
          window.location.reload();
          openFinalReg(false);
        }, 3000);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data); // Log the error response for debugging
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
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                  >
                    <option value="">Select Service Category</option>
                    <option value="S01">Electric Services</option>
                    <option value="S02">Electronic Services</option>
                    <option value="S03">Construction Services</option>
                    <option value="S04">Event Management Services</option>
                  </select>
                  <SettingsSuggestIcon className="icon" />
                </div>

                {serviceCategory && categories[serviceCategory] && (
                  <div className="input_box">
                    <DropdownButton id="dropdown" title="Select Services" className="drop-down custom-dropdown">
                      <Form className="menu-item p-2">
                        {categories[serviceCategory].map(service => (
                          <Form.Check
                            key={service}
                            type="checkbox"
                            id={service}
                            label={service}
                            value={service}
                            onChange={handleServiceChange}
                            className="menu-item-check mb-2"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          />
                        ))}
                        <label className="mt-2 d-block text-muted"
                          style={{
                            fontSize: '0.85rem',
                            textAlign: 'center',
                          }}>If other service you provide, update that in your profile</label>
                      </Form>
                    </DropdownButton>
                    <MiscellaneousServicesIcon className="icon" />
                  </div>
                )}
              
                <div style={{ marginBottom: "-40px", marginTop: "40px", marginLeft: "15px" }}>
                  Proofs:
                </div>
                <div className="input_box">
                  {/* <label style={{width:"80px"}}>Attach Proof</label> */}
                  <input
                    className="input_proof"
                    type="file"
                    onChange={handleFileChange}
                    required
                    
                  />
                </div>
                <div className="input_box">
                  <input
                    type="text"
                    placeholder="Enter small intro about you"
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

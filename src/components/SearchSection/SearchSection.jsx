import { useState } from "react";
import React from "react";
import "./SearchSection.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchSection = ({ handleSearch ,img , works }) => {
  const [city, setCity] = useState("");
  const [work, setWork] = useState("");

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
    'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa',
    'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleWorkChange = (e) => {
    setWork(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(city, work);
    setCity(""); 
    setWork("");
  };

  const handleRefresh = ()=>{
    window.location.reload();
  }

  return (
    <div className="search-section">
      <div className="search-img">
        <img src={img} alt="slide" />
      </div>
      <div className="search-input">
      <select 
          className="city-search" 
          name="city" 
          value={city}
          onChange={handleCityChange}
        >
          <option value="">Select City</option> 
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        <select 
          className="work-search" 
          name="work" 
          value={work}
          onChange={handleWorkChange}
        >
          <option value="">Select Work</option>
          {works.map((workOption, index) => (
            <option key={index} value={workOption}>{workOption}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>
          <SearchIcon className="search-con" />
          Search
        </button>
        <button onClick={handleRefresh}>
          
          Go back
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
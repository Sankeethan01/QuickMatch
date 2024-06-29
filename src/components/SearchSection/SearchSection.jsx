import { useState } from "react";
import React from "react";
import "./SearchSection.css";
import SearchIcon from "@mui/icons-material/Search";

const SearchSection = ({ handleSearch ,img}) => {
  const [city, setCity] = useState("");
  const [work, setWork] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleWorkChange = (e) => {
    setWork(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(city, work);
  };

  return (
    <div className="search-section">
      <div className="search-img">
        <img src={img} alt="slide" />
      </div>
      <div className="search-input">
        <input
          className="city-search"
          type="text"
          placeholder="Find City"
          value={city}
          onChange={handleCityChange}
        />
        <input
          className="work-search"
          type="text"
          placeholder="What kind of work needed"
          value={work}
          onChange={handleWorkChange}
        />
        <button onClick={handleSubmit}>
          <SearchIcon className="search-con" />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSection;

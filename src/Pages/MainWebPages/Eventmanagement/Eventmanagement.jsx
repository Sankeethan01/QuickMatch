import { React, useState, useEffect } from "react";
import SearchSection from "../../../components/SearchSection/SearchSection";
// import { eventManagementPersons} from "../../../userData";
import ProviderCard from "../../../components/ProviderCard/ProviderCard";
import "../../MainWebPages/Construction/Construction.css";
import ServiceTitle from "../../../components/ServiceTitle/ServiceTitle";
import HomeNavBar from "../../../components/HomeNavBar/HomeNavBar";
import Footer from "../../../components/Footer/Footer";
import CenterPage from "../CenterPage/CenterPage";
import event_management from "../../../assets/event_management.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'

const Eventmanagement = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const eventWorks = [
    "Corporate Events",
    "Weddings, Parties",
    "Festivals, Workshops and Training Sessions",
    "Virtual Events",
    "Corporate Events",
    "Sports Events",
    "Award Ceremonies",
  ];

  useEffect(() => {
    if (sessionStorage.getItem("user_type") !== "customer") {
      sessionStorage.clear();
      navigate("/");
      return;
    }
    setTimeout(() => {
      setLoading(false);
      fetchData();
    }, 2000);
   
  }, [navigate]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/quickmatch_api/providersByServiceCategory.php?service_category_id=S04"
      );
      const data = response.data;
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to load service providers. Please try again later.");
    }
  };

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleSearch = (city, work) => {
    let filtered = users;

    
    if (city) {
      filtered = filtered.filter((user) =>
        user.address.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (work) {
      filtered = filtered.filter((user) =>
        user.services.toLowerCase().includes(work.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setSearchPerformed(true);
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }

  return (
    <div className="construction">
      <HomeNavBar />
      <ServiceTitle title="Event Management" />
      <SearchSection
        handleSearch={handleSearch}
        img={event_management}
        works={eventWorks}
      />
      <div className="body-section">
        {searchPerformed && filteredUsers.length === 0 ? (
          <div className="not-found">
            <p>Results not found !!</p>
          </div>
        ) : (
          filteredUsers.map((user, index) => (
            <ProviderCard
              key={index}
              user={user}
              onShowModal={handleShowModal}
            />
          ))
        )}
      </div>
      <Footer />
      {selectedUser && (
        <CenterPage
          show={modalShow}
          onHide={() => setModalShow(false)}
          name={selectedUser.name}
          city={selectedUser.address}
          service_name={selectedUser.service_name}
          exp={selectedUser.description}
          profile={selectedUser.profile_image}
          email={selectedUser.email}
          phone={selectedUser.phone}
          provider_id={selectedUser.provider_id}
          service_category_id={selectedUser.service_category_id}
        />
      )}
    </div>
  );
};

export default Eventmanagement;

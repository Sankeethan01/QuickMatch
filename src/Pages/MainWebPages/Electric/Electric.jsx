import { React, useState } from "react";
import SearchSection from "../../../components/SearchSection/SearchSection";
import { electriciansData } from "../../../userData";
import ProviderCard from "../../../components/ProviderCard/ProviderCard";
import '../../MainWebPages/Construction/Construction.css'
import ServiceTitle from "../../../components/ServiceTitle/ServiceTitle";
import HomeNavBar from "../../../components/HomeNavBar/HomeNavBar";
import Footer from "../../../components/Footer/Footer";
import CenterPage from "../CenterPage/CenterPage";
import electric_jpg from '../../../assets/electrical.jpg'

const Electric = () => {

    const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(electriciansData);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleShowModal = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const handleSearch = (city, work) => {
    let filtered = electriciansData;

    if (city) {
      filtered = filtered.filter((user) =>
        user.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (work) {
      filtered = filtered.filter((user) =>
        user.desc.toLowerCase().includes(work.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setSearchPerformed(true);
  };

  return (
    <div className="construction">
    <HomeNavBar />
     <ServiceTitle title="Electric"/> 
    <SearchSection handleSearch={handleSearch} img={electric_jpg} />
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
        city={selectedUser.city}
        desc={selectedUser.desc}
        exp={selectedUser.exp}
        profile={selectedUser.profile}
        email={selectedUser.email}
        phone={selectedUser.phone}
      />
    )}
  </div>
  )
}

export default Electric
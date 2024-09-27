import React, { useEffect, useState } from 'react'
import ProviderNav from '../../../components/ServiceProviderDashboardComponents/ProviderNavbar/ProviderNav'
import ProfilePage from '../../../components/ServiceProviderDashboardComponents/Profile/Profile'
import Footer from '../../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import profileImg from '../../../assets/profile_sectio n.jpg';
import logo from '../../../assets/logo.png';

const ProviderHome = () => {
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if(sessionStorage.getItem('user_type') !== 'provider')
        {
             sessionStorage.clear();
              navigate('/');
        }
    }, 2000);
  })

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="loading">
        <img src={logo} alt="" />
        <h4>Loading......</h4>
      </div>
    );
  }

  return (
    <>
       <ProviderNav />
       <div className="profile-section">
        <div className="profileImage-section">
          <img src={profileImg}/>
        </div>
        <div className="profile-content">
        <ProfilePage />
        </div>
      </div>
       
       <Footer />
    </>
  )
}

export default ProviderHome
import React from 'react'
import CustomerNav from '../../../components/CustomerDashboardComponents/CustomerNav/CustomerNav'
import SubNav from '../../../components/CustomerDashboardComponents/CustomerSubNav/SubNav'
import Profile from '../../../components/CustomerDashboardComponents/ProfileCustomer/Profile'
import Footer from '../../../components/Footer/Footer'

const CustomerMain = () => {
  return (
    <>
      <CustomerNav />
      <SubNav />
      <Profile />
      <Footer />
    </>
  ) 
}

export default CustomerMain
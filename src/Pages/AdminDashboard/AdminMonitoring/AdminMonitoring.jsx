import React from 'react'
import './AdminMonitoring.css'
import PageTitle from '../../../components/AdminDashBoardComponents/PageTitle/PageTitle'
import AdminNavbar from '../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar'

const AdminMonitoring = () => {
  return (
    <div className='admin-monitoring'>
        <AdminNavbar />
      
            <PageTitle heading='Monitoring Section'/>
            <div className='iframes'>
            <iframe title='homePage' src='/' className='monitor' />
            <iframe title='homePage' src='/home' className='monitor' />
            <iframe title='providerDashboard' src='/providerhome' className='monitor' />
            <iframe title='customerDashboard' src='/customerhome' className='monitor' />
            </div>
             
        
    </div>
  )
}

export default AdminMonitoring
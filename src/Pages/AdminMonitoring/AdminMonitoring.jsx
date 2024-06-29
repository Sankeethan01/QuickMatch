import React from 'react'
import './AdminMonitoring.css'
import PageTitle from '../../components/AdminDashBoardComponents/PageTitle/PageTitle'
import AdminNavbar from '../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar'

const AdminMonitoring = () => {
  return (
    <div className='admin-monitoring'>
        <AdminNavbar />
      
            <PageTitle heading='Monitoring Section'/>
             <iframe title='homePage' src='/' className='monitor' />
        
    </div>
  )
}

export default AdminMonitoring
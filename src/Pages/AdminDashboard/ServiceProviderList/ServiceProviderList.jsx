import React, { useEffect } from 'react'
import './ServiceProviderList.css'
import PageTitle from '../../../components/AdminDashBoardComponents/PageTitle/PageTitle'
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import Button from '@mui/material/Button';
import PopupProvider from '../../../components/AdminDashBoardComponents/PopupProviderDetails/PopupProvider'
import AdminNavbar from '../../../components/AdminDashBoardComponents/AdminNavbar/AdminNavbar'
import axios from 'axios';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const ServiceProviderList = () => {

  const [dataId, setDataId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [providers,setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    const fetchProviders = async  () => {
      try {
        const response = await axios.get('http://localhost/quickmatch_api/getAllProviders.php?action=getAll');
        console.log(response.data);
        setLoading(false);
  
        const transformedData = response.data.map((provider, index) => ({
          id: provider.provider_id,
          user_id:provider.user_id,
          address: provider.address,
          charge: provider.charge,
          description: provider.description,
          email: provider.email,
          name: provider.name,
          profile_image: provider.profile_image,
          qualification: provider.qualification,
          service_category: provider.service_category,
          services: provider.services,
          status: provider.status,
          username: provider.username,
          disable_status:provider.disable_status,
        }));
  
        console.log('Transformed Data: ', transformedData);
        setProviders(transformedData);
      } catch (error) {
        console.error('Error fetching providers: ', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if(sessionStorage.getItem('user_type') !== 'admin')
        {
             sessionStorage.clear();
              navigate('/');
        }
        setTimeout(() => {
          fetchProviders();
        }, 2000);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if(loading){
      return <div className="loading">
        <img src={logo} alt=""/>
        <h4>Loading......</h4>
      </div>
    }

    

    const handleViewClick = (id) => {
      setDataId(id);
      setModalOpen(true);
    };
  
    const handleclosePopup = () => {
         setModalOpen(false);
    };

    const selectedRowData = providers.find(row => row.id === dataId);


  const columns = [
      { field: "id", headerName: "PID", width: 100 },
      {
           field: 'name', 
           headerName: 'Provider Name', 
           width: 250 ,
           renderCell: (params) => {
              return (
                <div className="userListUser">
                  <img className="userListImg" src={`http://localhost/quickmatch_api/profile_images/${params.row.profile_image}`} alt="" />
                  {params.row.name}
                </div>
              );
            },
          },
      { field: 'email', headerName: 'Email', width: 250 },
      {
        field: 'service_category',
        headerName: 'Service Category',
        width: 250,
      },
      { field: 'address', headerName: 'Address', width: 200 },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        renderCell: (params) => {
          return (

              <>{params.row.status ? 'Online' : 'Offline'}</>
 
         
          );
        },
      },
      {
          field: "action",
          headerName: "Action",
          width: 140,
          renderCell: (params) => {
            return (
              <div className='table-action'>
                 <Button variant="contained" className='action-button' onClick={() => {
                    handleViewClick(params.row.id);
                    setModalOpen(true);
                }}>View</Button>
                  
                 
              </div>
            );
          },
        },
    ];

   
  return (
    <div className='service-provider-list'>
           <AdminNavbar />
           {modalOpen && selectedRowData && (<PopupProvider data={selectedRowData}  onclose={handleclosePopup}/>)}
      
          <PageTitle heading='Service Providers' />
          <div className='provider-table'>
         <DataGrid
         getRowClassName={(params) =>
          params.indexRelativeToCurrentPage === 0 ? 'first-row' : ''
        }
        rows={providers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
        className='table-grid'
        rowHeight={60}
        columnHeaderHeight={60}
      />
    </div> 
    </div>
  )
}

export default ServiceProviderList
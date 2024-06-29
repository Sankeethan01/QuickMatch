import React from 'react'
import './ProviderRegistration.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProviderRegistration = ({comback}) => {
  return (
    <>
          <div className="login">
      <div className="register-container">
        <div className="form">
          <form>
            <h2>Filling Essentials</h2>
            <div className="input_box">
              <input type="text" placeholder="Enter full name" required />
              <PersonOutlineIcon  className="icon"/>
            </div>

            <div className="input_box">
              <input type="text" placeholder="Enter mobile number" required />
              <LocalPhoneIcon className="icon"/>
            </div>

            <div className="input_box">
              <input type="text" placeholder="Enter address" required />
              <LocationOnIcon className="icon"/>
            </div>

            <div className="choose">
            <p>Select Service Category : </p>
              <select id='' name='Service' value="service">
              
                 <option value="electric">Electric Services</option>
                 <option value="electronic">Electronic Services</option>
                 <option value="construction">Construction Services</option>
                 <option value="electronic">Event Management Services</option>
              </select>
             
             
            </div>
            <div className="choose">
            <p>Attact Proofs Collection : 
             
              </p>
              <input type="file" placeholder="Attach Proofs Collection" required />
            </div>
            
            <div className="input_box">
              <input type="text" placeholder="Enter Provider Description" required />
            </div>

            <div className='button-div'>
            <button className="button" onClick={()=>{
                comback(false);
            }}>Back</button>
            <button className="button" onClick={()=>{
                comback(false);
            }}>Register Now</button>
            </div>
              
            

          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProviderRegistration
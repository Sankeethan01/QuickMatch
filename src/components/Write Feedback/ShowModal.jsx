import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './ShowModal.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 30,
  p: 4,
};

export default function TransitionsModal({username,email,user}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <div>
      <Button onClick={handleOpen}>Write Feedback To System</Button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="boxxx">
             <div className='feedback-write'>
              <h4>Username : {username}</h4>
              <h4>Email : {email}</h4>
              <h4>User : {user}</h4>
              <h4><textarea name='feedback' rows="4" placeholder='Write your feedback here' className='text-area'/></h4>
              <Button onClick={()=>{
                        handleClose();
                        
                    
              }}>Submit</Button>
             </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

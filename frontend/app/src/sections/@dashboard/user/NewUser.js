import { Box, Button, Modal, Typography } from '@material-ui/core';
import { useState } from 'react';

const NewUserModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <Box sx={{ p: 5, backgroundColor: 'white', borderRadius: 5, maxWidth: 600, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Select a student to track their behavior
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => {
          }}
        >
          Submit
        </Button>
            
        {/* <QRCode 
          size={256}
          style={{ height: "200", maxWidth: "200", width: "200" }}
          value={`/student/${id}`}
          viewBox={`0 0 256 256`}
        /> */}
      </Box>
    </Modal>
  );
}

export default NewUserModal;
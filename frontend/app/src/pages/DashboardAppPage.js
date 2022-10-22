import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useThrottle from '../hooks/useThrottle';
// @mui
import { Autocomplete, Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material';
import { axiosInstance } from '../lib/axios';
import { AppUserData } from '../sections/@dashboard/app';
// components

export default function DashboardAppPage() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [students, setStudents] = useState([]);
  const nameThrottle = useThrottle(name, 500);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const API_URL = process.env.PRODUCTION ? 'http://146.190.209.138:8000' : 'http://localhost:8000';

  useEffect(() => {
    axiosInstance.get(`${API_URL}/api/v1/students/?full_name=${nameThrottle}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameThrottle]);


  return (
    <>
      <Helmet>
        <title> Dashboard | Spin The Spectrum </title>
      </Helmet>

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
          <Autocomplete
            freeSolo
            onInputChange = {(event, newInputValue) => {
              setName(newInputValue);
            }}
            options={students.map((option) => option.id)}
            onChange={(event, newValue) => {
              setId(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Full name" />}
          />

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              console.log(id);
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

      <Container maxWidth="xl">

        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
          <Box>
            <Typography variant="h4">
              Hi, Courtney
            </Typography>

            <Typography variant="h3" sx={{ mb: 5 }}>
              10/22 Session
            </Typography>
          </Box>
          <Box>
            <Button sx={{ ml: 3 }} onClick={handleOpen} variant="outlined">Add Student</Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <AppUserData title="Item Orders" total={1723315} color="background" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

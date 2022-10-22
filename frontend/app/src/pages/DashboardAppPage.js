import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Button, Modal } from '@mui/material';
import QRCode from 'react-qr-code';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppUserData,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
    setUrl(`http://google.com/${Math.floor(Math.random() * 5000)}`);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <Box sx={{ p: 5, backgroundColor: 'white', borderRadius: 5, maxWidth: 400, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Scan the following QR code using the student's device
          </Typography>
          <QRCode 
            size={256}
            style={{ height: "200", maxWidth: "200", width: "200" }}
            value={url}
            viewBox={`0 0 256 256`}
          />
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

import { useEffect, useState } from 'react';

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, Avatar, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import ApexChart from "../../../components/timeseries";


const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));


AppUserData.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppUserData({ title, total, icon, color = 'primary', sx, ...other }) {
    const [testData, setTestData] = useState([0]);

    useEffect(() => {
      const timer = setInterval(() => {
        setTestData(testData => [...testData, testData.at(-1) * .85 + Math.floor(Math.random() * 15) + 15 * .15]);
      }, 500);
      return () => { clearInterval(timer) }
    }, []);

    return (
        <Card
        sx={{
            px: 5,
            py: 2,
            boxShadow: 0,
            textAlign: 'center',
            color: (theme) => theme.palette[color].darker,
            bgcolor: (theme) => theme.palette[testData.at(-1) < 62 ? "background" : "error"].lighter,
            ...sx,
        }}
        {...other}
        >
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={6} sm={6} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                        <Avatar sx={{ width: 100, height: 100 }} />
                        <Box ml={3}>
                            <Typography variant="h3">Preston Barnett</Typography>
                            <Typography variant="p" gutterBottom>Checked in: 10/22 @ 10:59AM</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                        <Box sx={{ flexBasis: 125 }}>
                            <Typography variant="h4" color="#eb7971">{testData.at(-1).toFixed(0)} BPM</Typography>
                            <Typography variant="h4" color="#82aef5">{testData.at(-1).toFixed(0)} F</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
                            <ApexChart data={testData} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

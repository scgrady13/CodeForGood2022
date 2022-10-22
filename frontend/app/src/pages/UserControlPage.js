import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, createTheme, Avatar } from '@mui/material/';
import { Slider, Button, Container, Stack, Typography } from '@mui/material';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WbSunny from '@mui/icons-material/WbSunny';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';

// components

const theme = createTheme({
  palette: {
    background: {
      default: "#300500"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const OPTIONS = [
  {
    "name": "Too Loud",
    "icon": <MusicNoteIcon sx={{width: 50, height: 50}} />
  },
  {
    "name": "Too Bright",
    "icon": <WbSunny sx={{width: 50, height: 50}} />
  },
  {
    "name": "It's Hot",
    "icon": <LocalFireDepartmentIcon sx={{width: 50, height: 50}} />
  },
  {
    "name": "It's Cold",
    "icon": <AcUnitIcon sx={{width: 50, height: 50}} />
  },
  {
    "name": "Too quiet",
    "icon": <VolumeDownIcon sx={{width: 50, height: 50}} />
  },
  {
    "name": "My Touch",
    "icon": <DoNotTouchIcon sx={{width: 50, height: 50}} />
  },
]

export default function UserControlPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title> Student Control Panel </title>
      </Helmet>

      <Container sx={{ height: '100%', alignItems: 'center', display: 'flex' }}>
        <Box sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex' }}>
          {Object.keys(OPTIONS).map((item, i) => {
            return (
              <Button variant="outlined" color="error" style={{margin: 25, width: 250, height: 250 }}>
                <Stack sx={{ alignItems: 'center' }}>
                  {OPTIONS[i].icon}
                  <Typography mt={2} variant="h5">
                    {OPTIONS[i].name}
                  </Typography>
                </Stack>
              </Button>
            )
          })}
        </Box>
      </Container>


    </ThemeProvider>
  );
}

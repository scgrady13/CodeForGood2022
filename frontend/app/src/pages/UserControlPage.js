import { Helmet } from 'react-helmet-async';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, createTheme, Avatar } from '@mui/material/';
import { Slider, Button, Container, Stack, Typography } from '@mui/material';

// components

const theme = createTheme({
  palette: {
    background: {
      default: "#5c0b06"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function UserControlPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title> Student Control Panel </title>
      </Helmet>

      <Container sx={{ height: '100%', alignItems: 'center', display: 'flex' }}>
        <Box sx={{ flexWrap: 'wrap', justifyContent: 'center', display: 'flex' }}>
          {[...Array(6).keys()].map((item) => {
            return (
              <Button variant="outlined" color="error" style={{margin: 25, width: 250, height: 250 }}>
                <Stack sx={{ alignItems: 'center' }}>
                  <Avatar />
                  <Typography mt={2} variant="h5">
                    Too Loud
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

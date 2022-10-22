import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isEror, setIsError] = useState(false);

  const API_URL = process.env.PRODUCTION ? 'http://146.190.209.138:8000/api-auth/v1/login/' : 'http://localhost:8000/api-auth/v1/login/';

  const handleLogin = () => {
    axios.post(API_URL, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        navigate('/dashboard', { replace: true });
      })
      .catch(() => {
        setIsError(true);
        console.warn('Unable to login');
      });
  };

  return (
    <>
      <Stack spacing={3}>
        {isEror && <Alert severity="error">Username and password do not match</Alert>}

        <TextField name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}

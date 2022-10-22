import axios from 'axios';

export const API_BASE_URL = 'http://146.190.209.138:8000/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const goToLogin = () => {
      window.location.href = '/login/';
    };

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      originalRequest.url === 'api-auth/v1/token/refresh/'
    ) {
      goToLogin();
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized' &&
      originalRequest.url !== 'api-auth/v1/token/refresh/'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          const res = await axiosInstance.post('api-auth/v1/token/refresh/', {
            refresh: refreshToken,
          });
          if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
            return axiosInstance(originalRequest);
          }
          console.warn('Unable to refresh token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          goToLogin();
          return Promise.reject(error);
        }
        console.warn('Refresh token is expired', tokenParts.exp, now);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        goToLogin();
        return Promise.reject(error);
      }
      console.warn('Refresh token not available.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      goToLogin();
      return Promise.reject(error);
    }

    if (
      error.response.status === 403 &&
      error.response.statusText === 'Forbidden' &&
      error.response.data.detail === 'You do not have permission to perform this action.'
    ) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      goToLogin();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };

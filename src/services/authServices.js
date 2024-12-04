import { createAxiosInstance } from '@services/axiosConfig';

const axios = createAxiosInstance({ baseURLKey: 'dash' });

const axiosWithAuth = createAxiosInstance({
  baseURLKey: 'dash',
  auth: true,
});

const authService = {
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (credentials) => {
    const response = await axiosWithAuth.post('/auth/logout', credentials);
    return response.data;
  },
};

export default authService;

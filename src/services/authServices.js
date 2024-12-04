import { createAxiosInstance } from '@services/axiosConfig'; // Import axiosConfig

const authService = {
  login: async (credentials) => {
    const axios = createAxiosInstance({ baseURLKey: 'dash' }); // Instance tanpa autentikasi
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (token) => {
    const axiosWithAuth = createAxiosInstance({
      baseURLKey: 'dash',
      auth: true,
      token,
    });
    const response = await axiosWithAuth.post('/auth/logout');
    return response.data;
  },
};

export default authService;

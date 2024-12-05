import { createAxiosInstance } from '@/services/axiosConfig';

const API_KEY = import.meta.env.VITE_X_API_KEY;

const createTeamsAxiosFront = () =>
  createAxiosInstance({
    baseURLKey: 'front',
    apiKey: API_KEY,
  });

const teamsServices = {
  fetchAllTeams: (params) =>
    createTeamsAxiosFront()
      .get('/teams', {
        params,
      })
      .then((res) => res.data),
};

export default teamsServices;

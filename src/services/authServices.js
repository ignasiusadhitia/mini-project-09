import { createAxiosInstance } from '@services/axiosConfig';

export const axiosLoginInstance = createAxiosInstance({ baseURLKey: 'dash' });
export const axiosLogoutInstance = createAxiosInstance({
  baseURLKey: 'dash',
  auth: true,
});

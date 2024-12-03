import { createAxiosInstance } from '@services/axiosConfig';

export const login = createAxiosInstance({ baseURLKey: 'dash' });
export const logout = createAxiosInstance({ baseURLKey: 'dash', auth: true });

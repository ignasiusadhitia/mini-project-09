import { createAxiosInstance } from '@services/axiosConfig';

export const getAllUsers = createAxiosInstance({
  baseURLKey: 'dash',
  auth: true,
});

export const deleteUser = createAxiosInstance({
  baseURLKey: 'dash',
  auth: true,
});

export const createUser = createAxiosInstance({
  baseURLKey: 'dash',
  auth: true,
  multipart: true,
});

import { createAxiosInstance } from '@services/axiosConfig';

const createUsersAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const createUsersAxiosMultipart = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    multipart: true,
    token,
  });

const usersServices = {
  // Fetcher function for SWR
  fetchAllUsers: (token) =>
    createUsersAxios(token)
      .get('/users')
      .then((res) => res.data),

  addUser: (token, user) =>
    createUsersAxiosMultipart(token)
      .post('/users', user)
      .then((res) => res.data),

  deleteUserById: (token, id) =>
    createUsersAxios(token)
      .delete(`/users/${id}`)
      .then((res) => res.data),
};

export default usersServices;

import { createAxiosInstance } from '@/services/axiosConfig';

const API_KEY = import.meta.env.X_API_KEY;

const createContactUsAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const createContactUsAxiosFront = () =>
  createAxiosInstance({
    baseURLKey: 'front',
    apiKey: API_KEY,
  });

const contactUsServices = {
  getMessages: (token) =>
    createContactUsAxios(token)
      .get('/contact')
      .then((res) => res.data),

  sendMessage: (message) =>
    createContactUsAxiosFront()
      .post('/contact', message)
      .then((res) => res.data),
};

export default contactUsServices;

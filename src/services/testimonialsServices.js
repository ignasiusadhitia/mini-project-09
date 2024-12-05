import { createAxiosInstance } from '@/services/axiosConfig';

const API_KEY = import.meta.env.VITE_X_API_KEY;

const createTestimonialsAxiosFront = () =>
  createAxiosInstance({
    baseURLKey: 'front',
    apiKey: API_KEY,
  });

const createTestimonialsAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const createTestimonialsAxiosMultipart = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    multipart: true,
    token,
  });

const testimonialsServices = {
  fetchAllTestimonials: (token) =>
    createTestimonialsAxios(token)
      .get('/testimonial')
      .then((res) => res.data),

  fetchPortfolioById: (id) =>
    createTestimonialsAxiosFront()
      .get(`/testimonial/${id}`)
      .then((res) => res.data),

  updatePortfolioById: (token, id, portfolio) =>
    createTestimonialsAxiosMultipart(token)
      .put(`/testimonial/${id}`, portfolio)
      .then((res) => res.data),

  deletePortfolioById: (token, id) =>
    createTestimonialsAxios(token)
      .delete(`/testimonial/${id}`)
      .then((res) => res.data),

  fetchAllTestimonialsFront: () =>
    createTestimonialsAxiosFront()
      .get('/testimonials')
      .then((res) => res.data),
};

export default testimonialsServices;

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
  addTestimonial: (token, testimonial) =>
    createTestimonialsAxiosMultipart(token)
      .post('/testimonial', testimonial)
      .then((res) => res.data),

  fetchAllTestimonials: (token) =>
    createTestimonialsAxios(token)
      .get('/testimonial')
      .then((res) => res.data),

  fetchTestimonialByParam: (params) =>
    createTestimonialsAxiosFront()
      .get(`/testimonials`, { params })
      .then((res) => res.data),

  updateTestimonialById: (token, id, testimonial) =>
    createTestimonialsAxiosMultipart(token)
      .put(`/testimonial/${id}`, testimonial)
      .then((res) => res.data),

  deleteTestimonialById: (token, id) =>
    createTestimonialsAxios(token)
      .delete(`/testimonial/${id}`)
      .then((res) => res.data),

  fetchAllTestimonialsFront: () =>
    createTestimonialsAxiosFront()
      .get('/testimonials')
      .then((res) => res.data),
};

export default testimonialsServices;

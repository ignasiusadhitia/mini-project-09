import { createAxiosInstance } from '@/services/axiosConfig';

const API_KEY = import.meta.env.VITE_X_API_KEY;

const createPortfoliosAxiosFront = () =>
  createAxiosInstance({
    baseURLKey: 'front',
    apiKey: API_KEY,
  });

const createPortfoliosAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const createPortfoliosAxiosMultipart = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    multipart: true,
    token,
  });

const portfoliosServices = {
  addPortfolio: (token, portfolio) =>
    createPortfoliosAxiosMultipart(token)
      .post('/portfolio', portfolio)
      .then((res) => res.data),

  fetchAllPortfolios: (token) =>
    createPortfoliosAxios(token)
      .get('/portfolio')
      .then((res) => res.data),

  fetchPortfolioById: (id) =>
    createPortfoliosAxiosFront()
      .get(`/portfolios/${id}`)
      .then((res) => res.data),

  updatePortfolioById: (token, id, portfolio) =>
    createPortfoliosAxiosMultipart(token)
      .put(`/portfolio/${id}`, portfolio)
      .then((res) => res.data),

  deletePortfolioById: (token, id) =>
    createPortfoliosAxios(token)
      .delete(`/portfolio/${id}`)
      .then((res) => res.data),
};

export default portfoliosServices;

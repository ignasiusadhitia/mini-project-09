import { createAxiosInstance } from '@services/axiosConfig';

const createBlogsAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const createBlogsAxiosMultipart = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    multipart: true,
    token,
  });

const blogsServices = {
  addArticle: (token, article) =>
    createBlogsAxiosMultipart(token)
      .post('/blogs', article)
      .then((res) => res.data),

  fetchAllArticles: (token) =>
    createBlogsAxios(token)
      .get('/blogs')
      .then((res) => res.data),

  fetchArticleById: (token, id) =>
    createBlogsAxios(token)
      .get(`/blogs/${id}`)
      .then((res) => res.data),

  updateArticleById: (token, id, article) =>
    createBlogsAxiosMultipart(token)
      .put(`/blogs/${id}`, article)
      .then((res) => res.data),

  publishArticleById: (token, id, status) =>
    createBlogsAxios(token)
      .patch(`/blogs/${id}/publish`, status)
      .then((res) => res.data),

  deleteArticleById: (token, id) =>
    createBlogsAxios(token)
      .delete(`/blogs/${id}`)
      .then((res) => res.data),
};

export default blogsServices;

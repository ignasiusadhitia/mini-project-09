import { createAxiosInstance } from '@services/axiosConfig';

const createBlogsAxios = (token) =>
  createAxiosInstance({
    baseURLKey: 'dash',
    auth: true,
    token,
  });

const blogsServices = {
  addArticle: (token, article) =>
    createBlogsAxios(token)
      .post('/blogs', article)
      .then((res) => res.data),

  fetchAllArticles: (token) =>
    createBlogsAxios(token)
      .get('/blogs')
      .then((res) => res.data),

  updateArticleById: (token, id, article) =>
    createBlogsAxios(token)
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

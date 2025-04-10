import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backendfornewsmedia.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getArticles = async (params) => {
  try {
    const response = await api.get('/articles', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryBySlug = async (slug) => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

export const searchArticles = async (query) => {
  try {
    const response = await api.get('/search', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
};

export const getTrendingArticles = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending articles:', error);
    return [];
  }
};

export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post('/newsletter', { email });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
}; 
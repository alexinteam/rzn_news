import apiClient from './client';

const getAllNews = async (timestamp = undefined, category = undefined) => {
  try {
    let params = {};
    if(timestamp === undefined) {
      timestamp = Math.round(Date.now() / 1000);
    }

    params.timestamp = timestamp - 1
    if(category !== undefined) {
      params.rubric = category
    }

    const response = await apiClient.get('/news',{params :  params});

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('Error while getting all news.', error.message);
    return [];
  }
};


const getAllNewsByCategory = async (category) => {
  try {
    let params = {};

    params.rubric= category
    console.log(params.rubric)

    const response = await apiClient.get('/news',{params :  params});

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('Error while getting all news.', error.message);
    return [];
  }
};

const getSingle = async id => {
  try {
    const response = await apiClient.get(`/news/${id}`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log('error while getting single news', error);
  }
};

const getByCategory = async (category, qty) => {
  const endpoint = qty ? `/news/${category}/${qty}` : `/news/${category}`;

  try {
    const response = await apiClient.get(endpoint);

    if (response.data.success) {
      return response.data.news;
    }
  } catch (error) {
    console.log('Error while getting categories news.', error.message);
    return [];
  }
};

const searchPost = async query => {
  if (!query) return {};
  try {
    const response = await apiClient.post(`/news/search/${query}`);
    return response.data;
  } catch (error) {
    console.log('Error while searching - searchPost newsAPi', error);
  }
};

export default {
  getAllNews,
  getByCategory,
  getSingle,
  searchPost,
  getAllNewsByCategory
};

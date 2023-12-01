// pixabay.js
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40854865-379b4e91125b45648445462a5';

const createPixabayApiService = () => {
  let page = 1;
  let searchQuery = '';
  const perPage = 40;

  const collection = async () => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    });

    try {
      const { data } = await axios.get(`${BASE_URL}?${params}`);
      return data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  };

  const incrementPage = () => {
    page += 1;
    return page;
  };

  const resetPage = () => {
    page = 1;
  };

  const getQuery = () => searchQuery;

  const setQuery = (newQuery) => {
    searchQuery = newQuery;
  };

  const getPerPage = () => perPage;

  const actualPage = () => page;

  return {
    collection,
    incrementPage,
    resetPage,
    getPerPage,
    actualPage,
    get query() {
      return getQuery();
    },
    set query(newQuery) {
      setQuery(newQuery);
    },
  };
};

export default createPixabayApiService;

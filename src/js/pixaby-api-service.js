import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40854865-379b4e91125b45648445462a5';

const createPixabayApiService = () => {
  let page = 1;
  let searchQuery = '';

  const collection = async () => {
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page,
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
  };

  const resetPage = () => {
    page = 1;
  };

  const getQuery = () => searchQuery;

  const setQuery = (newQuery) => {
    searchQuery = newQuery;
  };

  return {
    collection,
    incrementPage,
    resetPage,
    get query() {
      return getQuery();
    },
    set query(newQuery) {
      setQuery(newQuery);
    },
  };
};

export default createPixabayApiService;
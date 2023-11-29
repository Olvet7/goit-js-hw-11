import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '40854865-379b4e91125b45648445462a5';

const createPixabayApiService = () => {
  let searchQuery = '';
  let page = 1;

  const collection = async () => {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return response.data;
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

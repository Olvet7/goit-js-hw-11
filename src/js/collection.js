import axios from 'axios';

const collection = async (searchQuery, page = 1) => {
  const KEY = '40854865-379b4e91125b45648445462a5';
  const perPage = 40;

  try {
    const searchParams = new URLSearchParams({
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    });

    const { data } = await axios.get(`/?${searchParams}`);
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export default collection;
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41633304-c06bc91ac11626a6cec46e525';

export default async function searchPhotos(search = '', page) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return response.data;
}

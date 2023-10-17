import axios from 'axios';

const APIKEY_PIXABAY = '40011477-7b9d08a1a57b23446539c7b1e';
const BASE_URL_PIXABAY = 'https://pixabay.com/api/';

export const fetchImages = async (strSearch, pageNumber) => {
  const param = new URLSearchParams({
    key: APIKEY_PIXABAY,
    q: strSearch,
    safesearch: true,
    image_type: 'photo',
    orientation: 'horizontal',
    page: pageNumber,
    per_page: 12,
  });
  const response = await axios.get(`${BASE_URL_PIXABAY}?${param.toString()}`);
  if (!response.data) {
    throw new Error(response.status);
  }
  return response.data;
};

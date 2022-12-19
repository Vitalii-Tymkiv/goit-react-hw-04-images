import axios from 'axios';
const ACCES_KEY = '30569231-ce5a01de05ade21426f5534e5';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const axiosParams = {
  params: {
    image_type: 'photo',
    orientation: 'horizontal',
  },
};

export const fetchImg = async (query, page) => {
  const url = `?key=${ACCES_KEY}&q=${query}&page=${page}&per_page=12`;
  const { data } = await axios.get(url, axiosParams);
  return data;
};

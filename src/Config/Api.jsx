import axios from 'axios';

// create base url
export const API = axios.create({
  baseURL: 'https://backend-dumbflix.up.railway.app/api/v1/'
});

// set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

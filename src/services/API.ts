import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = token;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}

API.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      window.dispatchEvent(new CustomEvent('unauthorized'));
    }
    return Promise.reject(error);
  }
);
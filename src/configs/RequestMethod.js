import axios from "axios";

// const REACT_APP_BASE_URL = "http://localhost:3089"; 


export const BACKEND_URL = "http://65.0.42.170:3002";
// export const BACKEND_URL = import.meta.env.VITE_API_URL;

const BASE_URL = BACKEND_URL + "/api/admin";

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});
export const frontendUrl = window.location.origin;

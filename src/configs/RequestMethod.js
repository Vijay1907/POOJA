import axios from "axios";

const REACT_APP_YOUR_CLOUD_NAME = "dkhh3ayz8";
const REACT_APP_CLOUDINARY_KEY = "dakshin_murti";
// const REACT_APP_BASE_URL = "http://localhost:3089"; 


export const BACKEND_URL = import.meta.env.VITE_API_URL;

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

export const YOUR_CLOUD_NAME = REACT_APP_YOUR_CLOUD_NAME;
export const CLOUDINARY_KEY = REACT_APP_CLOUDINARY_KEY;

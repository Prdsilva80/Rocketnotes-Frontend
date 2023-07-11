import axios from "axios";

export const api = axios.create({
  baseURL: "https://acgrocketnotes-api.onrender.com",
});

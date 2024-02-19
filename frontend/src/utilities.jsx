import axios from "axios";
const domainName = "film-vault.com";
export const api = axios.create({
  // baseURL:`http://${domainName}/api/v1/`,
  baseURL: "http://127.0.0.1:8000/api/v1/",
});
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

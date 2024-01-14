import axios from "axios"
const api = axios.create({
    baseURL:"http://35.165.24.79/api/v1/",
});

export default api
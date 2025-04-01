import axios from "axios"

const apiRequest = axios.create({
    baseURL: "https://urban-estate-project-backend.onrender.com/api",
    withCredentials: true
});


export default apiRequest;
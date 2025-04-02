import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:8800/api"  
    : "https://urban-estate-project-backend.onrender.com/api"; 

const apiRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});


apiRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiRequest;

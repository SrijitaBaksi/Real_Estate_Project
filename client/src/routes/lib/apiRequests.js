import axios from "axios";

// Create an Axios instance
const apiRequest = axios.create({
    baseURL: "https://urban-estate-project-backend.onrender.com/api",
    withCredentials: true // Ensure cookies are sent with requests
});

// Add request interceptor to include JWT token in headers (if it exists)
apiRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");  // Or sessionStorage depending on where you store the token
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;  // Add the token to the headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiRequest;

import axios from "axios";

const axiosProduct = axios.create ( {
    baseURL: "https://fakestoreapi.com",
})

axiosProduct.interceptors.request.use(config => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosProduct.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

const axiosFile = axios.create ( {
    baseURL: "https://api.escuelajs.co/api/v1/files",
})

axiosFile.interceptors.request.use(config => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosFile.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export {axiosProduct, axiosFile};
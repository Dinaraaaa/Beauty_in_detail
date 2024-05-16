import axios from 'axios';
window.API_URL = 'http://localhost:3001';
const $api = axios.create({
    withCredentials:true,
    baseURL: API_URL,
});
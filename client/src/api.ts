import axios from "axios";

const PORT = 8080;

export const API = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname + ':' + PORT,
});
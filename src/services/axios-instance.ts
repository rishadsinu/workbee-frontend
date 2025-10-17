import axios from "axios";

const baseURL = import.meta.env.VITE_GATEWAY_URL

export const api = axios.create({
    baseURL,
    headers:{
        "Content-Type" : "application/json"
    },
});







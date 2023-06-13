import axios from 'axios';

const Axios = axios.create({
    baseURL: process.env.NEXT_API_BASE_URL,
});

export default Axios;
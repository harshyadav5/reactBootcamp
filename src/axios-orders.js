import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-5c86f.firebaseio.com/'
});

export default instance;
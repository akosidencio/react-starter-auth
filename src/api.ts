import axios from 'axios';

const clientApi = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default clientApi;
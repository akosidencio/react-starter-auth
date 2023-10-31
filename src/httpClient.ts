import axios from 'axios';

const httpClient = axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default httpClient;
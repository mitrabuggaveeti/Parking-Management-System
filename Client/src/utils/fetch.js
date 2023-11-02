import axios from 'axios'
export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PUT = 'PUT';
export const API = 'http://localhost:3000/api'

export const makeRequest = async (type, path, body) => {
    let request;
    switch (type) {
        case POST:
            request = axios.post
            break;
        case GET:
            request = axios.get;
            break;
        case DELETE:
            request = axios.delete;
            break;
        case PUT:
            request = axios.put;
            break;
        default:
            request = axios.get;
            break;
    }
    return request(`${API}${path}`, body);
}
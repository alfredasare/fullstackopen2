import axios from "axios";

const baseUrl = 'https://mighty-mountain-16496.herokuapp.com/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update };
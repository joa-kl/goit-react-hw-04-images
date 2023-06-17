import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;
const key = "34935392-24250165e01040adac8554f89";

export const fetchImages = async (query, pageNr) => {
    const response = await axios.get(
        `/?q=${query}&page=${pageNr}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
        );
        return response.data.hits;
};

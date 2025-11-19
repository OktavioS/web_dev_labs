import axios from "axios";

const API_URL = "http://localhost:3000/api/shoes";

export const getShoes = async (search = "", sort = "") => {
    const params = {};
    if (search) params.search = search;
    if (sort) params.sort = sort;

    const res = await axios.get(API_URL, { params });
    return res.data;
};

export const getShoeById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

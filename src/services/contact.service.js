import axios from "axios";

const API_URL = (import.meta.env.VITE_API_BACKEND_URL || "http://localhost:8000") + "/api";

const submitContact = async (data) => {
    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
};

export { submitContact };

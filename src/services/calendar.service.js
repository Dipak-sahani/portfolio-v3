import axios from "axios";
import { getAuthToken } from "./auth.service";

const API_URL = (import.meta.env.VITE_API_BACKEND_URL || "http://localhost:8000") + "/api";

const getMyCalendar = async () => {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/calendar`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const addToCalendar = async (data) => {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/calendar`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const removeFromCalendar = async (itemId) => {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/calendar/${itemId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const updateTaskStatus = async (itemId, status) => {
    const token = getAuthToken();
    const response = await axios.patch(
        `${API_URL}/calendar/${itemId}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export { getMyCalendar, addToCalendar, removeFromCalendar, updateTaskStatus };

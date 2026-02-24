import axios from "axios";
import { API } from "./auth.service";

const CLOUDFLARE_NEWS_URL = "https://falling-sound-cdd1.sahanidipak671.workers.dev";

export const fetchNewsApi = async () => {
    try {
        const response = await axios.get(CLOUDFLARE_NEWS_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching news from Cloudflare:", error);
        throw error.response?.data?.message || error.message || "Failed to fetch news";
    }
};

export const saveNewsApi = async (newsData) => {
    try {
        const response = await API.post("/news/save", newsData);
        return response.data;
    } catch (error) {
        console.error("Error saving news to backend:", error);
        throw error.response?.data?.message || error.message || "Failed to save news";
    }
};

export const fetchSavedNewsApi = async () => {
    try {
        const response = await API.get("/news/saved");
        return response.data;
    } catch (error) {
        console.error("Error fetching saved news:", error);
        throw error.response?.data?.message || error.message || "Failed to fetch saved news";
    }
};

export const deleteSavedNewsApi = async (newsId) => {
    try {
        const response = await API.delete(`/news/saved/${newsId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting saved news:", error);
        throw error.response?.data?.message || error.message || "Failed to delete saved news";
    }
};

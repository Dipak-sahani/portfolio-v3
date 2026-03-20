import { create } from "zustand";
import { fetchNewsApi, fetchSavedNewsApi, deleteSavedNewsApi } from "../services/news.service";

export const useNewsStore = create((set, get) => ({
    newsdata: [],
    visibleNewsData: [],
    googleRSS: [],
    visibleGoogleRSS: [],
    batchSize: 10,
    newsIndex: 0,
    rssIndex: 0,
    savedNews: [],
    loading: false,
    loadingSaved: false,
    didFetch: false,
    error: null,

    fetchAllNews: async () => {
        try {
            set({ loading: true, error: null });
            const data = await fetchNewsApi();

            // data should be { newsdata: [], googleRSS: [] }
            // Some keys might return error objects if API limit is hit
            const newsdata = Array.isArray(data.newsdata) ? data.newsdata : [];
            const googleRSS = Array.isArray(data.googleRSS) ? data.googleRSS : [];

            console.log(newsdata);


            set({
                newsdata,
                googleRSS,
                visibleNewsData: newsdata.slice(0, 10),
                visibleGoogleRSS: googleRSS.slice(0, 10),
                newsIndex: 10,
                rssIndex: 10,
                loading: false,
                didFetch: true,
            });
        } catch (error) {
            set({
                error: error.message || "Failed to fetch news",
                loading: false,
                didFetch: true // Mark as fetched even on error to stop infinite loops
            });
        }
    },

    loadMoreNews: () => {
        const { newsdata, visibleNewsData, newsIndex, batchSize } = get();
        const nextIndex = newsIndex + batchSize;
        const nextBatch = newsdata.slice(newsIndex, nextIndex);

        if (nextBatch.length > 0) {
            set({
                visibleNewsData: [...visibleNewsData, ...nextBatch],
                newsIndex: nextIndex,
            });
            return true;
        }
        return false;
    },

    loadMoreRSS: () => {
        const { googleRSS, visibleGoogleRSS, rssIndex, batchSize } = get();
        const nextIndex = rssIndex + batchSize;
        const nextBatch = googleRSS.slice(rssIndex, nextIndex);

        if (nextBatch.length > 0) {
            set({
                visibleGoogleRSS: [...visibleGoogleRSS, ...nextBatch],
                rssIndex: nextIndex,
            });
            return true;
        }
        return false;
    },

    fetchSavedNews: async () => {
        try {
            set({ loadingSaved: true });
            const response = await fetchSavedNewsApi();
            set({ savedNews: response.data || [], loadingSaved: false });
        } catch (error) {
            set({ error: error.message || "Failed to fetch saved news", loadingSaved: false });
        }
    },

    deleteSavedNews: async (newsId) => {
        try {
            await deleteSavedNewsApi(newsId);
            set((state) => ({
                savedNews: state.savedNews.filter((news) => news._id !== newsId),
            }));
            return true;
        } catch (error) {
            set({ error: error.message || "Failed to delete saved news" });
            return false;
        }
    },
}));

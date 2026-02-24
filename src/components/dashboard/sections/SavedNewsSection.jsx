import React, { useEffect } from 'react';
import { useNewsStore } from '../../../store/news.store';
import NewsCard from '../../news/NewsCard';
import { toast } from 'react-toastify';

const SavedNewsSection = () => {
    const { savedNews, loadingSaved, fetchSavedNews, deleteSavedNews } = useNewsStore();

    useEffect(() => {
        fetchSavedNews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this news article?")) {
            const success = await deleteSavedNews(id);
            if (success) {
                toast.success("News article removed successfully");
            } else {
                toast.error("Failed to remove news article");
            }
        }
    };

    if (loadingSaved && savedNews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Loading saved news...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#3C4044] dark:text-white">Your Saved Articles</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {savedNews.length} {savedNews.length === 1 ? 'article' : 'articles'}
                </span>
            </div>

            {savedNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedNews.map((news) => (
                        <NewsCard
                            key={news._id}
                            news={news}
                            variant="detailed"
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="far fa-bookmark text-2xl text-gray-400"></i>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't saved any news articles yet.</p>
                    <a
                        href="/news"
                        className="inline-block px-6 py-2 bg-[#FD7B41] text-white font-semibold rounded-lg hover:bg-[#e06b36] transition-colors"
                    >
                        Browse News
                    </a>
                </div>
            )}
        </div>
    );
};

export default SavedNewsSection;

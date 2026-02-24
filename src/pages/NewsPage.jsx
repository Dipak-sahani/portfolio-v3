import React, { useEffect } from "react";
import { useNewsStore } from "../store/news.store";
import NewsCard from "../components/news/NewsCard";
import { Helmet } from "react-helmet";

const NewsPage = () => {
    const {
        visibleNewsData,
        newsdata,
        visibleGoogleRSS,
        googleRSS,
        loading,
        error,
        fetchAllNews,
        loadMoreNews,
        loadMoreRSS
    } = useNewsStore();

    useEffect(() => {
        if (newsdata.length === 0 && googleRSS.length === 0) {
            fetchAllNews();
        }
    }, []);

    const handleLoadMoreNews = () => {
        const loaded = loadMoreNews();
        if (loaded) {
            window.scrollBy({ top: 400, behavior: "smooth" });
        }
    };

    const handleLoadMoreRSS = () => {
        loadMoreRSS();
    };

    const hasMoreNews = visibleNewsData.length < newsdata.length;
    const hasMoreRSS = visibleGoogleRSS.length < googleRSS.length;

    return (
        <div className="min-h-screen bg-[#F3F2EF] dark:bg-gray-900 pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <Helmet>
                <title>Top Stories | Berojgar Founder</title>
                <meta
                    name="description"
                    content="Discover startup founders, connect with creators, and access direct links without comment-for-link tricks."
                />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3C4044] dark:text-white mb-2">
                        Market <span className="text-[#FD7B41]">Insights</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto italic text-sm sm:text-base">
                        Stay updated with the latest news from the startup ecosystem and global markets.
                    </p>
                    <div className="mt-4 h-1 w-20 bg-[#FD7B41] mx-auto rounded-full"></div>
                </header>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-8 max-w-2xl mx-auto">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                        <button onClick={fetchAllNews} className="ml-4 underline font-bold">Try Again</button>
                    </div>
                )}

                {loading && visibleNewsData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Fetching global news...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Section - Detailed News (70%) */}
                        <div className="lg:col-span-8 space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                <i className="fas fa-newspaper mr-2 text-[#FD7B41]"></i> Top Stories
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {visibleNewsData.map((news, index) => (
                                    <div key={`${news.link}-${index}`} style={{ animationDelay: `${(index % 10) * 50}ms` }}>
                                        <NewsCard news={news} variant="detailed" />
                                    </div>
                                ))}
                            </div>

                            {hasMoreNews && (
                                <div className="mt-10 flex justify-center">
                                    <button
                                        onClick={handleLoadMoreNews}
                                        className="px-8 py-3 bg-[#FD7B41] text-white font-bold rounded-full hover:bg-[#e06b36] transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center space-x-2"
                                    >
                                        <span>Load More Stories</span>
                                        <i className="fas fa-chevron-down text-xs"></i>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Section - Google RSS (30%) */}
                        <div className="lg:col-span-4 lg:border-l lg:pl-8 dark:border-gray-800 space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                <i className="fas fa-rss mr-2 text-blue-500"></i> Trending Updates
                            </h2>

                            <div className="space-y-4">
                                {visibleGoogleRSS.map((news, index) => (
                                    <div key={`${news.link}-${index}`} style={{ animationDelay: `${(index % 10) * 30}ms` }}>
                                        <NewsCard news={news} variant="compact" />
                                    </div>
                                ))}
                            </div>

                            {hasMoreRSS && (
                                <div className="mt-6 flex justify-center">
                                    <button
                                        onClick={handleLoadMoreRSS}
                                        className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 border border-gray-200 dark:border-gray-700"
                                    >
                                        <span>More Updates</span>
                                        <i className="fas fa-chevron-down text-xs"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
        </div>
    );
};

export default NewsPage;

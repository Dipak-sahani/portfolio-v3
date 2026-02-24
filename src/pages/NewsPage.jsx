import React, { useEffect, useCallback } from "react";
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
        didFetch,
        error,
        fetchAllNews,
        loadMoreNews,
        loadMoreRSS,
    } = useNewsStore();

    /* --------------------------
       Scroll to top on mount
    --------------------------- */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /* --------------------------
       Fetch only once (safe)
    --------------------------- */
    useEffect(() => {
        if (!didFetch && !loading) {
            fetchAllNews();
        }
    }, [didFetch, loading, fetchAllNews]);

    /* --------------------------
       Handlers
    --------------------------- */
    const handleLoadMoreNews = useCallback(() => {
        const loaded = loadMoreNews();
        if (loaded) {
            window.scrollBy({ top: 400, behavior: "smooth" });
        }
    }, [loadMoreNews]);

    const handleLoadMoreRSS = useCallback(() => {
        loadMoreRSS();
    }, [loadMoreRSS]);

    const hasMoreNews = visibleNewsData.length < newsdata.length;
    const hasMoreRSS = visibleGoogleRSS.length < googleRSS.length;

    return (
        <>
            {/* --------------------------
          SEO
      --------------------------- */}
            <Helmet>
                <title>Market Insights | Berojgar Founder</title>
                <meta
                    name="description"
                    content="Latest startup news, founder insights, and business market updates curated for creators and entrepreneurs."
                />
                <link rel="canonical" href="https://berojgarfounder.com/news" />
            </Helmet>

            <div className="min-h-screen bg-[#F3F2EF] dark:bg-gray-900 pt-8 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">

                    {/* --------------------------
              Header
          --------------------------- */}
                    <header className="mb-10 text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3C4044] dark:text-white mb-2">
                            Market <span className="text-[#FD7B41]">Insights</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto italic text-sm sm:text-base">
                            Stay updated with the latest news from the startup ecosystem and global markets.
                        </p>
                        <div className="mt-4 h-1 w-20 bg-[#FD7B41] mx-auto rounded-full"></div>
                    </header>

                    {/* --------------------------
              Error State
          --------------------------- */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg text-center mb-8 max-w-2xl mx-auto">
                            {error}
                            <button
                                onClick={fetchAllNews}
                                className="ml-4 underline font-bold"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* --------------------------
              Loading State
          --------------------------- */}
                    {loading && visibleNewsData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                                Fetching global news...
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* --------------------------
                  Left Section (70%)
              --------------------------- */}
                            <section className="lg:col-span-8 space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                    Top Stories
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {visibleNewsData.map((news, index) => (
                                        <NewsCard
                                            key={news.link || index}
                                            news={news}
                                            variant="detailed"
                                        />
                                    ))}
                                </div>

                                {hasMoreNews && (
                                    <div className="mt-10 flex justify-center">
                                        <button
                                            onClick={handleLoadMoreNews}
                                            className="px-8 py-3 bg-[#FD7B41] text-white font-bold rounded-full hover:bg-[#e06b36] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                                        >
                                            Load More Stories
                                        </button>
                                    </div>
                                )}
                            </section>

                            {/* --------------------------
                  Right Section (30%)
              --------------------------- */}
                            <aside className="lg:col-span-4 lg:border-l lg:pl-8 dark:border-gray-800 space-y-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                    Trending Updates
                                </h2>

                                <div className="space-y-4">
                                    {visibleGoogleRSS.map((news, index) => (
                                        <NewsCard
                                            key={news.link || index}
                                            news={news}
                                            variant="compact"
                                        />
                                    ))}
                                </div>

                                {hasMoreRSS && (
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            onClick={handleLoadMoreRSS}
                                            className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                                        >
                                            More Updates
                                        </button>
                                    </div>
                                )}
                            </aside>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NewsPage;
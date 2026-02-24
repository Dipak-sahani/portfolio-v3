import React, { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { saveNewsApi } from "../../services/news.service";
import { toast } from "react-toastify";

const NewsCard = ({ news, variant = "detailed", onDelete = null }) => {
    const { isAuthenticated } = useAuthStore();
    const [saving, setSaving] = useState(false);

    // Normalize fields between different sources
    const title = news.title;
    const link = news.link;
    const description = news.description;
    const image = news.image_url;
    const source = news.source_name || news.source || "News";
    const date = news.pubDate;

    const handleSave = async () => {
        if (!isAuthenticated) {
            toast.info("Please login to save news");
            return;
        }

        try {
            setSaving(true);
            await saveNewsApi({
                title,
                link,
                source,
                pubDate: date,
            });
            toast.success("News saved successfully!");
        } catch (error) {
            toast.error(error || "Failed to save news");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) {
            onDelete(news._id);
        }
    };

    if (variant === "compact") {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 fade-in animate-fadeIn mb-4">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 leading-tight line-clamp-2 hover:text-[#FD7B41] transition-colors">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h3>
                <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">{source}</span>
                    <span className="italic">{date ? new Date(date).toLocaleDateString() : "Recently"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full border border-transparent hover:border-gray-200 dark:hover:border-gray-700 fade-in animate-fadeIn relative group">
            {image && (
                <div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            )}

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold rounded capitalize">
                        {source}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 italic">
                        {date ? new Date(date).toLocaleDateString() : "Recently"}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 leading-snug line-clamp-2 hover:text-[#FD7B41] transition-colors">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h3>

                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                        {description}
                    </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center space-x-2 text-sm font-medium transition-colors ${isAuthenticated
                            ? "text-gray-600 dark:text-gray-300 hover:text-[#FD7B41]"
                            : "text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        <i className={`${saving ? "fas fa-spinner fa-spin" : "far fa-bookmark"}`}></i>
                        <span>{isAuthenticated ? (saving ? "Saving..." : "Save") : "Login to Save"}</span>
                    </button>

                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-[#FD7B41] hover:text-[#e06b36] text-sm font-semibold transition-colors"
                    >
                        <span>Read Full</span>
                        <i className="fas fa-external-link-alt text-xs"></i>
                    </a>
                </div>

                {onDelete && (
                    <button
                        onClick={handleDelete}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 shadow-sm z-10"
                        title="Remove from saved"
                    >
                        <i className="fas fa-trash-alt text-xs"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

export default NewsCard;

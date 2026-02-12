import React from 'react';
import { Link } from 'react-router-dom';
import { GUIDE_DATA } from '../../../public/data/guideData';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoneyBillWave,
    faChalkboard,
    faRocket,
    faChalkboardTeacher,
    faBookOpen,
    faCode,
    faPaintBrush,
    faBullhorn,
    faUserTie,
    faLaptopHouse,
    faUsers,
    faLaptopCode,
    faCreditCard,
    faGavel,
    faCalculator,
    faChartLine,
    faRobot
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const iconMap = {
    faMoneyBillWave,
    faChalkboard,
    faRocket,
    faChalkboardTeacher,
    faBookOpen,
    faCode,
    faPaintBrush,
    faBullhorn,
    faUserTie,
    faLaptopHouse,
    faUsers,
    faLaptopCode,
    faCreditCard,
    faGavel,
    faCalculator,
    faChartLine,
    faRobot
};


const GuidePage = ({ topic }) => {
    // If topic is passed as prop, use it. Otherwise try to get from URL params if we were to use a dynamic route like /guide/:topic
    // For this implementation, we are using specific routes mapping to specific props.

    const data = GUIDE_DATA[topic];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Topic Not Found</h1>
                    <p className="mb-6">The resources for this topic are currently being curated. Check back soon!</p>
                    <Link to="/" className="px-6 py-2 bg-[#FD7B41] text-white rounded-full hover:bg-[#e06b36] transition">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-4 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
                        <FontAwesomeIcon
                            icon={iconMap[data.icon] || faBookOpen}
                            className="text-4xl text-[#FD7B41]"
                        />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {data.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {data.tagline}
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {data.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 border border-gray-100 dark:border-gray-700"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-2">
                                {section.title}
                            </h2>

                            <div className="space-y-4">
                                {section.content.map((item, idx) => {
                                    // Basic markdown-like parsing for bold text
                                    const parts = item.split(/(\*\*.*?\*\*)/g);

                                    return (
                                        <div key={idx} className="flex items-start">
                                            <div className="shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-[#FD7B41] mr-3"></div>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                                {parts.map((part, partIdx) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={partIdx} className="text-gray-900 dark:text-gray-100 font-semibold">{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Ready to take the next step?
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/chat" className="px-8 py-3 bg-[#FD7B41] text-white font-medium rounded-full shadow-lg hover:bg-[#e06b36] hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Discuss with Community
                        </Link>
                        <Link to="/dashboard" className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 font-medium rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                            Go to Dashboard
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};



GuidePage.propTypes = {
    topic: PropTypes.string.isRequired,
};

export default GuidePage;

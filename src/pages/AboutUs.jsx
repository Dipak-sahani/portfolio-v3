import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUsers, faGlobe, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 bg-[#FD7B41] text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Empowering the Next Generation of Founders
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto"
                    >
                        Berojgar Founder is more than just a platform; it's a movement to connect visionaries, builders, and dreamers.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center gap-4"
                    >
                        <Link to="/auth" className="bg-white text-[#FD7B41] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                            Join the Community
                        </Link>
                    </motion.div>
                </div>
                {/* Decorative curve at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transition-colors duration-300" style={{ clipPath: 'ellipse(50% 100% at 50% 100%)' }}></div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-[#FD7B41]">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            We believe that great ideas shouldn't die because of a lack of resources or connections. Our mission is to democratize entrepreneurship by providing a space where anyone, regardless of their background, can find the right co-founders, team members, and mentors to build their dream startup.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Whether you're a developer looking for a visionary, or a business mind seeking technical talent, Berojgar Founder is the bridge that connects you.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: faRocket, title: "Launch", desc: "Turn ideas into reality", color: "text-[#FD7B41]", bg: "bg-orange-50 dark:bg-orange-900/20" },
                            { icon: faHandshake, title: "Connect", desc: "Find your perfect match", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", mt: "mt-8" },
                            { icon: faUsers, title: "Build", desc: "Grow together", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
                            { icon: faGlobe, title: "Impact", desc: "Solve global problems", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", mt: "mt-8" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`${item.bg} p-6 rounded-2xl text-center hover:scale-105 transition duration-300 ${item.mt || ''}`}
                            >
                                <FontAwesomeIcon icon={item.icon} className={`text-4xl ${item.color} mb-4`} />
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <blockquote className="text-2xl md:text-3xl font-light italic text-gray-700 dark:text-gray-300">
                            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
                        </blockquote>
                        <cite className="block mt-4 font-bold text-[#FD7B41]">- Steve Jobs</cite>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;

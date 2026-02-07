import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUsers, faGlobe, faRocket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 bg-[#FD7B41] text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Empowering the Next Generation of Founders</h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                        Berojgar Founder is more than just a platform; it's a movement to connect visionaries, builders, and dreamers.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/auth" className="bg-white text-[#FD7B41] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                            Join the Community
                        </Link>
                    </div>
                </div>
                {/* Decorative curve at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transition-colors duration-300" style={{ clipPath: 'ellipse(50% 100% at 50% 100%)' }}></div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-[#FD7B41]">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            We believe that great ideas shouldn't die because of a lack of resources or connections. Our mission is to democratize entrepreneurship by providing a space where anyone, regardless of their background, can find the right co-founders, team members, and mentors to build their dream startup.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Whether you're a developer looking for a visionary, or a business mind seeking technical talent, Berojgar Founder is the bridge that connects you.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl text-center hover:scale-105 transition duration-300">
                            <FontAwesomeIcon icon={faRocket} className="text-4xl text-[#FD7B41] mb-4" />
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Launch</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Turn ideas into reality</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center mt-8 hover:scale-105 transition duration-300">
                            <FontAwesomeIcon icon={faHandshake} className="text-4xl text-blue-500 mb-4" />
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Connect</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Find your perfect match</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl text-center hover:scale-105 transition duration-300">
                            <FontAwesomeIcon icon={faUsers} className="text-4xl text-green-500 mb-4" />
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Build</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Grow together</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl text-center mt-8 hover:scale-105 transition duration-300">
                            <FontAwesomeIcon icon={faGlobe} className="text-4xl text-purple-500 mb-4" />
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Impact</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Solve global problems</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container mx-auto px-6 text-center">
                    <blockquote className="text-2xl md:text-3xl font-light italic text-gray-700 dark:text-gray-300">
                        "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
                    </blockquote>
                    <cite className="block mt-4 font-bold text-[#FD7B41]">- Steve Jobs</cite>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;

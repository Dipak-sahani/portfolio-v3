import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CTASection = () => {
    return (
        <div className="w-full my-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#FD7B41] to-[#FF9E71] rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden transform hover:scale-[1.01] transition duration-500">

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-300 opacity-20 rounded-full blur-3xl"></div>

                <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 relative z-10">
                    Ready to Build Your Dream Team?
                </h2>
                <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 relative z-10">
                    Connect with ambitious co-founders, skilled developers, and visionary investors. Your startup journey begins here.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                    <Link
                        to="/auth"
                        className="bg-white text-[#FD7B41] px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2"
                    >
                        Get Started <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                    <Link
                        to="/about"
                        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/10 transition duration-300"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTASection;

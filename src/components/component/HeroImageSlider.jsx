import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const HeroImageSlider = () => {
    const images = [
        "https://img.berojgarfounder.com/website.content/dp0.jpg",
        "https://img.berojgarfounder.com/website.content/dp2.jpeg",
        "https://img.berojgarfounder.com/website.content/dp3.jpeg",
        "https://img.berojgarfounder.com/website.content/dp4.jpeg",
        "https://img.berojgarfounder.com/website.content/dp5.jpeg",
        "https://img.berojgarfounder.com/website.content/dp6.jpeg",
        "https://img.berojgarfounder.com/website.content/dp7.jpeg",
        "https://img.berojgarfounder.com/website.content/dp8.jpeg",
        "https://img.berojgarfounder.com/website.content/dp9.jpeg",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance every 3 seconds, pause on hover
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [isHovered, images.length]);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-xl bg-black/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Startup ${currentIndex}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, scale: 0.8, z: -100 }}
                    animate={{ opacity: 1, scale: 1, z: 0 }}
                    exit={{ opacity: 0, scale: 1.1, z: 100 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {/* Controls */}
            <button
                onClick={prevImage}
                className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
            >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 flex gap-2 z-10">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentIndex ? "bg-white w-4" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroImageSlider;

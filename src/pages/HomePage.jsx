import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNotificationStore } from "../store/notification.store";
import Posts from "./Posts";
import HeroImageSlider from "../components/component/HeroImageSlider";
import CTASection from "../components/component/CTASection";
import { motion } from "framer-motion";
import { getAuthToken } from "../services/auth.service";

const HomePage = () => {
  const { user, isAuthenticated, loadUser } = useAuthStore();
  const { fetchNotification } = useNotificationStore();
  const token = getAuthToken();

  useEffect(() => {
    if (token) {
      loadUser();
    }
  }, [token, loadUser]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotification();
    }
  }, [isAuthenticated, fetchNotification]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const wordAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120
      }
    })
  };

  const sloganWords = ['" Find ', "Your ", "Team. ", "Build ", "Your ", "Startup ", "and ", 'Business "'];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      {/* Background with Overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out hover:scale-105"
          style={{
            backgroundImage: "url('https://twjy8inzgmn5uu9r.public.blob.vercel-storage.com/berojgarfounder/bgIMG.png')",
          }}
        ></div>
        {/* Darker Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="
            w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
            pt-32 pb-16
            flex flex-col items-center text-center
          "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            {user && <span className="block text-2xl sm:text-3xl font-medium text-gray-300 mb-2">Welcome back, {user?.fullName}</span>}
            Welcome to <span className="inline-block relative  transform hover:scale-105 transition-transform cursor-default"> <span className="text-red-500">Be</span>rojgar Founder</span>
          </motion.h1>

          <motion.div
            className="text-xl sm:text-3xl font-semibold text-gray-200 mt-6 max-w-4xl leading-relaxed font-myIrish italic drop-shadow-md"
            variants={itemVariants}
          >
            {sloganWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordAnimation}
                className="inline-block px-1 cursor-default hover:text-[#FD7B41] transition-colors duration-300"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 w-full"
            variants={itemVariants}
          >
            <HeroImageSlider />
          </motion.div>

          {!isAuthenticated && (
            <motion.div
              className="mt-16 w-full max-w-5xl"
              variants={itemVariants}
            >
              <CTASection />
            </motion.div>
          )}

          <motion.div
            className="mt-20 w-full max-w-5xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
              <h2 className="font-bold text-3xl text-white tracking-wide uppercase drop-shadow-md">Latest Community Posts</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
            </div>

            <Posts isHome={true} />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

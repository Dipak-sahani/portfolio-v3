import { faEdit, faEllipsisV, faUser, faShareAlt, faFlag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import Notes from "../Notes";
import { Link } from "react-router-dom";
import StartupForm from "./StartupForm";
import { motion, AnimatePresence } from "framer-motion";
import MediaUploadModal from "../../components/common/MediaUploadModal";
import { useStartupStore } from "../../store/startup.store";
import { toast } from "react-toastify";
import ShareModal from "../../components/common/ShareModal";
import ReportModal from "../../components/common/ReportModal";

const StartupProfile = ({ isUser = true, startupData }) => {
  // Mock data based on your Mongoose Schema
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);

  // Menu and Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Separate edit states
  const [isLogoEditOpen, setIsLogoEditOpen] = useState(false);
  const [isCoverEditOpen, setIsCoverEditOpen] = useState(false);

  const saveStartup = useStartupStore((state) => state.saveStartup);

  const handleLogoUpdate = async (file) => {
    const res = await saveStartup({ _id: startupData._id, logoFile: file });
    if (res.success) {
      toast.success("Logo updated successfully");
    } else {
      toast.error(res.error || "Failed to update logo");
    }
  };

  const handleCoverUpdate = async (file) => {
    const res = await saveStartup({ _id: startupData._id, coverImageFile: file });
    if (res.success) {
      toast.success("Cover image updated successfully");
    } else {
      toast.error(res.error || "Failed to update cover image");
    }
  };

  const data = startupData || {
    // Default mock data if none provided
    name: "Nexus AI",
    tagline: "Revolutionizing predictive logistics for global supply chains.",
    logoUrl: "https://via.placeholder.com/100",
    coverImageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    description: "Nexus AI leverages deep learning to predict shipping delays before they happen, saving companies millions in lost productivity and logistics overhead.",
    problemStatement: "Global supply chains are reactive, leading to massive inefficiencies when unexpected delays occur.",
    solution: "A real-time predictive engine that suggests rerouting options 48 hours before a bottleneck manifests.",
    market: "Fortune 500 Logistics and E-commerce retailers.",
    businessModel: "SaaS - Tiered monthly subscription based on volume.",
    mvpStatus: "MVP",
    fundingStage: "seed",
    teamSize: 12,
    skillsRequired: ["Rust Engineer", "ML Ops", "Product Designer"],
    tags: ["AI", "Logistics", "SaaS"],
    website: "https://nexus-ai.io",
    socialLinks: { linkedin: "#", twitter: "#", github: "#" },
    founderName: "Alex Rivera",
  };

  // Helper for empty states
  const renderContentOrPlaceholder = (content, placeholder) => {
    if (content) return <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{content}</p>;
    return (
      <p className="text-sm text-gray-400 dark:text-gray-500 italic border-l-4 border-gray-200 dark:border-gray-700 pl-3 py-1">
        {placeholder}
      </p>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#DDDCDB] dark:bg-gray-900 font-sans text-[#3C4044] dark:text-gray-200 transition-colors duration-300">
      {/* Cover Image */}
      {openNotes && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 m-20 inset-0 bg-cover bg-center border-10 border-amber-900"
          style={{
            backgroundImage: "url('/images/notes.png')",
          }}
        >
          <Notes onClose={() => setOpenNotes(false)} />
        </div>
      )}
      <div className="h-64 w-full relative overflow-hidden">
        <img
          src={data?.coverImageUrl || null}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
        {isUser && (
          <button
            onClick={() => setIsCoverEditOpen(true)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-all"
            title="Change Cover Image"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
      </div>

      <div className="absolute top-30 sm:top-50 right-10 flex gap-2 z-5">
        {isUser && (
          <>
            <button
              onClick={() => setOpenNotes(true)}
              className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition shadow-lg"
            >
              <FontAwesomeIcon icon={faEdit} /> Notes
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition shadow-lg"
            >
              <FontAwesomeIcon icon={faEdit} /> EDIT PROFILE
            </button>
          </>
        )}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded bg-white/20 hover:bg-white/40 transition"
          >
            <FontAwesomeIcon icon={faEllipsisV} className="text-white" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsShareOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                  >
                    <FontAwesomeIcon icon={faShareAlt} className="text-blue-500 w-4" />
                    Share Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsReportOpen(true);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                  >
                    <FontAwesomeIcon icon={faFlag} className="text-red-500 w-4" />
                    Report Startup
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Sidebar Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-b-4 border-[#FD7B41]">
              <div className="flex flex-col items-center text-center">
                <div className="relative -mt-16 inline-block group">
                  <img
                    src={data?.logoUrl || "/images/logo.png"}
                    className="w-24 h-24 rounded-2xl shadow-md border-4 border-white dark:border-gray-700 bg-white dark:bg-gray-700 object-cover"
                    alt="Logo"
                  />
                  {isUser && (
                    <button
                      onClick={() => setIsLogoEditOpen(true)}
                      className="absolute -bottom-2 -right-2 bg-[#FD7B41] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform text-xs"
                      title="Change Logo"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{data?.name}</h1>
                <p className="text-[#FD7B41] font-medium uppercase text-xs tracking-widest">
                  {data?.fundingStage}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                  "{data?.tagline || "Innovating the future, one step at a time."}"
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-user-tie text-[#EDBF9B] w-5"></i>
                  <span className="text-sm">
                    Founder: <strong className="text-gray-900 dark:text-gray-200">{data?.founderName}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-users text-[#EDBF9B] w-5"></i>
                  <span className="text-sm">Team Size: {data?.teamSize ? data?.teamSize : data?.team?.members?.length}</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-rocket text-[#EDBF9B] w-5"></i>
                  <span className="text-sm text-capitalize">
                    Status: {data?.mvpStatus}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-globe text-[#EDBF9B] w-5"></i>
                  <a
                    href={data?.website}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {data?.website || "Website not added"}
                  </a>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
                <a href={data?.socialLinks?.linkedin} className="text-[#3C4044] dark:text-gray-400 hover:text-[#FD7B41] dark:hover:text-[#FD7B41] transition-colors"><i className="fab fa-linkedin fa-lg"></i></a>
                <a href={data?.socialLinks?.twitter} className="text-[#3C4044] dark:text-gray-400 hover:text-[#FD7B41] dark:hover:text-[#FD7B41] transition-colors"><i className="fab fa-twitter fa-lg"></i></a>
                <a href={data?.socialLinks?.github} className="text-[#3C4044] dark:text-gray-400 hover:text-[#FD7B41] dark:hover:text-[#FD7B41] transition-colors"><i className="fab fa-github fa-lg"></i></a>
              </div>
            </div>

            {/* Hiring/Skills Card */}
            <motion.div variants={itemVariants} className="bg-[#3C4044] dark:bg-gray-800 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-[#EDBF9B] font-bold mb-4 uppercase text-sm">
                Hiring / Skills Needed
              </h3>
              <div className="flex flex-wrap gap-2">
                {data?.skillsRequired?.length > 0 ? data.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/20"
                  >
                    {skill}
                  </span>
                )) : (
                  <span className="text-xs text-gray-400 italic">No specific roles listed yet.</span>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md transition-colors duration-300">
              <h2 className="text-xl font-bold mb-4 border-l-4 border-[#FD7B41] pl-4 text-gray-900 dark:text-white">
                About the Startup
              </h2>
              {renderContentOrPlaceholder(
                data?.description,
                "Briefly describe your startup's mission and vision here. What are you building and why?"
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-[#DDDCDB]/30 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-bold text-[#FD7B41] mb-2">
                    <i className="fas fa-exclamation-triangle mr-2"></i>The Problem
                  </h4>
                  {renderContentOrPlaceholder(
                    data?.problemStatement,
                    "What pain point are you solving? Explain the problem clearly to help others understand the need."
                  )}
                </div>
                <div className="p-4 bg-[#EDBF9B]/20 dark:bg-[#EDBF9B]/10 rounded-xl">
                  <h4 className="font-bold text-[#3C4044] dark:text-gray-200 mb-2">
                    <i className="fas fa-lightbulb mr-2"></i>The Solution
                  </h4>
                  {renderContentOrPlaceholder(
                    data?.solution,
                    "How does your product solve the problem? Highlight your unique value proposition."
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md transition-colors duration-300">
                <h4 className="font-bold mb-3 uppercase text-xs tracking-widest text-gray-400">
                  Market & Competition
                </h4>
                {renderContentOrPlaceholder(
                  data?.market,
                  "Who is your target audience? Mention your market size and key competitors."
                )}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md transition-colors duration-300">
                <h4 className="font-bold mb-3 uppercase text-xs tracking-widest text-gray-400">
                  Business Model
                </h4>
                {renderContentOrPlaceholder(
                  data?.businessModel,
                  "How do you plan to make money? e.g. SaaS, Marketplace, Ads, etc."
                )}
              </div>
            </motion.div>

            {/* Tags Section */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {data?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#FD7B41] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              {isUser && (
                <Link
                  to="/team"
                  className="bg-[#DDDCDB] dark:bg-gray-700 text-[#3C4044] dark:text-gray-200 px-4 py-1 rounded font-bold flex items-center gap-2 hover:brightness-110 border-2 dark:border-gray-600 w-40 text-center h-12 text-xl hover:scale-110 transition"
                >
                  Team
                </Link>
              )}

              <h1 className="my-2 font-bold text-gray-900 dark:text-white">Team Name :  <span className="text-[#FD7B41]"> {data.team?.name || "Not Assigned"}</span> </h1>


              <div className="flex my-5 py-2 px-4 gap-4 overflow-x-auto no-scrollbar">
                {data?.team?.members?.length > 0 ? data.team.members.map((user, id) => (
                  <Link to={`/profile/${user?.userId?._id}`} key={id} className="flex items-center gap-3 border-2 p-2 rounded-2xl border-[#FD7B41] cursor-pointer bg-white dark:bg-gray-800 min-w-[200px]">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                      {user?.userId?.avatar ? (
                        <img
                          src={user.userId.avatar}
                          alt={user?.userId?.username || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faUser}
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        />
                      )}
                    </div>

                    {/* Username */}
                    <div className="flex flex-col leading-tight overflow-hidden">
                      <div className="flex justify-between">
                        <h1 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.userId?.fullName}
                        </h1>
                        <h1 className=" pl-2  text-[#FD7B41] text-sm font-semibold  truncate">
                          {user?.role}
                        </h1>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        @{user?.userId?.username}
                      </span>
                    </div>

                  </Link>
                )) : (
                  <p className="text-gray-500 italic text-sm">No team members added yet.</p>
                )}


              </div>
            </motion.div>
          </div>

          {isEditOpen && (
            <StartupForm
              initialData={startupData}
              isEdit={startupData ? true : false}
              onClose={() => setIsEditOpen(false)}
            />
          )}

          <MediaUploadModal
            isOpen={isLogoEditOpen}
            onClose={() => setIsLogoEditOpen(false)}
            onUpload={handleLogoUpdate}
            title="Update Startup Logo"
            aspectRatio="square"
          />

          <MediaUploadModal
            isOpen={isCoverEditOpen}
            onClose={() => setIsCoverEditOpen(false)}
            onUpload={handleCoverUpdate}
            title="Update Cover Image"
            aspectRatio="video"
          />

          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            title={`Check out ${data.name} on Berojgar Founder`}
            url={window.location.href}
            content={data.tagline}
          />

          <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
            targetId={startupData?._id}
            targetType="Startup"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default StartupProfile;

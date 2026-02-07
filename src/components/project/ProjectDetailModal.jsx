import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectShowCaseCard from "../../card/ProjectShowCaseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Assuming we might need a service to fetch project details if not fully provided, 
// but for 'Liked Projects', we mostly have the data in the dashboard.
// If we need to fetch more, we can add a service call here.
// For now, checks if 'project' is passed or fetches if only ID is passed (placeholder logic for fetch).

const ProjectDetailModal = ({ project, projectId, onClose }) => {
    const [displayProject, setDisplayProject] = useState(project);
    const [loading, setLoading] = useState(!project);

    useEffect(() => {
        if (project) {
            setDisplayProject(project);
            setLoading(false);
            return;
        }

        // Logic to fetch project if only ID is provided
        // For now, we will rely on the parent passing the full project object from the dashboard data
        // as fetching single project service might not be readily available or imported yet.
        // If needed, we can implement: const res = await getProjectById(projectId);

        if (projectId && !project) {
            // Placeholder for fetch logic
            // For dashboard liked items, we usually have the full object.
            // If this is ever used where we only have ID, we need to add fetch logic.
            setLoading(false); // Just stop loading to show "Not found" or handle gracefully
        }

    }, [project, projectId]);

    // ProjectShowCaseCard requires a 'callBack' for comments usually?
    // Let's check ProjectShowCaseCard usage in ProjectShowCase.jsx:
    // <ProjectCard key={id} project={project} callBack={openCommentOverlay} />
    // We need to provide a dummy callback or handle comments if we want that feature in modal.
    const handleCommentOpen = (id) => {
        // For now, maybe do nothing or log?
        // Or we can implement a local comment overlay state if needed.
        console.log("Open comments for", id);
    };


    return (
        <AnimatePresence>
            {(displayProject || projectId) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#F3F2EF] dark:bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative custom-scrollbar"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-gray-600 dark:text-gray-300 text-xl" />
                        </button>

                        <div className="p-4 md:p-6 mt-6">
                            {loading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : displayProject ? (
                                <ProjectShowCaseCard project={displayProject} callBack={handleCommentOpen} />
                            ) : (
                                <div className="p-8 text-center text-gray-500">Project not found.</div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;

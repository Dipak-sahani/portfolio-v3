import { useState } from "react";
import { STARTUP_IDEAS } from "../../../public/data/journeyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function StartupExplorer() {
  const [selectedKey, setSelectedKey] = useState("homeServices");
  const idea = STARTUP_IDEAS[selectedKey];
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Sidebar */}
        <aside
          className="
          bg-white dark:bg-gray-800 rounded-xl shadow
          p-4
          md:col-span-1
          md:sticky md:top-6
          h-fit
          transition-colors duration-300
        "
        >
          <h2 className="font-bold text-base sm:text-lg mb-3 dark:text-gray-200">
            Startup Ideas
          </h2>

          <div className="relative">
            <button
              className="
      w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-700 text-left dark:text-gray-200
      focus:ring-2 focus:ring-blue-500
      flex justify-between items-center
    "
              onClick={() => setOpen(!open)}
            >
              <span className="truncate">{STARTUP_IDEAS[selectedKey]?.title}</span>
              <span>▾</span>
            </button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="
        absolute z-50 mt-1 w-full
        max-h-60 overflow-y-auto
        bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-xl
      "
              >
                {Object.entries(STARTUP_IDEAS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedKey(key);
                      setOpen(false);
                    }}
                    className="
            w-full text-left px-4 py-2
            hover:bg-gray-100 dark:hover:bg-gray-600
            dark:text-gray-200
            truncate
          "
                  >
                    {value.title}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Desktop Sidebar List (Visible on larger screens if desired, but current design uses dropdown for mobile compat. 
                If we want a list for desktop, we could condition it. For now, enhancing the existing structure.) */}
          </div>

          {/* Desktop Sidebar List - Hidden on mobile, often better for UX on desktop */}
          <div className="hidden md:block mt-4 space-y-2">
            {Object.entries(STARTUP_IDEAS).map(([key, value]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedKey(key)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${selectedKey === key
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
              >
                {value.title}
              </motion.button>
            ))}
          </div>

        </aside>

        {/* Main Content */}
        <main
          className="
          md:col-span-3
          bg-white dark:bg-gray-800 rounded-xl shadow
          p-4 sm:p-6
          min-h-[600px]
          transition-colors duration-300
        "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-gray-100"
                >
                  {idea.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1"
                >
                  {idea.tagline}
                </motion.p>
              </div>

              {/* Check if idea has the new detailed structure */}
              {idea["1_idea_and_vision"] ? (
                <div className="space-y-8">
                  {Object.entries(idea).map(([key, sectionData], index) => {
                    // Filter out title, tagline, categories, etc.
                    if (key === 'title' || key === 'tagline' || key === 'categories') return null;

                    // Helper helper to format key: "1_idea_and_vision" -> "1. Idea and Vision"
                    const formatTitle = (k) => {
                      const parts = k.split('_');
                      if (!isNaN(parts[0])) {
                        return parts.shift() + '. ' + parts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      }
                      return k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    };

                    return (
                      <motion.section
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg"
                      >
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
                          {formatTitle(key)}
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(sectionData).map(([subKey, value]) => (
                            <div key={subKey}>
                              <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                {subKey.replace(/_/g, ' ')}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300">
                                {value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.section>
                    );
                  })}
                </div>
              ) : (
                /* Legacy View */
                <>
                  {/* Problem */}
                  {idea.problem && (
                    <motion.section
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 flex items-center dark:text-gray-200">
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className="mr-2 text-yellow-500"
                        />
                        Problem
                      </h3>

                      {Array.isArray(idea.problem) ? (
                        <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base dark:text-gray-300">
                          {idea.problem.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="space-y-3 text-sm sm:text-base dark:text-gray-300">
                          <div>
                            <h4 className="font-medium dark:text-gray-200">Customers</h4>
                            <ul className="list-disc pl-5">
                              {idea.problem.customers?.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium dark:text-gray-200">Service Providers</h4>
                            <ul className="list-disc pl-5">
                              {idea.problem.providers?.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </motion.section>
                  )}

                  {/* Solution */}
                  {idea.solution && (
                    <motion.section
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 dark:text-gray-200">
                        Solution
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base dark:text-gray-300">
                        {idea.solution.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </motion.section>
                  )}

                  {/* Revenue */}
                  {idea.revenueModel && (
                    <motion.section
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 flex items-center dark:text-gray-200">
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          className="mr-2 text-green-600"
                        />
                        Revenue Model
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base dark:text-gray-300">
                        {idea.revenueModel.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </motion.section>
                  )}

                  {/* Roadmap */}
                  {idea.roadmap && (
                    <motion.section
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="font-semibold text-lg sm:text-xl mb-2 dark:text-gray-200">
                        Roadmap
                      </h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm sm:text-base dark:text-gray-300">
                        {idea.roadmap.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ol>
                    </motion.section>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );


}

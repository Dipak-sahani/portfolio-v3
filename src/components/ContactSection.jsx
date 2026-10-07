import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Download, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export default function ContactSection({ sectionRef }) {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("submitted");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-4 sm:px-8 lg:px-16 font-mono border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs">
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>INITIATE CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            GET IN TOUCH
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Interactive Form */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              SEND DIRECT MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-500 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-500 uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-500 uppercase">Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Inquiry regarding SDE or Full Stack roles..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-sans font-bold text-xs uppercase hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors cursor-pointer border-none"
              >
                {formStatus === "submitting" ? (
                  <span>TRANSMITTING...</span>
                ) : formStatus === "submitted" ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" /> MESSAGE
                    TRANSMITTED
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    SEND MESSAGE <Send className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details & Links */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              COMMUNICATION CHANNELS
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">
                    EMAIL
                  </span>
                  <a
                    href="mailto:dipaksahani050@gmail.com"
                    className="font-bold text-neutral-900 dark:text-white hover:text-emerald-500"
                  >
                    dipaksahani050@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">
                    PHONE
                  </span>
                  <a
                    href="tel:+918080014894"
                    className="font-bold text-neutral-900 dark:text-white hover:text-emerald-500"
                  >
                    +91 8080014894
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">
                    LOCATION
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-white">
                    Nashik / Pune, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <a
                href="https://linkedin.com/in/dipak-sahani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white hover:border-emerald-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-emerald-500" />
                  LINKEDIN PROFILE
                </span>
                <span>↗</span>
              </a>

              <a
                href="https://github.com/dipak-sahani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white hover:border-emerald-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-emerald-500" />
                  GITHUB REPOSITORIES
                </span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

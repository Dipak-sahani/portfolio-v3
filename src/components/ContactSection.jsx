import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Download, Check, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';

export default function ContactSection({ sectionRef }) {
  // 1. PASTE YOUR WEB3FORMS ACCESS KEY HERE
  const WEB3FORMS_ACCESS_KEY = "ec211dd9-62c0-4624-bd8e-22a079eea024";

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: "Dipak Sahani Portfolio",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('submitted');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setErrorMessage(result.message || 'Failed to send message.');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 px-4 sm:px-8 lg:px-16 font-mono border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
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
          
          {/* Direct Interactive Web3Forms Form */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              SEND DIRECT MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Spam protection honeypot field (hidden) */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-500 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-500 uppercase">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-3 text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {/* Status Alert Banner */}
              {formStatus === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-sans font-bold text-xs uppercase hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors cursor-pointer border-none disabled:opacity-50"
              >
                {formStatus === 'submitting' ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : formStatus === 'submitted' ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" /> MESSAGE SENT TO DIPAK!
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    SEND MESSAGE <Send className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details & Social Links */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              COMMUNICATION CHANNELS
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">EMAIL</span>
                  <a href="mailto:dipaksahani050@gmail.com" className="font-bold text-neutral-900 dark:text-white hover:text-emerald-500">
                    dipaksahani050@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">PHONE</span>
                  <a href="tel:+918080014894" className="font-bold text-neutral-900 dark:text-white hover:text-emerald-500">
                    +91 8080014894
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="text-neutral-400 block text-[10px]">LOCATION</span>
                  <span className="font-bold text-neutral-900 dark:text-white">Nashik / Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <a
                href="https://linkedin.com/in/dipaksahani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white hover:border-emerald-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-emerald-500" /> LINKEDIN PROFILE
                </span>
                <span>↗</span>
              </a>

              <a
                href="https://github.com/dipaksahani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-white hover:border-emerald-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-emerald-500" /> GITHUB REPOSITORIES
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
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../store/auth.store";
import { updateProfileApi } from "../../services/auth.service";

const EditProfileForm = ({ isOpen, onClose }) => {
  const { user, loading, setUser } = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    city: "",
    country: "",
    headline: "",
    bio: "",
    avatar: null,
    coverImage: null,
    // New fields
    skills: "",
    interests: "",
    languages: "",
    experienceLevel: "",
    lookingFor: "",
    timeCommitment: "",
    remotePreference: true,
    startupStagePreference: "",
    github: "",
    linkedin: "",
    twitter: "",
    isPublic: true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        city: user.city || "",
        country: user.country || "",
        headline: user.headline || "",
        bio: user.bio || "",
        avatar: null,
        coverImage: null,
        // Convert arrays to comma-separated strings for editing
        skills: user.skills?.join(", ") || "",
        interests: user.interests?.join(", ") || "",
        languages: user.languages?.join(", ") || "",
        startupStagePreference: user.startupStagePreference?.join(", ") || "",

        experienceLevel: user.experienceLevel || "",
        lookingFor: user.lookingFor || "",
        timeCommitment: user.timeCommitment || "",
        remotePreference: user.remotePreference ?? true,

        // Social Links
        github: user.socialLogins?.github || "",
        linkedin: user.socialLogins?.linkedin || "",
        twitter: user.socialLogins?.twitter || "",

        isPublic: user.isPublic ?? true,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("userId", user._id);

    // Helper to process arrays
    const processArray = (str) =>
      str ? str.split(",").map(s => s.trim()).filter(Boolean) : [];

    // Map simple text fields
    const textFields = ["username", "city", "country", "headline", "bio", "timeCommitment", "experienceLevel", "lookingFor"];
    textFields.forEach(key => {
      if (form[key]) data.append(key, form[key]);
    });

    // Map array fields - append each item individually
    const arrayFields = ["skills", "interests", "languages", "startupStagePreference"];
    arrayFields.forEach(key => {
      const arr = processArray(form[key]);
      arr.forEach(item => data.append(key, item));
    });

    // Social Links - send as JSON string
    const socialLogins = {
      github: form.github,
      linkedin: form.linkedin,
      twitter: form.twitter
    };
    data.append("socialLogins", JSON.stringify(socialLogins));

    // Boolean fields
    data.append("remotePreference", form.remotePreference);
    data.append("isPublic", form.isPublic);

    // Files and existing images
    if (form.avatar) {
      data.append("avatar", form.avatar);
    }
    if (form.coverImage) {
      data.append("coverImage", form.coverImage);
    }

    try {
      const updated = await updateProfileApi(data);
      setUser(updated.user);
      onClose();
    } catch (error) {
      console.error("Update profile error:", error);
      // toast handling is likely in the service or global error handler, but good to have fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#3C4044] overflow-hidden shadow-2xl my-8 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-700 bg-gray-50 dark:bg-[#3C4044]">
          <h2 className="text-xl font-bold text-[#FD7B41] uppercase tracking-tight">
            Edit Full Profile
          </h2>
          <button onClick={onClose} className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">

          {/* Cover & Avatar Section */}
          <div className="space-y-4">
            <div className="relative h-32 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden group">
              <img
                src={user?.coverImage ? `${import.meta.env.VITE_IMG_CDN}/${user.coverImage}` : "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000"}
                className="w-full h-full object-cover opacity-50"
                alt="Banner Preview"
              />
              <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/40 transition">
                <FontAwesomeIcon icon={faCamera} className="text-white mb-2" />
                <span className="text-xs text-white font-semibold">Change Cover</span>
                <input type="file" name="coverImage" className="hidden" onChange={handleFile} />
              </label>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FD7B41] group">
                <img
                  src={user?.avatar ? `${import.meta.env.VITE_IMG_CDN}/${user.avatar}` : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"}
                  className="w-full h-full object-cover opacity-60"
                  alt="Profile"
                />
                <label className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black/40 transition">
                  <FontAwesomeIcon icon={faCamera} className="text-white text-sm" />
                  <input type="file" name="avatar" className="hidden" onChange={handleFile} />
                </label>
              </div>

              <div className="flex-grow">
                <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={form.headline}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={form.bio}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none resize-none transition-colors"
            ></textarea>
          </div>

          {/* Professional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Experience Level</label>
              <select
                name="experienceLevel"
                value={form.experienceLevel}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              >
                <option value="">Select Level</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="founder">Founder</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Looking For</label>
              <select
                name="lookingFor"
                value={form.lookingFor}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              >
                <option value="">Select Goal</option>
                <option value="cofounder">Co-founder</option>
                <option value="job">Job</option>
                <option value="freelance">Freelance</option>
                <option value="networking">Networking</option>
              </select>
            </div>
          </div>

          {/* Comma Separated Lists */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Skills (Comma separated)</label>
              <input
                type="text"
                name="skills"
                placeholder="React, Node.js, Design..."
                value={form.skills}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Interests (Comma separated)</label>
              <input
                type="text"
                name="interests"
                placeholder="AI, Blockchain, UI/UX..."
                value={form.interests}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Languages (Comma separated)</label>
              <input
                type="text"
                name="languages"
                placeholder="English, Spanish, Hindi..."
                value={form.languages}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Startup Stage Preference (Comma separated)</label>
              <input
                type="text"
                name="startupStagePreference"
                placeholder="Idea, MVP, Growth..."
                value={form.startupStagePreference}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Social Links -- New Section */}
          <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">
              Social Links
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  name="github"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="twitter"
                  placeholder="Twitter/X URL"
                  value={form.twitter}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-[#EDBF9B] uppercase mb-1">Time Commitment</label>
              <input
                type="text"
                name="timeCommitment"
                placeholder="10h/week, Full-time..."
                value={form.timeCommitment}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-[#3C4044] border border-zinc-300 dark:border-zinc-600 text-gray-900 dark:text-[#DDDCDB] rounded p-2 focus:border-[#FD7B41] outline-none transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remotePreference"
                  checked={form.remotePreference}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#FD7B41]"
                />
                <span className="text-sm font-bold text-gray-700 dark:text-[#DDDCDB]">Open to Remote?</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={form.isPublic}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#FD7B41]"
                />
                <span className="text-sm font-bold text-gray-700 dark:text-[#DDDCDB]">Public Profile?</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-zinc-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-400 py-3 rounded font-bold uppercase text-xs hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#FD7B41] text-[#3C4044] py-3 rounded font-bold uppercase text-xs hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

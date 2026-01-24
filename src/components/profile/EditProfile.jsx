import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../store/auth.store";
import { uploadImage } from "../../services/upload.service";
// import { updateProfileApi } from "@/services/user.api";
import { updateProfileApi } from "../../services/auth.service";
const EditProfileForm = ({ isOpen, onClose }) => {
  const { user, loading , setUser} = useAuthStore();

  const [form, setForm] = useState({
    username: "",
    city: "",
    country: "",
    headline: "",
    bio: "",
    avatar: null,
    coverImage: null,
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
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { userId: user._id }; // send userId for backend verification

    // Upload avatar if exists
    if (form.avatar) {
      payload.avatar = await uploadImage(form.avatar, "avatars");
    }

    // Upload cover image if exists
    if (form.coverImage) {
      payload.coverImage = await uploadImage(form.coverImage, "covers");
    }

    // Add other fields if not empty
    ["username", "city", "country", "headline", "bio"].forEach((key) => {
      if (form[key] !== "") payload[key] = form[key];
    });

    const updated = await updateProfileApi(payload);
    setUser(updated.user); // update Zustand store
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-lg border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            Edit Profile
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar"
        >
          {/* Banner Edit */}
          <div className="relative h-32 w-full bg-zinc-800 rounded-md overflow-hidden group">
            <img
              src={user?.coverImage || "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000"}
              className="w-full h-full object-cover opacity-50"
              alt="Banner Preview"
            />
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group-hover:bg-black/40 transition">
              <FontAwesomeIcon icon={faCamera} className="text-white mb-2" />
              <span className="text-xs text-white font-semibold">Change Cover Photo</span>
              <input type="file" name="coverImage" className="hidden" onChange={handleFile} />
            </label>
          </div>

          {/* Profile Pic Edit */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-600 group">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"}
                className="w-full h-full object-cover opacity-60"
                alt="Profile Preview"
              />
              <label className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black/40 transition">
                <FontAwesomeIcon icon={faCamera} className="text-white text-sm" />
                <input type="file" name="avatar" className="hidden" onChange={handleFile} />
              </label>
            </div>
            <div className="flex-grow">
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Jane Doe"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Location & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">
                City, Country
              </label>
              <input
                type="text"
                name="city"
                placeholder="New York, USA"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                placeholder="UX/UI Designer"
                value={form.headline}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">
              About / Bio
            </label>
            <textarea
              name="bio"
              rows="4"
              placeholder="Tell us about yourself..."
              value={form.bio}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-zinc-700 text-zinc-400 py-3 rounded font-bold uppercase text-xs hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded font-bold uppercase text-xs hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;

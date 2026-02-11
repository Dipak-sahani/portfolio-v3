import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faCloudUploadAlt,
  faPlus,
  faTimes,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useProjectStore } from "../store/project.store";
import { uploadImage } from "../services/upload.service";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import ImagePreview from "../components/ImagePrev/ImagePreview";
import dayjs from "dayjs";
import { toast } from 'react-toastify';

const CreateProjectForm = ({ isProjectAdd, onClose, initialData = null }) => {
  const { createProject, loading, updateProject } = useProjectStore();
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    githubLink: "",
    liveLink: "",
    completeness: "idea",
    startDate: "",
    endDate: "",
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");

  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (initialData) {
      // console.log(initialData);

      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        domain: initialData.domain || "",
        githubLink: initialData.githubLink || "",
        liveLink: initialData.liveLink || "",
        completeness: initialData.completeness || "idea",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
      });

      setTeamMembers(initialData.teamMembers || []);
      setTechStack(initialData.techStack || []);
      setImages(initialData.images || []);
    }
  }, [initialData]);

  // add remove team memeber
  const addTeamMember = () => {
    if (!memberInput.trim()) return;
    setTeamMembers((prev) => [...prev, memberInput.trim()]);
    setMemberInput("");
  };

  const removeTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  /* ---------- TECH STACK ---------- */
  const addTech = () => {
    if (!techInput.trim()) return;
    setTechStack([...techStack, techInput.trim()]);
    setTechInput("");
  };

  const removeTech = (index) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageUpload = (file) => {
    if (!file) return;
    setImages((prev) => [...prev, file]);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    // Append standard fields
    Object.keys(formData).forEach(key => {
      payload.append(key, formData[key]);
    });

    // Append arrays
    techStack.forEach(tech => payload.append("techStack", tech));
    teamMembers.forEach(member => payload.append("teamMembers", member));

    // Append images (files and URLs)
    images.forEach(img => {
      payload.append("images", img);
    });

    try {
      if (initialData?._id) {
        await updateProject(initialData._id, payload);
      } else {
        await createProject(payload);
      }

      setFormData({
        title: "",
        description: "",
        domain: "",
        githubLink: "",
        liveLink: "",
        completeness: "idea",
        startDate: "",
        endDate: "",
      });

      setTeamMembers([]);
      setTechStack([]);
      setImages([]);

      onClose();
    } catch (error) {
      console.error("Project submission error:", error);
      toast.error("Failed to save project");
    }
  };

  if (!isProjectAdd) return null;
  // console.log(images);

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-2xl transition-colors duration-300 custom-scrollbar">
        {/* Header */}
        <div className="p-8 bg-[#3C4044] dark:bg-gray-900 text-white flex justify-between rounded-t-lg">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <FontAwesomeIcon
              icon={faProjectDiagram}
              className="text-[#FD7B41]"
            />
            {initialData ? "Update Project" : " Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            className="border-2 border-[#FD7B41] dark:border-[#FD7B41]/50 w-full rounded-xl p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
            rows={3}
            onChange={handleChange}
          />

          <input
            name="title"
            value={formData.title}
            placeholder="Project Title"
            className="border border-[#3C4044] dark:border-gray-600 rounded-xl p-2 mt-3 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
            onChange={handleChange}
          />

          {/* TECH STACK */}
          <div>
            <label className="font-bold text-sm text-[#3C4044] dark:text-gray-300">Tech Stack</label>
            <div className="flex gap-2 mt-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="input flex-1 border-2 dark:border-gray-600 rounded-2xl py-2 px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
                placeholder="React, Node, AWS"
              />
              <button type="button" onClick={addTech} className="btn-icon bg-[#FD7B41] text-white p-2 rounded-full hover:bg-orange-600 transition">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {techStack.map((tech, i) => (
                <span key={i} className="tag bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-2 dark:text-gray-200">
                  {tech}
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => removeTech(i)}
                    className="cursor-pointer ml-2 text-red-500 hover:text-red-700"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="border-dashed border-2 border-gray-300 dark:border-gray-600 p-6 rounded-xl text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
            <input
              type="file"
              hidden
              id="imageUpload"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e.target.files[0]);
                e.target.value = "";
              }}
            />

            <label htmlFor="imageUpload" className="cursor-pointer">
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="text-3xl text-[#FD7B41]"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Upload Screenshot</p>
            </label>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, i) => (
                <div key={i}>
                  <ImagePreview
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt="project"
                    className="rounded-lg object-cover h-24 w-full border dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#3C4044] dark:text-gray-300">
              Project Status
            </label>
            <select
              name="completeness"
              value={formData.completeness}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
            >
              <option value="idea">Idea</option>
              <option value="planning">Planning</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="launched">Launched</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-[#3C4044] dark:text-gray-300">Start Date {initialData && `: ${dayjs(initialData.startDate).format("DD/MM/YYYY")}`}</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-[#3C4044] dark:text-gray-300">End Date {initialData && `: ${dayjs(initialData.endDate).format("DD/MM/YYYY")}`}</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
              />
            </div>
          </div>

          {/* // team member */}

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-[#3C4044] dark:text-gray-300">Team Members</label>

            <div className="flex gap-2">
              <input
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Username / Email / Role"
                className="flex-1 p-3 rounded-xl border-2 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD7B41]"
              />
              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 rounded-xl bg-[#FD7B41] text-white font-bold hover:bg-orange-600 transition"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {teamMembers.map((member, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-2 dark:text-gray-200"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeTeamMember(i)}
                    className="text-red-500 font-bold hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary bg-green-500 text-white font-bold rounded-2xl cursor-pointer w-fit h-fit px-6 py-3 hover:scale-105 transition shadow-lg flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faTasks} />
            {initialData ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;

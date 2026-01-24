import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faCloudUploadAlt,
  faCodeBranch,
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

const CreateProjectForm = ({ isProjectAdd, onClose, initialData = null }) => {
  const { createProject, loading ,updateProject} = useProjectStore();
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
  const handleImageUpload = async (file) => {
    // console.log("FILE RECEIVED:", file);

    if (!file) {
      console.log("No file selected");
      return;
    }

    if (!user?._id) {
      toast.error("Please login to upload images");
      return;
    }

    try {
      const url = await uploadImage(file, user._id);
      // console.log("UPLOAD SUCCESS URL:", url);

      setImages((prev) => [...prev, url]);
    } catch (error) {
      console.error("UPLOAD FAILED:", error);
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  ...formData,
  techStack,
  teamMembers,
  images
};

    if (initialData?._id) {
      await updateProject(initialData._id, payload);
    } else {
      await createProject(payload);
    }


     setFormData({
        title: "",
        description:"",
        domain:  "",
        githubLink: "",
        liveLink:  "",
        completeness:  "idea",
        startDate:  "",
        endDate:  "",
      });

      setTeamMembers( []);
      setTechStack([]);
      setImages([]);

    onClose();
  };

  if (!isProjectAdd) return null;
  // console.log(images);

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="p-8 bg-[#3C4044] text-white flex justify-between">
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
            className="border-2 border-[#FD7B41] w-full rounded-xl p-2"
            rows={3}
            onChange={handleChange}
          />

          <input
            name="title"
            value={formData.title}
            placeholder="Project Title"
            className="border border-[#3C4044] rounded-xl p-2 mt-3"
            onChange={handleChange}
          />

          {/* TECH STACK */}
          <div>
            <label className="font-bold text-sm">Tech Stack</label>
            <div className="flex gap-2 mt-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="input flex-1 border-2 rounded-2xl py-2 px-4"
                placeholder="React, Node, AWS"
              />
              <button type="button" onClick={addTech} className="btn-icon">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {techStack.map((tech, i) => (
                <span key={i} className="tag">
                  {tech}
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => removeTech(i)}
                    className="cursor-pointer ml-2"
                  />
                </span>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="border-dashed border-2 p-6 rounded-xl text-center">
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
              <p className="mt-2 text-sm">Upload Screenshot</p>
            </label>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.map((img, i) => (
                <div key={i}>
                  <ImagePreview
                    src={img}
                    alt="project"
                    className="rounded-lg object-cover h-24 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
              Project Status
            </label>
            <select
              name="completeness"
              value={formData.completeness}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2"
            >
              <option value="idea">Idea</option>
              <option value="planning">Planning</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="launched">Launched</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Start Date {initialData&&`: ${dayjs(initialData.startDate).format("DD/MM/YYYY")}`}</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">End Date {initialData&&`: ${dayjs(initialData.endDate).format("DD/MM/YYYY")}`}</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border-2"
            />
          </div>

          {/* // team member */}

          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Team Members</label>

            <div className="flex gap-2">
              <input
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                placeholder="Username / Email / Role"
                className="flex-1 p-3 rounded-xl border-2"
              />
              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 rounded-xl bg-[#FD7B41] text-white font-bold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {teamMembers.map((member, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {member}
                  <button
                    type="button"
                    onClick={() => removeTeamMember(i)}
                    className="text-red-500 font-bold"
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
            className="btn-primary bg-green-400 rounded-2xl cursor-pointer w-fit h-fit px-4 py-2 hover:scale-110 transition"
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

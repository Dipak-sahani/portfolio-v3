import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '../card/ProjectShowCaseCard';
import CreateProjectForm from '../forms/ProjectCreateForm';

const ProjectDashboard = ({projectList}) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI Chatbot",
      description: "A NLP powered assistant using OpenAI API and React.",
      category: "Development",
      deadline: "2024-12-01",
      status: "In Progress"
    },
    {
      id: 2,
      title: "AI Chatbot",
      description: "A NLP powered assistant using OpenAI API and React.",
      category: "Development",
      deadline: "2024-12-01",
      status: "In Progress"
    }
  ]);

  const [formData, setFormData] = useState({
    title: '', description: '', category: '', deadline: '', status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects, { ...formData, id: Date.now() }]);
    setFormData({ title: '', description: '', category: '', deadline: '', status: 'Active' });
  };

  return (
    <div className="">
      <div className="">

        {/* Input Form Section */}
        {/* <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-100">
          <input 
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input 
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Category (e.g. Design)"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <textarea 
            className="border p-2 rounded w-full md:col-span-2 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Brief description..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <input 
            type="date"
            className="border p-2 rounded w-full outline-none"
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          />
          <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
          </button>
        </form> */}

       

        {/* Display Grid */}
        <div className="">
          {projectList?.map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
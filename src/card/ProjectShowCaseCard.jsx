import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
  faExternalLinkAlt, 
  faFolderOpen, 
  faHeart, 
  faComment, 
  faClock, 
  faCalendarAlt, 
  faUserCircle,
  faGlobe,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ImagePreview from '../components/ImagePrev/ImagePreview';
import { useAuthStore } from '../store/auth.store';
import { useState } from 'react';
import CreateProjectForm from '../forms/ProjectCreateForm';



const ProjectDetailCard = ({ project }) => {
  // Mock data to match the image if props are empty
//   console.log(project);
  
  const data = project || {
    title: "Innovate AI Platform",
    description: "A next-gen solution for intelligent data analysis & automation. Scalable and user-centric.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bbda4833effb?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1522071823991-b59fea12f45a?auto=format&fit=crop&w=300&q=80"
    ],
    likes: 45,
    comments: 12,
    daysLeft: 14,
    domain: "Artificial Intelligence & Cloud Computing",
    manager: "Jane Doe",
    dueDate: "Feb 7, 2026",
    progress: 70,
    techStack: ["React", "Python", "TensorFlow", "AWS", "PostgreSQL"]
  };

  const STATUS_PROGRESS = {
  idea: 10,
  planning: 30,
  development: 60,
  testing: 85,
  launched: 100,
};


const progress = STATUS_PROGRESS[data?.completeness] ?? 0;
const user=useAuthStore((state)=>state.user)
const [isEdit, setIsEdit]=useState(false)

  return (
    <div className="max-w-2xl mx-auto mb-10 bg-white  shadow-2xl overflow-hidden border border-gray-100 font-sans">
      {/* Header Section */}
      <div className="p-8 pb-4 flex justify-between">
        <div className=''>
 <h2 className="text-3xl font-extrabold text-gray-900">{data.title}</h2>
        <p className="text-gray-500 mt-2 text-lg leading-relaxed">
          {data.description}
        </p>
        </div>
        <div>
            {user?._id==project?.createdBy && (
                          <button
                            onClick={() => setIsEdit(true)}
                            className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"
                          >
                            <FontAwesomeIcon icon={faEdit} /> EDIT
                          </button>
                        )}
        </div>
       
      </div>

      {/* Image Gallery */}
      <div className="px-8 flex gap-3 mb-6">
        {data?.images?.map((img, idx) => (
          <div key={idx} className="flex-1 h-32 rounded-xl overflow-hidden shadow-sm">

            <ImagePreview src={img} alt="preview" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>

      {/* Action Links */}
      <div className="px-8 space-y-4">
        <h4 className="font-bold text-gray-700">Links</h4>
        <div className="flex flex-wrap gap-3">
         {data?.githubLink&& <Link to={`${data?.githubLink}`}  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <FontAwesomeIcon icon={faGithub} /> Source Code
          </Link >}
          {data?.liveLink&&<Link to={`${data?.liveLink}`}  className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <FontAwesomeIcon icon={faGlobe} /> Live Demo
          </Link>}
          
        </div>

        {/* Stats Row */}
        <div className="flex gap-6 py-2 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FontAwesomeIcon icon={faHeart} className="text-red-400" /> {data.likes} Likes
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FontAwesomeIcon icon={faComment} className="text-blue-400" /> {data.comments} Comments
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FontAwesomeIcon icon={faClock} className="text-orange-400" /> {data.daysLeft} Days Left
          </div>
        </div>
      </div>

      {/* Tech Stack & Domain */}
      <div className="px-8 py-6 grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold text-gray-700 mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {data?.techStack?.map(tech => (
              <span key={tech} className="bg-slate-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-700 mb-3">Domain</h4>
          <p className="text-sm text-gray-600 leading-tight">{data.domain}</p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="px-8 py-4 bg-gray-50/50 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 text-lg" />
          <span><span className="font-medium text-gray-800">Start Date:</span> {dayjs(data.startDate).format('DD-MM-YYYY')}</span>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
          <span>End Date: {dayjs(data.endDate).format('DD-MM-YYYY')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pb-8 pt-2">
        <div className="flex justify-between text-xs mb-1 font-bold text-gray-500">
          <span>Projesct Status</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {isEdit&&<>
      <CreateProjectForm
        isProjectAdd={isEdit}
        onClose={() => setIsEdit(false)}
        initialData={project}
      />
      </>}
    </div>
  );
};

export default ProjectDetailCard;
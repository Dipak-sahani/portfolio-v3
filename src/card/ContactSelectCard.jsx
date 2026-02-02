import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUserCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
const ModernProfessionalCard = ({ data }) => {

//  console.log(data);
 
    

  const {
    fullName = "Alina Singh",
    username = "alina.s",
    avatar = null,
    city = "Hyderabad, India",
    skills = ["Python", "UI/UX Design", "Product Strategy"],
    tagline = "Crafting Intuitive Digital Experiences",
    experienceLevel = "Senior Level"
  } = data || {};

  return (
    <div className="p-6 font-sans">
      {/* Main Card */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8">
        
        {/* Header: Date & Time */}
        {/* <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2 text-[#3C4044]">
            <FontAwesomeIcon icon={faClock} className="text-xl text-[#FD7B41]" />
            <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">
              Wednesday, Jan 28, 2026 <br />
              <span className="text-[#3C4044]/60">10:24 AM IST</span>
            </div>
          </div>
        </div> */}

        {/* Profile Section */}
        <div className="flex  sm:flex-row flex-col items-center space-x-6">
          {/* Avatar with Custom Border */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full p-1 bg-linear-to-tr from-[#FD7B41] to-[#EDBF9B]">
              <Link to={`/profile/${data?._id}`} className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} className="text-[#DDDCDB] text-8xl" />
                )}
              </Link>
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1">
            <Link to={`/profile/${data?._id}`} className="block text-2xl font-black text-[#3C4044] tracking-tight uppercase leading-none pt-2">
              {fullName}
            </Link>
            <Link to={`/profile/${data?._id}`} className=" block text-[#FD7B41] font-bold text-sm mt-1">@{username}</Link>
            <p className="text-[#3C4044]/80 mt-2 text-sm font-medium leading-relaxed">
              {tagline}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center mt-4 space-x-3">
              <div className="flex items-center text-[#3C4044] text-xs font-bold bg-[#DDDCDB]/50 px-3 py-1 rounded-md">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[#FD7B41]" />
                {city}
              </div>
              <span className="px-3 py-1 bg-[#3C4044] text-[#EDBF9B] text-[10px] font-black uppercase tracking-widest rounded-md">
                {experienceLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-3 mt-10">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="flex-1 min-w-25 text-center py-2.5 px-4 border-2 border-[#EDBF9B] rounded-xl text-[#3C4044] text-xs font-black uppercase tracking-tighter hover:bg-[#FD7B41] hover:text-white hover:border-[#FD7B41] transition-all duration-300 cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernProfessionalCard;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faEllipsisV,
  faLocationArrow,
  faShareAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import EditProfileForm from "./EditProfile";
import ProjectDashboard from "../../pages/ProjectShowCase";
import CreateProjectForm from "../../forms/ProjectCreateForm";
import ImagePreview from "../ImagePrev/ImagePreview";
import { Link } from "react-router-dom";

const CommonProfilePage = ({ isUser, info, projectList, follow }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddProject, setIsAddProject] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  console.log(info);
  

  return (
    <div className="min-h-screen bg-gray-300 text-[#3C4044] font-sans sm:px-[20%] py-5 sm:py-5">
      {/* Header Section */}
      <div className="relative">
        <div className="h-64 overflow-hidden relative bg-[#DDDCDB]">
          <ImagePreview
            src={info?.coverImage}
            alt="Banner"
            className="w-full h-full object-cover opacity-80"
          />

          <button className="absolute top-4 left-4 bg-[#3C4044]/60 p-2 rounded-md hover:bg-[#FD7B41] transition">
            <FontAwesomeIcon icon={faShareAlt} />
          </button>
          <div className="absolute top-4 right-4 flex gap-2">
            {isUser && (
              <button
                onClick={() => setIsEditOpen(true)}
                className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"
              >
                <FontAwesomeIcon icon={faEdit} /> EDIT PROFILE
              </button>
            )}
            <button className=" p-2 rounded">
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-[#3C4044] border-b border-[#EDBF9B]/20 relative px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="absolute -top-24 left-8 w-48 h-48 rounded-full border-4 border-[#EDBF9B] overflow-hidden flex bg-[#3C4044] justify-center  items-center">
            {info?.avatar ? (
              <ImagePreview
                src={info?.avatar}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="text-[#EDBF9B] text-8xl"
              />
            )}
          </div>

          <div className="ml-0 md:ml-56 sm:mt-0 mt-20 grow">
            <h1 className="text-3xl font-bold text-[#FD7B41]">
              {info?.username}
            </h1>

            <div>
              {info?.headline ? (
                <p className="text-[#DDDCDB] sm:hidden block text-sm max-w-xl mt-2 opacity-80 text-justify">
                  {info?.headline}
                </p>
              ) : (
                <p className="text-[#DDDCDB] sm:hidden block text-sm max-w-xl mt-2 opacity-80 text-justify">
                  Write your taglines so people know about you! ..... 🚀 Builder
                  | Creator vibe | Building ideas into reality | Creating what
                  doesn’t exist yet | Turning vision into action| Here to build,
                  learn, and grow | Making ideas happen
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="text-xs flex items-center gap-1 text-[#EDBF9B]">
              <FontAwesomeIcon icon={faLocationArrow} /> {info?.city}
            </div>
            <div className="flex gap-2">
              <button className="border border-[#EDBF9B] text-[#EDBF9B] px-6 py-2 rounded text-xs font-bold uppercase">
                 {follow?.followersCount} Connections
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#3C4044] hidden text-center flex-col items-center sm:flex justify-center py-5">
          {info?.headline ? (
            <p className="text-[#DDDCDB]  text-sm max-w-xl mt-2 opacity-80 text-justify">
              {info?.headline}
            </p>
          ) : (
            <p className="text-[#DDDCDB] text-sm max-w-xl mt-2 opacity-80 text-justify">
              Write your taglines so people know about you! ..... 🚀 Builder |
              Creator vibe | Building ideas into reality | Creating what doesn’t
              exist yet | Turning vision into action| Here to build, learn, and
              grow | Making ideas happen
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-8 mt-6">
        <button className="bg-[#FD7B41] text-[#3C4044] px-8 py-3 font-bold uppercase text-xs">
          Profile
        </button>
        <button className="bg-[#EDBF9B] text-[#3C4044] px-8 py-3 font-bold uppercase text-xs">
          Activity
        </button>
        <Link to={`/chat/${info?._id}`} className="bg-[#FD7B41] text-[#3C4044] px-8 py-3 font-bold uppercase text-xs">
          Message
        </Link>
      </div>

      {/* Sections */}
      <div className="px-8 mt-4 space-y-6">
        <section className="bg-[#EDBF9B] text-[#3C4044] p-8 rounded-sm shadow-xl">
          <h2 className="text-xl font-black uppercase mb-4 border-b border-[#3C4044]/20 pb-2">
            About
          </h2>
          <p className="text-sm leading-relaxed font-medium">
            {info?.bio ? (
              <>
                <p>{info?.bio}</p>
              </>
            ) : (
              <>
                Write your taglines so people know about you! ..... 🚀 Builder |
                Creator vibe | Building ideas into reality | Creating what
                doesn’t exist yet | Turning vision into action| Here to build,
                learn, and grow | Making ideas happen
              </>
            )}
          </p>
        </section>

        <section className="bg-[#3C4044] border border-[#EDBF9B]/30 p-8 rounded-sm">
          <div className="flex justify-between py-5">
            <h2 className="text-xl font-bold text-[#FD7B41] mb-6 uppercase">
              Projects
            </h2>

            <div className="flex gap-2">
              {isUser && (
                <button
                  onClick={() => setIsAddProject(true)}
                  className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"
                >
                  <FontAwesomeIcon icon={faAdd} /> Add Project
                </button>
              )}
            </div>
          </div>

          <ProjectDashboard projectList={projectList} />
        </section>
      </div>

      <EditProfileForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <CreateProjectForm
        isProjectAdd={isAddProject}
        onClose={() => setIsAddProject(false)}
      />
    </div>
  );
};

export default CommonProfilePage;

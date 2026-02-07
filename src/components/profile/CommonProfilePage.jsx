import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faEdit,
  faEllipsisV,
  faLocationArrow,
  faShareAlt,
  faUser,
  faBan,
  faFlag
} from "@fortawesome/free-solid-svg-icons";
import EditProfileForm from "./EditProfile";
import ProjectDashboard from "../../pages/ProjectShowCase";
import CreateProjectForm from "../../forms/ProjectCreateForm";
import ImagePreview from "../ImagePrev/ImagePreview";
import { Link, useNavigate } from "react-router-dom";
import ShareModal from "../common/ShareModal";
import ReportModal from "../common/ReportModal";
import { blockUser } from "../../services/user.service";
import { toast } from "react-toastify";

const CommonProfilePage = ({ isUser, info, projectList, follow }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddProject, setIsAddProject] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  // console.log(info);
  // console.log(follow);

  const handleBlock = async () => {
    if (window.confirm(`Are you sure you want to block ${info?.username}?`)) {
      try {
        await blockUser(info?._id);
        navigate("/"); // Redirect to home after blocking
      } catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-900 text-[#3C4044] dark:text-gray-200 font-sans sm:px-[20%] py-5 sm:py-5 transition-colors duration-300">
      {/* Header Section */}
      <div className="relative shadow-xl">
        <div className="h-64 overflow-hidden relative bg-[#DDDCDB] dark:bg-gray-700 rounded-t-lg">
          <ImagePreview
            src={info?.coverImage}
            alt="Banner"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Action Buttons - Moved outside overflow-hidden container */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="absolute top-4 left-4 bg-[#3C4044]/60 dark:bg-black/60 p-2 rounded-md hover:bg-[#FD7B41] dark:hover:bg-[#FD7B41] text-white transition z-10"
        >
          <FontAwesomeIcon icon={faShareAlt} />
        </button>

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {isUser && (
            <button
              onClick={() => setIsEditOpen(true)}
              className="bg-[#FD7B41] text-[#3C4044] px-4 py-1 rounded font-bold text-sm flex items-center gap-2 hover:brightness-110 transition shadow-lg"
            >
              <FontAwesomeIcon icon={faEdit} /> EDIT PROFILE
            </button>
          )}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded bg-[#3C4044]/60 dark:bg-black/60 text-white hover:bg-[#FD7B41] transition"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => {
                    setIsShareOpen(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faShareAlt} className="w-4" /> Share Profile
                </button>
                {!isUser && (
                  <>
                    <button
                      onClick={() => {
                        setIsReportOpen(true);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faFlag} className="w-4" /> Report User
                    </button>
                    <button
                      onClick={() => {
                        handleBlock();
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700"
                    >
                      <FontAwesomeIcon icon={faBan} className="w-4" /> Block User
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-[#3C4044] dark:bg-gray-800 border-b border-[#EDBF9B]/20 dark:border-gray-700 relative px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center md:items-end gap-6 transition-colors duration-300">
          <div className="absolute -top-24 left-8 w-48 h-48 rounded-full border-4 border-[#EDBF9B] dark:border-[#FD7B41] overflow-hidden flex bg-[#3C4044] dark:bg-gray-800 justify-center items-center shadow-2xl">
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

          <div className="ml-0 md:ml-56 sm:mt-0 mt-20 grow text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#FD7B41]">
              {info?.username}
            </h1>

            <div>
              {info?.headline ? (
                <p className="text-[#DDDCDB] dark:text-gray-300 sm:hidden block text-sm max-w-xl mt-2 opacity-80 text-justify mx-auto md:mx-0">
                  {info?.headline}
                </p>
              ) : (
                <p className="text-[#DDDCDB] dark:text-gray-300 sm:hidden block text-sm max-w-xl mt-2 opacity-80 text-justify mx-auto md:mx-0">
                  Write your taglines so people know about you! ..... 🚀 Builder
                  | Creator vibe | Building ideas into reality | Creating what
                  doesn’t exist yet | Turning vision into action| Here to build,
                  learn, and grow | Making ideas happen
                </p>
              )}
            </div>

            {/* Social Links Display */}
            <div className="flex gap-4 mt-3 justify-center md:justify-start">
              {info?.socialLogins?.github && (
                <a href={info.socialLogins.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FD7B41] transition-colors">
                  <i className="fab fa-github fa-lg"></i>
                </a>
              )}
              {info?.socialLogins?.linkedin && (
                <a href={info.socialLogins.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FD7B41] transition-colors">
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
              )}
              {info?.socialLogins?.twitter && (
                <a href={info.socialLogins.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FD7B41] transition-colors">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="text-xs flex items-center gap-1 text-[#EDBF9B] dark:text-[#FD7B41] font-medium w-full md:justify-end justify-center">
              <FontAwesomeIcon icon={faLocationArrow} /> {info?.city || "Location not set"}
            </div>
            <div className="flex gap-2 w-full justify-center md:justify-end">
              {
                isUser ? <h1 className="text-[#EDBF9B] dark:text-[#FD7B41] flex gap-2">
                  <span className="border border-[#EDBF9B] dark:border-[#FD7B41] px-4 py-2 rounded text-xs font-bold uppercase transition-colors hover:bg-[#EDBF9B]/10 cursor-pointer"> Followers : {follow?.followers?.length || 0}</span>
                  <span className="border border-[#EDBF9B] dark:border-[#FD7B41] px-4 py-2 rounded text-xs font-bold uppercase transition-colors hover:bg-[#EDBF9B]/10 cursor-pointer"> Following : {follow?.following?.length || 0}</span>
                </h1>
                  : <button className="border border-[#EDBF9B] dark:border-[#FD7B41] text-[#EDBF9B] dark:text-[#FD7B41] px-6 py-2 rounded text-xs font-bold uppercase hover:bg-[#EDBF9B]/10 transition">
                    {follow?.followersCount || 0} Connections
                  </button>}
            </div>
          </div>
        </div>
        <div className="bg-[#3C4044] dark:bg-gray-800 hidden text-center flex-col items-center sm:flex justify-center py-5 px-8 transition-colors duration-300">
          {info?.headline ? (
            <p className="text-[#DDDCDB] dark:text-gray-300 text-sm max-w-xl mt-2 opacity-80 text-justify">
              {info?.headline}
            </p>
          ) : (
            <p className="text-[#DDDCDB] dark:text-gray-300 text-sm max-w-xl mt-2 opacity-80 text-justify">
              Write your taglines so people know about you! ..... 🚀 Builder |
              Creator vibe | Building ideas into reality | Creating what doesn’t
              exist yet | Turning vision into action| Here to build, learn, and
              grow | Making ideas happen
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-0 sm:px-8 mt-6 overflow-x-auto pb-2 sm:pb-0">
        <button className="bg-[#FD7B41] text-[#3C4044] px-8 py-3 font-bold uppercase text-xs rounded-t-lg shadow-md whitespace-nowrap">
          Profile
        </button>
        <button className="bg-[#EDBF9B] dark:bg-gray-700 text-[#3C4044] dark:text-gray-300 px-8 py-3 font-bold uppercase text-xs rounded-t-lg shadow-md hover:bg-[#FD7B41] hover:text-[#3C4044] transition whitespace-nowrap">
          Activity
        </button>
        {!isUser &&
          <Link to={`/chat/${info?._id}`} className="bg-[#EDBF9B] dark:bg-gray-700 text-[#3C4044] dark:text-gray-300 px-8 py-3 font-bold uppercase text-xs rounded-t-lg shadow-md hover:bg-[#FD7B41] hover:text-[#3C4044] transition whitespace-nowrap">
            Message
          </Link>}
      </div>

      {/* Sections */}
      <div className="px-0 sm:px-8 mt-4 space-y-6">
        <section className="bg-[#EDBF9B] dark:bg-gray-800 text-[#3C4044] dark:text-gray-200 p-8 rounded-sm shadow-xl transition-colors duration-300">
          <h2 className="text-xl font-black uppercase mb-4 border-b border-[#3C4044]/20 dark:border-gray-600 pb-2">
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

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills & Interests */}
          <section className="bg-[#3C4044] dark:bg-gray-800 border border-[#EDBF9B]/30 dark:border-gray-700 p-8 rounded-sm text-[#DDDCDB] dark:text-gray-300 shadow-lg transition-colors duration-300">
            <h2 className="text-xl font-bold text-[#FD7B41] mb-6 uppercase border-b border-[#EDBF9B]/20 dark:border-gray-700 pb-2">
              Skills & Interests
            </h2>

            <div className="space-y-6">
              {info?.skills?.length > 0 && (
                <div>
                  <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {info.skills.map((skill, index) => (
                      <span key={index} className="bg-[#FD7B41]/10 text-[#FD7B41] border border-[#FD7B41]/50 px-3 py-1 rounded-full text-xs font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {info?.interests?.length > 0 && (
                <div>
                  <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {info.interests.map((interest, index) => (
                      <span key={index} className="bg-[#DDDCDB]/10 dark:bg-gray-700 text-[#DDDCDB] dark:text-gray-300 border border-[#DDDCDB]/30 dark:border-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {info?.languages?.length > 0 && (
                <div>
                  <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {info.languages.map((lang, index) => (
                      <span key={index} className="bg-[#DDDCDB]/10 dark:bg-gray-700 text-[#DDDCDB] dark:text-gray-300 border border-[#DDDCDB]/30 dark:border-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Professional Details */}
          <section className="bg-[#3C4044] dark:bg-gray-800 border border-[#EDBF9B]/30 dark:border-gray-700 p-8 rounded-sm text-[#DDDCDB] dark:text-gray-300 shadow-lg transition-colors duration-300">
            <h2 className="text-xl font-bold text-[#FD7B41] mb-6 uppercase border-b border-[#EDBF9B]/20 dark:border-gray-700 pb-2">
              Details
            </h2>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-1">Experience Level</h3>
                <p className="text-sm font-medium capitalize">{info?.experienceLevel || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-1">Looking For</h3>
                <p className="text-sm font-medium capitalize">{info?.lookingFor || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-1">Time Commitment</h3>
                <p className="text-sm font-medium">{info?.timeCommitment || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-1">Remote</h3>
                <p className="text-sm font-medium">{info?.remotePreference ? "Yes, Open to Remote" : "No"}</p>
              </div>

              {info?.startupStagePreference?.length > 0 && (
                <div className="col-span-2">
                  <h3 className="text-[#EDBF9B] dark:text-[#FD7B41] text-xs font-bold uppercase mb-2">Startup Stage Preference</h3>
                  <div className="flex flex-wrap gap-2">
                    {info.startupStagePreference.map((stage, index) => (
                      <span key={index} className="text-[#DDDCDB] dark:text-gray-300 text-xs bg-[#DDDCDB]/10 dark:bg-gray-700 px-2 py-1 rounded">
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="bg-[#3C4044] dark:bg-gray-800 border border-[#EDBF9B]/30 dark:border-gray-700 p-8 rounded-sm shadow-xl transition-colors duration-300">
          <div className="flex justify-between py-5 border-b border-[#EDBF9B]/10 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-[#FD7B41] uppercase">
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

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={`Check out ${info?.username}'s profile`}
        url={window.location.href}
      />

      {info && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          targetId={info._id}
          targetType="User"
        />
      )}
    </div>
  );
};

export default CommonProfilePage;

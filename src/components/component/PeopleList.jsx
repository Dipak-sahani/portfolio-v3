import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

export const PeopleList = ({ people }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {people?.filter(p => p._id.toString() !== user._id.toString())?.map(person => (

        <div

          key={person._id}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex ">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 mr-4 shrink-0 flex items-center justify-center overflow-hidden">
              {person?.image ? <img
                src={person.image}
                alt={person.fullName}
                className="w-full h-full object-cover"
              /> : <FontAwesomeIcon icon={faUser} className='text-[#3C4044] dark:text-gray-400 text-4xl' />}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-[#3C4044] dark:text-white">
                    {person.fullName}
                  </h3>
                  <p className="text-lg mb-2 text-[#FD7B41] font-medium">
                    {person.title}
                  </p>
                </div>
                <div className="text-right">
                  {/* <div className="text-2xl font-bold mb-1" style={{ color: '#3C4044' }}>
                    {person.hourlyRate}/hr
                  </div> */}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#EDBF9B] dark:bg-[#FD7B41]/20 text-[#3C4044] dark:text-[#FD7B41]">
                    {person.availability}
                  </span>
                </div>
              </div>

              {/* Location & Experience */}
              <div className="flex items-center space-x-4 mb-4 text-[#3C4044] dark:text-gray-300">
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>{person.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>{person.experience} years</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {person?.skills?.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm bg-[#F5F5F5] dark:bg-gray-700 text-[#3C4044] dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-center transition-colors bg-[#FD7B41] text-white hover:bg-orange-600"
                  onClick={() => navigate(`/profile/${person._id}`)}
                >
                  View Profile
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-center border transition-colors border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => navigate(`/chat/${person._id}`)}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
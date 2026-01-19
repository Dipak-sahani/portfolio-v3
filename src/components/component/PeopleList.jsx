import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

export const PeopleList = ({ people }) => {
  const navigate= useNavigate();
  const user=useAuthStore((state)=>state.user)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {people?.filter(p => p._id.toString() !== user._id.toString())?.map(person => (
        
        <div
      
          key={person._id}
          className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex ">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-amber-100 mr-4 shrink-0 content-center justify-center">
              {person?.image?<img
                src={person.image}
                alt={person.fullName}
                className="w-full h-full object-cover"
              />: <FontAwesomeIcon icon={faUser} className='w-full h-full object-cover ' color='#3C4044' size='48' />}
            </div>
            
            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#3C4044' }}>
                    {person.fullName}
                  </h3>
                  <p className="text-lg mb-2" style={{ color: '#FD7B41' }}>
                    {person.title}
                  </p>
                </div>
                <div className="text-right">
                  {/* <div className="text-2xl font-bold mb-1" style={{ color: '#3C4044' }}>
                    {person.hourlyRate}/hr
                  </div> */}
                  <span className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: '#EDBF9B', color: '#3C4044' }}>
                    {person.availability}
                  </span>
                </div>
              </div>

              {/* Location & Experience */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span style={{ color: '#3C4044' }}>{person.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span style={{ color: '#3C4044' }}>{person.experience} years</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {person?.skills?.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: '#F5F5F5', color: '#3C4044' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-center transition-colors"
                  style={{ backgroundColor: '#FD7B41', color: 'white' }}
                >
                  View Profile
                </button>
                <button
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-center border transition-colors"
                  style={{ borderColor: '#EDBF9B', color: '#3C4044' }}
                  onClick={()=> navigate(`/chat/${person._id}`)}
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
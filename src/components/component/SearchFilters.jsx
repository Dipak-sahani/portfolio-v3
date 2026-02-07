import React from 'react';

const SKILLS_OPTIONS = [
  'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
  'AWS', 'Docker', 'Kubernetes', 'UI/UX', 'Figma',
  'MongoDB', 'PostgreSQL', 'GraphQL', 'React Native', 'Vue.js'
];

const AVAILABILITY_OPTIONS = [
  'Full-time', 'Part-time', 'Contract', 'Freelance', 'Remote'
];

const LOCATION_OPTIONS = [
  'Remote', 'United States', 'Europe', 'Asia', 'Australia',
  'San Francisco', 'New York', 'London', 'Berlin', 'Singapore'
];

export const SearchFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleSkillToggle = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];

    onFilterChange({ skills: newSkills });
  };

  const handleAvailabilityToggle = (availability) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];

    onFilterChange({ availability: newAvailability });
  };

  const hasActiveFilters = () => {
    return filters.skills.length > 0 ||
      filters.location ||
      filters.minExperience ||
      filters.maxExperience ||
      filters.availability.length > 0 ||
      filters.minRate ||
      filters.maxRate;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-fit transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#3C4044] dark:text-white">
          Filters
        </h3>
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium hover:underline text-[#FD7B41]"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Skills Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-[#3C4044] dark:text-gray-300">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {SKILLS_OPTIONS.map(skill => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${filters.skills.includes(skill)
                ? 'bg-[#FD7B41] text-white border-[#FD7B41]'
                : 'bg-[#F5F5F5] dark:bg-gray-700 text-[#3C4044] dark:text-gray-300 border-transparent'
                }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-[#3C4044] dark:text-gray-300">Location</h4>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-gray-700 border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
        >
          <option value="">Any Location</option>
          {LOCATION_OPTIONS.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Experience Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-[#3C4044] dark:text-gray-300">Experience (years)</h4>
        <div className="flex space-x-4">
          <input
            type="number"
            min="0"
            max="50"
            placeholder="Min"
            value={filters.minExperience}
            onChange={(e) => onFilterChange({ minExperience: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-gray-700 border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
          />
          <input
            type="number"
            min="0"
            max="50"
            placeholder="Max"
            value={filters.maxExperience}
            onChange={(e) => onFilterChange({ maxExperience: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-gray-700 border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
          />
        </div>
      </div>

      {/* Hourly Rate Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-[#3C4044] dark:text-gray-300">Hourly Rate ($)</h4>
        <div className="flex space-x-4">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minRate}
            onChange={(e) => onFilterChange({ minRate: e.target.value })}
            className="flex-1 w-[50%] px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-gray-700 border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxRate}
            onChange={(e) => onFilterChange({ maxRate: e.target.value })}
            className="flex-1 w-[50%] px-3 py-2 rounded-lg border bg-[#F9F9F9] dark:bg-gray-700 border-[#EDBF9B] dark:border-gray-600 text-[#3C4044] dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-[#3C4044] dark:text-gray-300">Availability</h4>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map(option => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.includes(option)}
                onChange={() => handleAvailabilityToggle(option)}
                className="w-4 h-4 mr-3 accent-[#FD7B41]"
              />
              <span className="text-[#3C4044] dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
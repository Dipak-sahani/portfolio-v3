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
    <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold" style={{ color: '#3C4044' }}>
          Filters
        </h3>
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium hover:underline"
            style={{ color: '#FD7B41' }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Skills Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3" style={{ color: '#3C4044' }}>Skills</h4>
        <div className="flex flex-wrap gap-2">
          {SKILLS_OPTIONS.map(skill => (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${filters.skills.includes(skill) ? 'text-white' : ''}`}
              style={{
                backgroundColor: filters.skills.includes(skill) ? '#FD7B41' : '#F5F5F5',
                color: filters.skills.includes(skill) ? 'white' : '#3C4044'
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3" style={{ color: '#3C4044' }}>Location</h4>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange({ location: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border focus:outline-none"
          style={{
            backgroundColor: '#F9F9F9',
            borderColor: '#EDBF9B',
            color: '#3C4044'
          }}
        >
          <option value="">Any Location</option>
          {LOCATION_OPTIONS.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Experience Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3" style={{ color: '#3C4044' }}>Experience (years)</h4>
        <div className="flex space-x-4">
          <input
            type="number"
            min="0"
            max="50"
            placeholder="Min"
            value={filters.minExperience}
            onChange={(e) => onFilterChange({ minExperience: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#EDBF9B',
              color: '#3C4044'
            }}
          />
          <input
            type="number"
            min="0"
            max="50"
            placeholder="Max"
            value={filters.maxExperience}
            onChange={(e) => onFilterChange({ maxExperience: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#EDBF9B',
              color: '#3C4044'
            }}
          />
        </div>
      </div>

      {/* Hourly Rate Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3" style={{ color: '#3C4044' }}>Hourly Rate ($)</h4>
        <div className="flex space-x-4">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minRate}
            onChange={(e) => onFilterChange({ minRate: e.target.value })}
            className="flex-1 w-[50%] px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#EDBF9B',
              color: '#3C4044'
            }}
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxRate}
            onChange={(e) => onFilterChange({ maxRate: e.target.value })}
            className="flex-1 w-[50%] px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: '#F9F9F9',
              borderColor: '#EDBF9B',
              color: '#3C4044'
            }}
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium mb-3" style={{ color: '#3C4044' }}>Availability</h4>
        <div className="space-y-2">
          {AVAILABILITY_OPTIONS.map(option => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability.includes(option)}
                onChange={() => handleAvailabilityToggle(option)}
                className="w-4 h-4 mr-3"
                style={{ accentColor: '#FD7B41' }}
              />
              <span style={{ color: '#3C4044' }}>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
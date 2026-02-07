import React, { useState } from 'react';
import { useStartupStore } from '../../store/startup.store';
import { toast } from 'react-toastify';

const StartupForm = ({ initialData, isEdit = false, onClose }) => {
  const [activeTab, setActiveTab] = useState('basics');

  // Updated state to match the exact Schema parameters
  const [formData, setFormData] = useState(initialData || {
    name: '',
    tagline: '',
    description: '',
    problemStatement: '',
    solution: '',
    market: '',
    businessModel: '',
    mvpStatus: 'idea',
    fundingStage: 'bootstrapped',
    skillsRequired: [],
    tags: [],
    website: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: ''
    },
    isPublic: true
  });

  const saveStartup = useStartupStore((state) => state.saveStartup);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested socialLinks object
    if (['linkedin', 'twitter', 'github'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayInput = (e, field) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const value = field === 'tags' ? e.target.value.trim().toLowerCase() : e.target.value.trim();

      if (!formData[field].includes(value)) {
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], value]
        }));
      }
      e.target.value = '';
    }
  };

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await saveStartup(formData);
      if (res?.success || res?.status === true) {
        toast.success(isEdit ? "Updated successfully" : "Startup registered!");
        if (onClose) onClose();
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div className="fixed  inset-0 z-50 overflow-y-auto no-scrollbar flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full mt-50 max-w-2xl bg-white dark:bg-gray-800 mb-10 rounded-lg border border-zinc-800 dark:border-gray-700 shadow-2xl">

        {/* Form Header */}
        <div className="bg-[#3C4044] dark:bg-gray-900 p-8 text-white rounded-t-lg">
          <h2 className="text-3xl font-bold">{isEdit ? 'Edit Startup' : 'Register New Startup'}</h2>
          <p className="text-[#EDBF9B] mt-2">Fill in the details to showcase your venture to the world.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {['basics', 'strategy', 'team & links'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all ${activeTab === tab
                  ? 'text-[#FD7B41] border-b-4 border-[#FD7B41] bg-white dark:bg-gray-800'
                  : 'text-gray-400 hover:text-[#3C4044] dark:hover:text-gray-200'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={submitForm} className="p-8 space-y-8">

          {/* SECTION 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Startup Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#FD7B41] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Tagline (Max 150)</label>
                  <input type="text" name="tagline" maxLength="150" value={formData.tagline} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#FD7B41] outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Full Description</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[#FD7B41] outline-none transition-all"></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">MVP Status</label>
                  <select name="mvpStatus" value={formData.mvpStatus} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="idea">Idea Stage</option>
                    <option value="prototype">Prototype</option>
                    <option value="MVP">MVP</option>
                    <option value="launched">Launched</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Funding Stage</label>
                  <select name="fundingStage" value={formData.fundingStage} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="bootstrapped">Bootstrapped</option>
                    <option value="pre-seed">Pre-Seed</option>
                    <option value="seed">Seed</option>
                    <option value="series-A">Series A</option>
                    <option value="series-B">Series B</option>
                    <option value="growth">Growth</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: STRATEGY */}
          {activeTab === 'strategy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Problem Statement</label>
                  <textarea name="problemStatement" value={formData.problemStatement} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-[#FD7B41]" rows="3"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Solution</label>
                  <textarea name="solution" value={formData.solution} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-[#FD7B41]" rows="3"></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Tags (Press Enter)</label>
                <input onKeyDown={(e) => handleArrayInput(e, 'tags')} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" placeholder="e.g. AI, Fintech" />
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag, i) => (
                    <span key={i} className="bg-[#3C4044] dark:bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                      #{tag} <button type="button" onClick={() => removeArrayItem(i, 'tags')}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: TEAM & LINKS */}
          {activeTab === 'team & links' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Skills Needed (Press Enter)</label>
                <input onKeyDown={(e) => handleArrayInput(e, 'skillsRequired')} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" />
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skillsRequired.map((skill, i) => (
                    <span key={i} className="bg-[#EDBF9B] text-[#3C4044] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                      {skill} <button type="button" onClick={() => removeArrayItem(i, 'skillsRequired')}>×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3C4044] dark:text-gray-200 mb-2">LinkedIn</label>
                  <input type="text" name="linkedin" value={formData.socialLinks?.linkedin} onChange={handleInputChange} className="w-full p-2 text-sm rounded-lg border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3C4044] dark:text-gray-200 mb-2">Twitter (X)</label>
                  <input type="text" name="twitter" value={formData.socialLinks?.twitter} onChange={handleInputChange} className="w-full p-2 text-sm rounded-lg border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3C4044] dark:text-gray-200 mb-2">GitHub</label>
                  <input type="text" name="github" value={formData.socialLinks?.github} onChange={handleInputChange} className="w-full p-2 text-sm rounded-lg border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3C4044] dark:text-gray-200 mb-2">Website URL</label>
                <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full p-3 rounded-xl border-2 border-[#DDDCDB] dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none" placeholder="https://..." />
              </div>
            </div>
          )}

          {/* Form Footer */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-100 dark:border-gray-700">
            <button onClick={onClose} type="button" className="text-gray-500 font-bold hover:text-[#3C4044] dark:hover:text-gray-200">Cancel</button>
            <button
              type="submit"
              className="bg-[#FD7B41] hover:bg-[#3C4044] dark:hover:bg-gray-700 text-white px-10 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              {isEdit ? 'Update Profile' : 'Launch Startup'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StartupForm;
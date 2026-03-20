import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicFormBuilder from '../../components/events/DynamicFormBuilder';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/auth.store';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token); // Adjust based on auth store
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    type: 'virtual',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    location: { address: '', city: '' },
    isPaid: false,
    priceAmount: 0,
    maxParticipants: 0,
    category: 'tech'
  });
  const [coverImage, setCoverImage] = useState(null);
  const [formSchema, setFormSchema] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData({ ...formData, location: { ...formData.location, [field]: value } });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) throw new Error("Please log in first");
      
      const payload = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'location') {
          payload.append(key, JSON.stringify(formData[key]));
        } else if (key === 'priceAmount') {
          payload.append('price', JSON.stringify({ amount: formData[key], currency: 'INR' }));
        } else {
          payload.append(key, formData[key]);
        }
      });
      
      payload.append('formSchema', JSON.stringify(formSchema));
      
      if (coverImage) {
        payload.append('coverImage', coverImage);
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/event/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create event');
      
      toast.success('Event created successfully. Note: It is saved as Draft, please Publish it from dashboard.');
      navigate(`/events/dashboard/${data.event._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2 dark:text-white">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Event Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]" placeholder="Awesome Tech Conf" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Short Description</label>
              <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Cover Image</label>
              <input type="file" onChange={handleFileChange} accept="image/*" className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Event Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded">
                <option value="virtual">Virtual</option>
                <option value="physical">Physical</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded">
                <option value="tech">Tech</option>
                <option value="workshop">Workshop</option>
                <option value="hackathon">Hackathon</option>
                <option value="college">College Fest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 border-b dark:border-gray-700 pb-2 dark:text-white">Schedule & Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Address</label>
              <input type="text" name="location.address" value={formData.location.address} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">City</label>
              <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded" />
            </div>
          </div>
        </div>
        
        {/* Dynamic Form Builder */}
        <DynamicFormBuilder value={formSchema} onChange={setFormSchema} />
        
        <div className="pt-6 border-t flex justify-end">
          <button type="submit" className="px-6 py-3 bg-[#FD7B41] text-white font-medium rounded hover:bg-[#E66B3B] transition">
            Save Event & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;

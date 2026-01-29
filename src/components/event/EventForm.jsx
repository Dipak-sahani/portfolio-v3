import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faMapMarkerAlt, faVideo, faIndianRupeeSign, 
  faTags, faImage, faUsers, faInfoCircle, faChevronRight, faChevronLeft, faCheckCircle, 
  faCross,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../services/upload.service';
import { useAuthStore } from '../../store/auth.store';
import { toast } from 'react-toastify';
import { createEvent } from '../../services/event.service';

const EventCreationWizard = ({onClose}) => {
  // 1. Form State matching your Mongoose Schema
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    type: 'virtual',
    startTime: '',
    endTime: '',
    location: { address: '', city: '' },
    meetingLink: '',
    isPaid: false,
    price: { amount: 0, currency: 'INR' },
    maxParticipants: 0,
    category: 'startup',
    tags: '',
    coverImage: ''
  });

  // 2. Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);



const handleFinalSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1️⃣ Prepare form data for submission
    const formPayload = new FormData();

    for (const key in formData) {
      if (key === 'coverImage' && formData.coverImage) {
        // Only send the URL of the uploaded image
        formPayload.append('coverImage', formData.coverImage);
      } else if (typeof formData[key] === 'object') {
        // Nested objects like location, price
        formPayload.append(key, JSON.stringify(formData[key]));
      } else {
        // Regular fields
        formPayload.append(key, formData[key]);
      }
    }

    // console.log(formPayload);
    
    // 2️⃣ Call your backend API
    const response = await createEvent(formPayload)

    // console.log(response);
    
    // 3️⃣ Success handling
    if (response.success) {
      toast.success('Event Published Successfully!');
      console.log('Published Event:', response.event);
        onClose();
      // Optional: reset form or redirect
      // setFormData(initialState);
      // navigate('/events');
    } else {

      toast.error('Failed to publish event. Please try again.');
    }
  } catch (err) {
   
    console.error('Submit Error:', err);
    alert('Failed to publish event.');
  }
};

const user =useAuthStore((state)=>state.user)
const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!formData.coverImage) return;

    try {
      setUploading(true);

      // Call your existing upload function
      const publicUrl = await uploadImage(formData.coverImage, user._id);

      // Save the returned URL in formData
      setFormData((prev) => ({ ...prev, coverImage: publicUrl }));
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error('Error uploading image:', err);
    //   toast.error('Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" style={{ backgroundColor: '#DDDCDB' }}>
      <div className="w-full max-w-2xl rounded-lg border border-zinc-800 overflow-hidden shadow-2xl">
        
        {/* Progress Header */}
        <div className="bg-[#3C4044] p-8 text-center flex">

            <div className='flex-5/6'>

                 <div className="flex justify-center space-x-3 mb-4">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 w-16 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#FD7B41]' : 'bg-gray-600'}`} 
              />
            ))}
          </div>
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter">
            {step === 1 && "Basic Details"}
            {step === 2 && "Time & Venue"}
            {step === 3 && "Registration"}
          </h1>

            </div>
<div className='flex-1/6'>
<button onClick={()=>onClose()}>
            <FontAwesomeIcon icon={faXmark} className='h-24 w-24 text-gray-200' />
        </button>
</div>
             
         
        </div>
       

        <form onSubmit={handleFinalSubmit} className="p-10 space-y-8">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Event Title*</label>
                <input 
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="The Founder Summit 2026" 
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#FD7B41] outline-none font-bold" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-[#3C4044] outline-none"
                  >
                    <option value="startup">Startup</option>
                    <option value="tech">Tech</option>
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
            

 <div>
      <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">
        Cover Image*
      </label>

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
        className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold"
      />

      {/* Upload button */}
      {formData?.coverImage && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="mt-2 px-6 py-2 bg-[#FD7B41] text-white rounded-full font-bold text-sm disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}

      {/* Show uploaded image */}
      {formData.coverImage && (
        <p className="text-[10px] mt-2 text-green-600 font-bold">
          Uploaded: {formData?.coverImage?.name}
        </p>
      )}
    </div>

              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Full Description</label>
                <textarea 
                  rows="4" 
                  name="description"
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-medium resize-none" 
                  placeholder="Detail your event agenda..."
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 2: LOGISTICS */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex bg-gray-100 p-1 rounded-2xl">
                {['virtual', 'physical', 'hybrid'].map((m) => (
                  <button 
                    key={m}
                    type="button"
                    onClick={() => setFormData({...formData, type: m})}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.type === m ? 'bg-[#3C4044] text-white shadow-lg' : 'text-gray-400'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Start Time</label>
                  <input 
                    type="datetime-local" 
                    name="startTime"
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">End Time</label>
                  <input 
                    type="datetime-local" 
                    name="endTime"
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" 
                  />
                </div>
              </div>

              {formData.type !== 'physical' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-[#FD7B41] mb-2 block">Meeting Link</label>
                  <input 
                    name="meetingLink"
                    onChange={handleChange}
                    placeholder="Zoom or Google Meet Link" 
                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-[#EDBF9B]/30 font-bold outline-none" 
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PRICING & SUBMIT */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div 
                className="flex items-center justify-between p-6 rounded-[2rem] cursor-pointer border-2 transition-all"
                style={{ backgroundColor: formData.isPaid ? '#EDBF9B20' : '#F9F9F9', borderColor: formData.isPaid ? '#FD7B41' : 'transparent' }}
                onClick={() => setFormData({...formData, isPaid: !formData.isPaid})}
              >
                <div>
                  <h4 className="font-black text-[#3C4044] uppercase text-sm">Paid Access</h4>
                  <p className="text-[10px] text-gray-500 font-bold">Require payment to join</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${formData.isPaid ? 'bg-[#FD7B41]' : 'bg-gray-300'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isPaid ? 'left-7' : 'left-1'}`} />
                </div>
              </div>

              {formData.isPaid && (
                <div className="grid grid-cols-2 gap-6 animate-slideDown">
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Ticket Price (INR)</label>
                    <input 
                      type="number" 
                      onChange={(e) => handleNestedChange('price', 'amount', e.target.value)}
                      className="w-full p-4 bg-gray-50 rounded-2xl font-black text-xl outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Max Slots</label>
                    <input 
                      type="number" 
                      name="maxParticipants"
                      onChange={handleChange}
                      placeholder="0 for unlimited" 
                      className="w-full p-4 bg-gray-50 rounded-2xl font-bold outline-none" 
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase text-[#3C4044] mb-2 block">Search Tags</label>
                <input 
                  name="tags"
                  onChange={handleChange}
                  placeholder="AI, Fintech, SaaS (comma separated)" 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none font-bold" 
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={prevStep}
                className="px-8 py-4 text-[#3C4044] font-black uppercase text-[10px] tracking-widest"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Back
              </button>
            ) : <div />}

            <div>
              {step < 3 ? (
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-[#FD7B41] text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95 transition-all"
                >
                  Continue <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleFinalSubmit}
                  className="bg-[#3C4044] text-[#EDBF9B] px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-[#FD7B41] hover:text-white transition-all"
                >
                  Publish Event <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationWizard;
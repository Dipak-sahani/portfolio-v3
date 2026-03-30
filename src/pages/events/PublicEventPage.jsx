import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImagePreview from '../../components/ImagePrev/ImagePreview';
import ShareModal from '../../components/common/ShareModal';
import ReportModal from '../../components/common/ReportModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faFlag, faUsers, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/auth.store';
import { addToCalendar } from '../../services/calendar.service';

const PublicEventPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    members: [{ name: '', email: '', answers: {} }], // For group events
    answers: {}
  });

  const addMember = () => {
    if (formData.members.length < (event.maxGroupSize || 5)) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', email: '', answers: {} }]
      });
    } else {
      toast.info(`Maximum group size is ${event.maxGroupSize || 5}`);
    }
  };

  const removeMember = (index) => {
    const newMembers = [...formData.members];
    newMembers.splice(index, 1);
    setFormData({ ...formData, members: newMembers });
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    newMembers[index][field] = value;
    setFormData({ ...formData, members: newMembers });
  };

  const handleMemberAnswerChange = (memberIndex, fieldId, value) => {
    const newMembers = [...formData.members];
    newMembers[memberIndex].answers = {
      ...newMembers[memberIndex].answers,
      [fieldId]: value
    };
    setFormData({ ...formData, members: newMembers });
  };
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleSaveToCalendar = async () => {
    if (!event) return;
    setIsSaving(true);
    try {
      await addToCalendar({
        type: "event",
        eventId: event._id,
        date: event.startDate,
        description: event.title,
      });
      toast.success("Event saved to your calendar!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save event");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/slug/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setEvent(data.event);
          // Fire and forget view recording after 3 seconds
          setTimeout(() => {
            fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/slug/${slug}/view`, { method: 'POST' }).catch(() => {});
          }, 3000);
        } else {
          toast.error(data.message || 'Event not found');
        }
      } catch (err) {
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  const handleBasicChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (fieldId, value) => {
    setFormData({
      ...formData,
      answers: {
        ...formData.answers,
        [fieldId]: value
      }
    });
  };

  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [generatingCertId, setGeneratingCertId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/slug/${slug}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setRegisteredMembers(data.registrations || []);
      setSuccess(true);
      toast.success(data.message || 'Registered Successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const findMemberAnswers = (attendee) => {
    if (!formData.isGroupEvent) return formData.answers;
    const member = formData.members.find(m => m.email === attendee.email);
    return member?.answers || formData.answers;
  };

  const handlePrintCertificate = async (attendee) => {
    if (!event.certificateTemplate || !event.certificateTemplate.imageUrl) {
      return toast.error("Certificate template not configured yet.");
    }

    setGeneratingCertId(attendee.id);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.create();
      
      const imageUrl = `${import.meta.env.VITE_IMG_CDN}/${event.certificateTemplate.imageUrl}`;
      const templateImgBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
      const isPng = event.certificateTemplate.imageUrl.includes('.png') || event.certificateTemplate.imageUrl.startsWith('data:image/png');
      const templateImg = isPng ? await pdfDoc.embedPng(templateImgBytes) : await pdfDoc.embedJpg(templateImgBytes);
      
      const { width, height } = templateImg.scale(1);
      const designerWidth = event.certificateTemplate.designerWidth || 800;
      const fontScale = width / designerWidth;

      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
        return result ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        } : { r: 0, g: 0, b: 0 };
      };

      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(templateImg, { x: 0, y: 0, width, height });

      event.certificateTemplate.fields.forEach(field => {
        let text = field.placeholder || '';
        const normalizedPlaceholder = text.toLowerCase().trim();
        
        if (normalizedPlaceholder === '{{name}}') {
          text = attendee.name || attendee.guest_name || 'Participant';
        } else if (normalizedPlaceholder === '{{event}}') {
          text = event.title;
        } else if (normalizedPlaceholder === '{{date}}') {
          text = event.startDate ? new Date(event.startDate).toLocaleDateString() : new Date().toLocaleDateString();
        } else if (normalizedPlaceholder === '{{id}}') {
          text = attendee.id.slice(-8).toUpperCase();
        } else if (text.startsWith('{{') && text.endsWith('}}')) {
          // Check common answers from member or formData
          const fieldId = text.replace('{{field_', '').replace('}}', '');
          const answers = findMemberAnswers(attendee);
          text = answers[fieldId] || '';
        }

        const scaledFontSize = (field.fontSize || 24) * fontScale;
        const textWidth = helveticaFont.widthOfTextAtSize(text, scaledFontSize);
        const centerX = (field.x / 100) * width;
        const pdfX = centerX - (textWidth / 2);
        const pdfY = height - ((field.y / 100) * height) - scaledFontSize;
        const color = hexToRgb(field.fontColor);

        page.drawText(text, {
          x: pdfX,
          y: pdfY,
          size: scaledFontSize,
          font: helveticaFont,
          color: rgb(color.r, color.g, color.b),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${attendee.name}-Certificate.pdf`;
      link.click();
      toast.success("Certificate generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate certificate: " + err.message);
    } finally {
      setGeneratingCertId(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading Event...</div>;
  if (!event) return <div className="text-center py-20 text-red-500">Event not found or not published.</div>;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Registration Successful! 🎉</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Thank you for registering for <strong className="text-gray-900 dark:text-white">{event.title}</strong>.</p>
          
          <div className="space-y-4 mb-10 text-left">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Registered Participants</h3>
            {registeredMembers.map((member) => (
              <div key={member.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border dark:border-gray-700 gap-4">
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                </div>
                {event.certificateTemplate?.imageUrl && (
                  <button 
                    onClick={() => handlePrintCertificate(member)}
                    disabled={generatingCertId === member.id}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {generatingCertId === member.id ? 'Generating...' : 'Print Certificate'}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setSuccess(false);
                setFormData({ ...formData, members: [{ name: '', email: '', answers: {} }], guest_name: '', guest_email: '', answers: {} });
                setRegisteredMembers([]);
              }} 
              className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Register Another
            </button>
            <Link 
              to="/" 
              className="px-8 py-3 bg-[#FD7B41] text-white font-bold rounded-xl hover:bg-[#E66B3B] transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        {event.coverImage && (
          <ImagePreview src={`${import.meta.env.VITE_IMG_CDN}/${event.coverImage}`} alt={event.title} className="w-full h-64 object-cover" />
        )}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{event.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{event.shortDescription || event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg text-gray-800 dark:text-gray-200">
            <div><strong className="text-gray-900 dark:text-gray-100">Dates:</strong> {(event.startDate || event.startTime) ? new Date(event.startDate || event.startTime).toLocaleDateString() : 'TBA'} - {(event.endDate || event.endTime) ? new Date(event.endDate || event.endTime).toLocaleDateString() : 'TBA'}</div>
            <div><strong className="text-gray-900 dark:text-gray-100">Format:</strong> <span className="capitalize">{event.type}</span></div>
            <div><strong className="text-gray-900 dark:text-gray-100">Location:</strong> {event.location?.city || event.location?.address ? `${event.location?.address}, ${event.location?.city}` : 'Online/TBA'}</div>
            <div><strong className="text-gray-900 dark:text-gray-100">Category:</strong> <span className="capitalize">{event.category}</span></div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {user && (user._id === event.createdBy?._id || user.id === event.createdBy?._id) && (
              <button
                onClick={() => navigate(`/events/dashboard/${event._id}`)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition shadow-sm"
              >
                <FontAwesomeIcon icon={faUsers} />
                View Dashboard
              </button>
            )}
            
            <button
              onClick={handleSaveToCalendar}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition shadow-sm disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faCalendarPlus} />
              {isSaving ? "Saving..." : "Save to Calendar"}
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#FD7B41] text-[#FD7B41] rounded-lg font-bold hover:bg-[#FD7B41] hover:text-white transition"
            >
              <FontAwesomeIcon icon={faShareAlt} />
              Share
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FontAwesomeIcon icon={faFlag} />
              Report
            </button>
          </div>

          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Register for this event</h2>
            
            {event.status === 'paused' ? (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-lg text-center border border-yellow-200 dark:border-yellow-700/50">
                <h3 className="text-xl font-medium mb-2">Registrations Paused</h3>
                <p>The event organizer has temporarily paused new registrations for this event.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {event.isGroupEvent ? (
                  <div className="space-y-6">
                    {formData.members.map((member, index) => (
                      <div key={index} className="p-6 bg-gray-50 dark:bg-gray-900/50 border dark:border-gray-700 rounded-xl relative border-dashed">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-bold text-[#FD7B41] uppercase tracking-wider">Member {index + 1} {index === 0 && '(Main Registrant)'}</h4>
                          {index > 0 && (
                            <button 
                              type="button" 
                              onClick={() => removeMember(index)} 
                              className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-tight"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name *</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="John Doe"
                              value={member.name} 
                              onChange={(e) => handleMemberChange(index, 'name', e.target.value)} 
                              className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Address *</label>
                            <input 
                              required 
                              type="email" 
                              placeholder="john@example.com"
                              value={member.email} 
                              onChange={(e) => handleMemberChange(index, 'email', e.target.value)} 
                              className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]" 
                            />
                          </div>
                        </div>

                        {/* Additional Info per member */}
                        {event.formSchema && event.formSchema.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-dashed dark:border-gray-700 space-y-4">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Additional Info for Member {index + 1}</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {event.formSchema.map(field => (
                                <div key={field.id} className="w-full">
                                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    {field.label} {field.required && '*'}
                                  </label>

                                  {field.fieldType === 'textarea' ? (
                                    <textarea
                                      required={field.required}
                                      value={member.answers?.[field.id] || ''}
                                      onChange={(e) => handleMemberAnswerChange(index, field.id, e.target.value)}
                                      className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                                    />
                                  ) : field.fieldType === 'dropdown' ? (
                                    <select
                                      required={field.required}
                                      value={member.answers?.[field.id] || ''}
                                      onChange={(e) => handleMemberAnswerChange(index, field.id, e.target.value)}
                                      className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                                    >
                                      <option value="">Select an option</option>
                                      {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                                    </select>
                                  ) : field.fieldType === 'radio' ? (
                                    <div className="space-y-2 mt-2">
                                      {field.options?.map((opt, i) => (
                                        <label key={i} className="flex items-center space-x-2 cursor-pointer">
                                          <input
                                            type="radio"
                                            name={`${field.id}_${index}`}
                                            value={opt}
                                            checked={member.answers?.[field.id] === opt}
                                            required={field.required}
                                            onChange={(e) => handleMemberAnswerChange(index, field.id, e.target.value)}
                                            className="text-[#FD7B41] focus:ring-[#FD7B41] dark:bg-gray-700 dark:border-gray-600"
                                          />
                                          <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : (
                                    <input
                                      type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
                                      required={field.required}
                                      value={member.answers?.[field.id] || ''}
                                      onChange={(e) => handleMemberAnswerChange(index, field.id, e.target.value)}
                                      className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {formData.members.length < (event.maxGroupSize || 5) && (
                      <button 
                        type="button" 
                        onClick={addMember} 
                        className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-[#FD7B41] hover:text-[#FD7B41] rounded-xl transition font-medium text-sm"
                      >
                        + Add Another Member (Max {event.maxGroupSize || 5})
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name *</label>
                      <input required type="text" name="guest_name" value={formData.guest_name} onChange={handleBasicChange} className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Address *</label>
                      <input required type="email" name="guest_email" value={formData.guest_email} onChange={handleBasicChange} className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]" />
                    </div>
                  </div>
                )}

                {/* Dynamic Fields (Global - only for non-group events) */}
                {(!event.isGroupEvent) && event.formSchema && event.formSchema.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-dashed dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Additional Information</h3>
                    {event.formSchema.map(field => (
                      <div key={field.id} className="w-full">
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          {field.label} {field.required && '*'}
                        </label>

                        {field.fieldType === 'textarea' ? (
                          <textarea
                            required={field.required}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                          />
                        ) : field.fieldType === 'dropdown' ? (
                          <select
                            required={field.required}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                          </select>
                        ) : field.fieldType === 'radio' ? (
                          <div className="space-y-2 mt-2">
                            {field.options?.map((opt, i) => (
                              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name={field.id}
                                  value={opt}
                                  required={field.required}
                                  onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                                  className="text-[#FD7B41] focus:ring-[#FD7B41] dark:bg-gray-700 dark:border-gray-600"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={field.fieldType === 'email' ? 'email' : field.fieldType === 'phone' ? 'tel' : 'text'}
                            required={field.required}
                            onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                            className="w-full px-4 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded focus:ring-2 focus:ring-[#FD7B41]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full md:w-auto px-8 py-3 bg-[#FD7B41] text-white font-bold rounded-lg hover:bg-[#E66B3B] disabled:opacity-50 transition"
                >
                  {submitting ? 'Registering...' : 'Complete Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Check out this event: ${event?.title}`}
        url={window.location.href}
        content={event?.description}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        targetId={event._id}
        targetType="Event"
      />
    </div>
  );
};

export default PublicEventPage;

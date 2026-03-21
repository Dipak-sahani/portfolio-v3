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
    answers: {}
  });
  
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

      setSuccess(true);
      toast.success(data.message || 'Registered Successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading Event...</div>;
  if (!event) return <div className="text-center py-20 text-red-500">Event not found or not published.</div>;

  if (success) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold mb-4">Registration Successful! 🎉</h2>
          <p className="text-lg">Thank you for registering for <strong className="text-gray-900 dark:text-white">{event.title}</strong>.</p>
          <p className="mt-4 text-green-700 dark:text-green-400">We look forward to seeing you there.</p>
          <button onClick={() => setSuccess(false)} className="mt-8 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition">Register Another Guest</button>
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

                {/* Dynamic Fields */}
                {event.formSchema && event.formSchema.length > 0 && (
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

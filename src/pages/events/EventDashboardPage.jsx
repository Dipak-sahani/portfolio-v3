import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/auth.store';
import { useEventStore } from '../../store/event.store';
import { QRCodeCanvas } from 'qrcode.react';
import CertificateDesigner from '../../components/events/CertificateDesigner';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const EventDashboardPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  
  const [event, setEvent] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState('text');
  const [addingColumn, setAddingColumn] = useState(false);
  const [editingColumn, setEditingColumn] = useState(null); // { id, name }
  const [savingData, setSavingData] = useState({}); // { 'regId-colId': true/false }
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [showCertDesigner, setShowCertDesigner] = useState(false);
  const [generatingCerts, setGeneratingCerts] = useState(false);
  const deleteEventAction = useEventStore(state => state.deleteEvent);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!token) return;
        const [eventRes, statsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/dashboard/stats`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const eventData = await eventRes.json();
        const statsData = await statsRes.json();

        if (eventRes.ok) setEvent(eventData.event);
        if (statsRes.ok) setStats(statsData.stats);
      } catch (err) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [eventId, token]);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/publish`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setEvent({ ...event, status: 'published' });
      toast.success('Event published successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to publish event');
    } finally {
      setPublishing(false);
    }
  };

  const handleTogglePause = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/toggle-pause`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setEvent({ ...event, status: data.event.status });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message || 'Failed to toggle pause');
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/dashboard/export`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${event?.title || 'attendees'}-export.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      toast.error(err.message || 'CSV Export failed');
    }
  };

  const handleAddCustomColumn = async () => {
    if (!newColumnName.trim()) return;
    setAddingColumn(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/columns`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ column_name: newColumnName, column_type: newColumnType })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      setStats(prev => ({
        ...prev,
        customColumns: [...(prev.customColumns || []), data.column]
      }));
      setNewColumnName('');
      toast.success('Custom column added!');
    } catch (err) {
      toast.error(err.message || 'Failed to add column');
    } finally {
      setAddingColumn(false);
    }
  };

  const handleCustomDataChange = async (registrationId, columnId, value) => {
    const key = `${registrationId}-${columnId}`;
    setSavingData(prev => ({ ...prev, [key]: true }));

    // Optimistically update UI
    setStats(prev => {
      const existingData = prev.customData || [];
      const dataIndex = existingData.findIndex(d => d.registration_id === registrationId && d.column_id === columnId);
      let newData = [...existingData];
      if (dataIndex >= 0) {
        newData[dataIndex] = { ...newData[dataIndex], value };
      } else {
        newData.push({ registration_id: registrationId, column_id: columnId, value });
      }
      return { ...prev, customData: newData };
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/registrations/${registrationId}/custom-data`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ column_id: columnId, value })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      // Success, UI already updated optimistically
    } catch (err) {
      toast.error(err.message || 'Failed to save data. Please refresh.');
      // Ideally revert optimistic update here, but relying on refresh for simplicity in case of error
    } finally {
      setSavingData(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleDeleteColumn = async (columnId) => {
    if (!window.confirm('Are you sure you want to delete this column and all its data?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/columns/${columnId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete column');
      
      setStats(prev => ({
        ...prev,
        customColumns: prev.customColumns.filter(c => c.id !== columnId),
        customData: prev.customData?.filter(d => d.column_id !== columnId)
      }));
      toast.success('Column deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditColumn = async (columnId, newName) => {
    if (!newName.trim()) return setEditingColumn(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/columns/${columnId}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ column_name: newName })
      });
      if (!res.ok) throw new Error('Failed to edit column');
      
      setStats(prev => ({
        ...prev,
        customColumns: prev.customColumns.map(c => c.id === columnId ? { ...c, column_name: newName } : c)
      }));
      setEditingColumn(null);
      toast.success('Column updated');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to remove this attendee?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${eventId}/registrations/${registrationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete registration');
      
      setStats(prev => ({
        ...prev,
        recentAttendees: prev.recentAttendees.filter(a => a.id !== registrationId),
        totalRegistrations: Math.max(0, prev.totalRegistrations - 1)
      }));
      toast.success('Attendee removed');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteEvent = async () => {
    const confirmMessage = "WARNING: This will permanently delete this event, all registrations, and all associated images from the server. This action CANNOT be undone.\n\nType 'DELETE' to confirm:";
    const input = window.prompt(confirmMessage);
    
    if (input !== 'DELETE') {
      if (input !== null) toast.info("Deletion cancelled. You must type 'DELETE' to confirm.");
      return;
    }

    setDeleting(true);
    try {
      const success = await deleteEventAction(eventId);
      if (success) {
        toast.success("Event deleted successfully");
        navigate('/events/my-posted');
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedAttendees.length === (stats?.recentAttendees?.length || 0)) {
      setSelectedAttendees([]);
    } else {
      setSelectedAttendees(stats?.recentAttendees?.map(a => a.id) || []);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedAttendees(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGenerateCerts = async () => {
    if (!event.certificateTemplate || !event.certificateTemplate.imageUrl) {
      return toast.error("Please configure the certificate template first.");
    }

    setGeneratingCerts(true);
    try {
      const pdfDoc = await PDFDocument.create();
      
      // Load template image
      const imageUrl = `${import.meta.env.VITE_IMG_CDN}/${event.certificateTemplate.imageUrl}`;
      const templateImgBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
      const isPng = event.certificateTemplate.imageUrl.includes('.png') || event.certificateTemplate.imageUrl.startsWith('data:image/png');
      const templateImg = isPng ? await pdfDoc.embedPng(templateImgBytes) : await pdfDoc.embedJpg(templateImgBytes);
      
      const { width, height } = templateImg.scale(1);
      
      // Font scale factor: natural image width / width used during design
      const designerWidth = event.certificateTemplate.designerWidth || 800;
      const fontScale = width / designerWidth;

      // Helper for hex color to pdf-lib rgb
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000');
        return result ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        } : { r: 0, g: 0, b: 0 };
      };

      // Embed font for width calculations
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      for (const attendeeId of selectedAttendees) {
        const attendee = stats.recentAttendees.find(a => a.id === attendeeId);
        if (!attendee) continue;

        const page = pdfDoc.addPage([width, height]);
        
        // Draw background
        page.drawImage(templateImg, { x: 0, y: 0, width, height });

          // Draw dynamic text
          event.certificateTemplate.fields.forEach(field => {
            let text = field.placeholder || '';
            const normalizedPlaceholder = text.toLowerCase().trim();
            
            // Robust Name Lookup
            if (normalizedPlaceholder === '{{name}}') {
              text = attendee.guest_name || attendee.name || attendee.full_name || 'Participant';
            } 
            // Standard Placeholders
            else if (normalizedPlaceholder === '{{event}}') {
              text = event.title;
            }
            else if (normalizedPlaceholder === '{{date}}') {
              text = new Date(event.startDate).toLocaleDateString();
            }
            else if (normalizedPlaceholder === '{{id}}') {
              text = attendeeId.slice(-8).toUpperCase();
            }
            
            // Registration Form Placeholders: {{field_ID}}
            else if (normalizedPlaceholder.startsWith('{{field_') && normalizedPlaceholder.endsWith('}}')) {
              const fieldId = normalizedPlaceholder.replace('{{field_', '').replace('}}', '');
              const answerObj = stats?.formAnswers?.find(a => a.registration_id === attendee.id && a.field_id === fieldId);
              text = answerObj ? answerObj.answer_value : '';
            }
            
            // Fallback: if it's still a placeholder format but unknown, show nothing or custom text
            else if (text.startsWith('{{') && text.endsWith('}}')) {
              text = '';
            }

            // pdf-lib origin is bottom-left (0,0), but CSS designer is top-left (0,0)
            // field.x and field.y are now percentages (0-100)
            const scaledFontSize = (field.fontSize || 24) * fontScale;
            
            // Calculate text width to center it
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
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title}-Certificates.pdf`;
      link.click();
      toast.success("Certificates generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate certificates: " + err.message);
    } finally {
      setGeneratingCerts(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;
  if (!event) return <div className="p-10 text-center text-red-500">Event not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{event.title} Dashboard</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${event.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
              {event.status?.toUpperCase() || 'DRAFT'}
            </span>
            {event.status === 'published' && (
              <a href={`/events/p/${event.slug}`} target="_blank" rel="noreferrer" className="text-[#FD7B41] hover:text-[#E66B3B] text-sm font-medium">
                View Public Page ↗
              </a>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          {event.status === 'published' && (
            <div className="hidden sm:flex flex-col items-center bg-white dark:bg-gray-800 p-2 rounded shadow-sm border dark:border-gray-700">
              <QRCodeCanvas 
                id="qr-gen"
                value={`${window.location.origin}/events/p/${event.slug}`} 
                size={160} 
                bgColor={"#ffffff"}
                fgColor={"#000000"}
              />
              <button 
                onClick={() => {
                  const canvas = document.getElementById("qr-gen");
                  const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                  let downloadLink = document.createElement("a");
                  downloadLink.href = pngUrl;
                  downloadLink.download = `${event.slug}-qr.png`;
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                }}
                className="text-sm text-[#FD7B41] hover:underline mt-2 font-medium cursor-pointer"
              >
                Download QR
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {event.status === 'draft' && (
              <button onClick={handlePublish} disabled={publishing} className="px-5 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
                {publishing ? 'Publishing...' : 'Publish Event'}
              </button>
            )}
            
            {(event.status === 'published' || event.status === 'paused') && (
              <button 
                onClick={handleTogglePause} 
                className={`px-5 py-2 text-white rounded shadow transition ${event.status === 'published' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {event.status === 'published' ? 'Pause Registrations' : 'Resume Registrations'}
              </button>
            )}

            <button onClick={handleExportCSV} className="px-5 py-2 bg-[#FD7B41] text-white rounded shadow hover:bg-[#E66B3B] transition">
              Export CSV
            </button>
            <button 
              onClick={() => setShowCertDesigner(true)} 
              className="px-5 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
            >
              Certificate Settings
            </button>
          </div>
        </div>
      </div>

      {selectedAttendees.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-gray-800 px-6 py-4 rounded-full shadow-2xl border dark:border-gray-700 flex items-center gap-6 animate-bounce-in">
          <span className="text-gray-700 dark:text-gray-200 font-semibold">
            {selectedAttendees.length} Participants Selected
          </span>
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedAttendees([])}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Deselect All
            </button>
            <button 
              onClick={() => {
                if (!event.certificateTemplate?.imageUrl) {
                  toast.warning("Please configure certificate template first!");
                  setShowCertDesigner(true);
                } else {
                  handleGenerateCerts();
                }
              }}
              disabled={generatingCerts}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full shadow-lg transition disabled:opacity-50"
            >
              {generatingCerts ? 'Generating...' : 'Generate Certificates'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Total Registrations</p>
          <h3 className="text-4xl font-bold text-[#FD7B41]">{stats?.totalRegistrations || 0}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Page Views (approx)</p>
          <h3 className="text-4xl font-bold text-[#FD7B41]">{stats?.views || 0}</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center">
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">Capacity</p>
          <h3 className="text-4xl font-bold text-gray-700 dark:text-gray-300">{event.maxParticipants > 0 ? `${stats?.totalRegistrations || 0} / ${event.maxParticipants}` : 'Unlimited'}</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Recent Attendees</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <input 
              type="text" 
              placeholder="New Column Name..." 
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="px-3 py-1.5 text-sm border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded focus:ring-[#FD7B41] focus:border-[#FD7B41]"
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomColumn()}
            />
            <select
              value={newColumnType}
              onChange={(e) => setNewColumnType(e.target.value)}
              className="px-3 py-1.5 text-sm border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded focus:ring-[#FD7B41] focus:border-[#FD7B41]"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="checkbox">Checkbox</option>
            </select>
            <button 
              onClick={handleAddCustomColumn} 
              disabled={addingColumn || !newColumnName.trim()}
              className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition"
            >
              + Add Column
            </button>
          </div>
        </div>
        {stats?.recentAttendees?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm">
                  <th className="p-4 border-b dark:border-gray-700 w-10">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" 
                      checked={selectedAttendees.length > 0 && selectedAttendees.length === (stats?.recentAttendees?.length || 0)}
                      onChange={handleToggleSelectAll}
                    />
                  </th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700">Name</th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700">Email</th>
                  <th className="p-4 font-semibold border-b dark:border-gray-700 whitespace-nowrap">Registered At</th>
                  {stats?.formSchema?.map(field => (
                    <th key={field.id} className="p-4 font-semibold border-b dark:border-gray-700 whitespace-nowrap">
                      {field.label}
                    </th>
                  ))}
                  {stats?.customColumns?.map(col => (
                    <th key={col.id} className="p-4 font-semibold border-b dark:border-gray-700 min-w-[150px] group">
                      {editingColumn?.id === col.id ? (
                        <div className="flex items-center gap-1">
                          <input 
                            autoFocus
                            type="text" 
                            value={editingColumn.name}
                            onChange={e => setEditingColumn({ ...editingColumn, name: e.target.value })}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleEditColumn(col.id, editingColumn.name);
                              if (e.key === 'Escape') setEditingColumn(null);
                            }}
                            onBlur={() => handleEditColumn(col.id, editingColumn.name)}
                            className="w-full px-2 py-1 text-sm text-gray-900 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{col.column_name}</span>
                          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                            <button 
                              onClick={() => setEditingColumn({ id: col.id, name: col.column_name })}
                              className="p-1 text-gray-400 hover:text-[#FD7B41]"
                              title="Edit column name"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button 
                              onClick={() => handleDeleteColumn(col.id)}
                              className="p-1 text-gray-400 hover:text-red-500"
                              title="Delete column"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </th>
                  ))}
                  <th className="p-4 font-semibold border-b dark:border-gray-700 w-10">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAttendees.map((attendee) => (
                  <tr key={attendee.id} className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${selectedAttendees.includes(attendee.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                    <td className="p-4 border-b dark:border-gray-700">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        checked={selectedAttendees.includes(attendee.id)}
                        onChange={() => handleToggleSelect(attendee.id)}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{attendee.guest_name}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{attendee.guest_email}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-500 text-sm whitespace-nowrap">{new Date(attendee.created_at).toLocaleString()}</td>
                    
                    {stats?.formSchema?.map(field => {
                      const answerObj = stats?.formAnswers?.find(a => a.registration_id === attendee.id && a.field_id === field.id);
                      return (
                        <td key={field.id} className="p-4 text-gray-700 dark:text-gray-300">
                          {answerObj ? answerObj.answer_value : '-'}
                        </td>
                      );
                    })}

                    {stats?.customColumns?.map(col => {
                      const customValObj = stats?.customData?.find(d => d.registration_id === attendee.id && d.column_id === col.id);
                      const isSaving = savingData[`${attendee.id}-${col.id}`];
                      const val = customValObj?.value || '';

                      return (
                        <td key={col.id} className="p-4">
                          {col.column_type === 'checkbox' ? (
                            <input 
                              type="checkbox" 
                              checked={val === 'true'}
                              onChange={(e) => {
                                handleCustomDataChange(attendee.id, col.id, e.target.checked ? 'true' : 'false');
                              }}
                              className={`w-4 h-4 text-[#FD7B41] rounded focus:ring-[#FD7B41] dark:bg-gray-700 dark:border-gray-600 ${isSaving ? 'opacity-50' : ''}`}
                              disabled={isSaving}
                            />
                          ) : col.column_type === 'number' ? (
                             <input 
                              type="number" 
                              defaultValue={val}
                              onBlur={(e) => {
                                if (e.target.value !== val) {
                                  handleCustomDataChange(attendee.id, col.id, e.target.value);
                                }
                              }}
                              placeholder="0"
                              className={`w-full max-w-[100px] px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-[#FD7B41] dark:bg-transparent dark:text-white transition-colors focus:outline-none ${isSaving ? 'opacity-50' : ''}`}
                              disabled={isSaving}
                            />
                          ) : (
                            <input 
                              type="text" 
                              defaultValue={val}
                              onBlur={(e) => {
                                if (e.target.value !== val) {
                                  handleCustomDataChange(attendee.id, col.id, e.target.value);
                                }
                              }}
                              placeholder="Add note..."
                              className={`w-full min-w-[120px] px-2 py-1 text-sm border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-[#FD7B41] dark:bg-transparent dark:text-white transition-colors focus:outline-none ${isSaving ? 'opacity-50' : ''}`}
                              disabled={isSaving}
                            />
                          )}
                        </td>
                      );
                    })}
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDeleteRegistration(attendee.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
                        title="Delete Attendance"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">
            No registrations yet.
          </div>
        )}
      </div>
      <div className="mt-16 pt-8 border-t border-red-100 dark:border-red-900/30">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-500 mb-4">Danger Zone</h2>
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400">Delete this event</h3>
            <p className="text-red-600 dark:text-red-500/70 text-sm mt-1">
              Once you delete an event, there is no going back. All registrations and images will be permanently removed.
            </p>
          </div>
          <button 
            onClick={handleDeleteEvent}
            disabled={deleting}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition disabled:opacity-50 whitespace-nowrap"
          >
            {deleting ? 'Deleting...' : 'Delete Event'}
          </button>
        </div>
      </div>

      {showCertDesigner && (
        <CertificateDesigner 
          event={event} 
          token={token} 
          onClose={() => setShowCertDesigner(false)} 
          onSave={(updatedTemplate) => setEvent({ ...event, certificateTemplate: updatedTemplate })}
        />
      )}
    </div>
  );
};

export default EventDashboardPage;

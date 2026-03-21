import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const CertificateDesigner = ({ event, token, onClose, onSave }) => {
  const [template, setTemplate] = useState(event.certificateTemplate || {
    imageUrl: '',
    fields: [
      { id: '1', name: 'Participant Name', placeholder: '{{name}}', x: 100, y: 100, fontSize: 32, fontColor: '#000000' },
      { id: '2', name: 'Event Name', placeholder: '{{event}}', x: 100, y: 150, fontSize: 24, fontColor: '#000000' }
    ]
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${event._id}/certificate-template/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setTemplate(prev => ({ ...prev, imageUrl: data.url }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed: " + (err.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const handleAddField = () => {
    const newField = { 
      id: Date.now().toString(), 
      name: 'New Field', 
      placeholder: '{{name}}', 
      x: 10, 
      y: 20, 
      fontSize: 24, 
      fontColor: '#000000' 
    };
    setTemplate(prev => ({ ...prev, fields: [...prev.fields, newField] }));
  };

  const handleDeleteField = (id) => {
    setTemplate(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== id) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:8000'}/api/event/${event._id}/certificate-template`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          certificateTemplate: { 
            ...template, 
            designerWidth: canvasRef.current?.width || 800 
          } 
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onSave(data.event.certificateTemplate);
      toast.success("Template saved successfully!");
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (id, updates) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.map(f => f.id === id ? { ...f, ...updates } : f)
    }));
  };

  const placeholders = [
    { label: 'Participant Name', value: '{{name}}' },
    { label: 'Event Title', value: '{{event}}' },
    { label: 'Event Date', value: '{{date}}' },
    { label: 'Certificate ID', value: '{{id}}' },
    ...(event.formSchema?.map(field => ({ label: `Form: ${field.label}`, value: `{{field_${field.id}}}` })) || [])
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Certificate Designer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">&times;</button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Preview Area */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto p-8 flex items-center justify-center relative">
            {template.imageUrl ? (
              <div className="relative shadow-lg" style={{ maxWidth: '100%' }}>
                <img 
                  src={`${import.meta.env.VITE_IMG_CDN}/${template.imageUrl}`} 
                  alt="Template" 
                  className="max-w-full block" 
                  onLoad={(e) => {
                    const { width, height } = e.target.getBoundingClientRect();
                    canvasRef.current = { width, height };
                  }}
                />
                {template.fields.map(field => (
                  <div
                    key={field.id}
                    className="absolute cursor-move group select-none"
                    style={{
                      left: `${field.x}%`,
                      top: `${field.y}%`,
                      fontSize: `${field.fontSize}px`,
                      color: field.fontColor,
                      whiteSpace: 'nowrap',
                      border: '1px dashed #6366f1',
                      padding: '2px 8px',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      zIndex: 10,
                      transform: 'translate(-50%, 0)', // Center anchor
                      textAlign: 'center'
                    }}
                    onMouseDown={(e) => {
                      if (!canvasRef.current) return;
                      const { width, height } = canvasRef.current;
                      const startX = e.clientX;
                      const startY = e.clientY;
                      const initialXPercent = field.x;
                      const initialYPercent = field.y;

                      const onMouseMove = (moveEvent) => {
                        const dx = moveEvent.clientX - startX;
                        const dy = moveEvent.clientY - startY;
                        
                        // Convert pixel delta to percentage delta
                        const dxPercent = (dx / width) * 100;
                        const dyPercent = (dy / height) * 100;

                        updateField(field.id, { 
                          x: Math.min(100, Math.max(0, initialXPercent + dxPercent)), 
                          y: Math.min(100, Math.max(0, initialYPercent + dyPercent)) 
                        });
                      };

                      const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                      };

                      document.addEventListener('mousemove', onMouseMove);
                      document.addEventListener('mouseup', onMouseUp);
                    }}
                  >
                    {field.name}
                    <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 scale-75 origin-top bg-indigo-600 text-white px-2 py-1 rounded text-xs opacity-80">
                      [{field.placeholder}] Center X:{Math.round(field.x)}% Y:{Math.round(field.y)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No template image uploaded</p>
                <label className="px-6 py-3 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                  Upload Template Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            )}
          </div>

          {/* Settings Sidebar */}
          <div className="w-full md:w-80 border-l dark:border-gray-700 p-6 overflow-y-auto space-y-6">
            <div className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
              <div>
                <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Dynamic Fields</h3>
                <p className="text-[10px] text-gray-500">{template.fields.length} active fields</p>
              </div>
              <button 
                onClick={handleAddField}
                className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-lg flex items-center justify-center"
                title="Add New Field"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {template.fields.map(field => (
                <div key={field.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl space-y-3 border dark:border-gray-700 relative group/card">
                  <button 
                    onClick={() => handleDeleteField(field.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover/card:opacity-100 transition"
                  >
                    &times;
                  </button>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Field Name</label>
                    <input 
                      type="text" 
                      value={field.name} 
                      onChange={e => updateField(field.id, { name: e.target.value })}
                      className="w-full mt-0.5 bg-transparent border-b dark:border-gray-600 dark:text-white text-sm focus:border-indigo-500 outline-none p-1"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Content / Mapping</label>
                    <select 
                      value={field.placeholder}
                      onChange={e => updateField(field.id, { placeholder: e.target.value })}
                      className="w-full mt-0.5 bg-gray-100 dark:bg-gray-800 border-0 dark:text-white text-xs rounded p-1.5"
                    >
                      <optgroup label="Common">
                        {placeholders.filter(p => !p.value.includes('field_')).map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </optgroup>
                      {placeholders.some(p => p.value.includes('field_')) && (
                        <optgroup label="Registration Form Fields">
                           {placeholders.filter(p => p.value.includes('field_')).map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </optgroup>
                      )}
                      <option value="custom">-- Custom Text --</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500">Size</label>
                      <input 
                        type="number" 
                        value={field.fontSize} 
                        onChange={e => updateField(field.id, { fontSize: parseInt(e.target.value) || 12 })}
                        className="w-full mt-0.5 p-1 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500">Color</label>
                      <div className="flex items-center gap-2 mt-0.5">
                        <input 
                          type="color" 
                          value={field.fontColor} 
                          onChange={e => updateField(field.id, { fontColor: e.target.value })}
                          className="h-7 w-full border-0 bg-transparent cursor-pointer p-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
              <button
                onClick={handleSave}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                disabled={saving || uploading}
              >
                {saving ? 'Saving Template...' : 'Save Configuration'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDesigner;

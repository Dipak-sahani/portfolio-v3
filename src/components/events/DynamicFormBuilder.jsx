import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DynamicFormBuilder = ({ value = [], onChange }) => {
  const [fields, setFields] = useState(value);

  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      label: `New ${type} Field`,
      fieldType: type,
      required: false,
      options: ['Option 1'] // Only relevant for radio/dropdown
    };
    const updated = [...fields, newField];
    setFields(updated);
    onChange(updated);
  };

  const removeField = (id) => {
    const updated = fields.filter(f => f.id !== id);
    setFields(updated);
    onChange(updated);
  };

  const updateField = (id, key, val) => {
    const updated = fields.map(f => f.id === id ? { ...f, [key]: val } : f);
    setFields(updated);
    onChange(updated);
  };

  const addOption = (id) => {
    const updated = fields.map(f => {
      if (f.id === id) {
        return { ...f, options: [...(f.options || []), `Option ${(f.options?.length || 0) + 1}`] };
      }
      return f;
    });
    setFields(updated);
    onChange(updated);
  };

  const updateOption = (id, index, val) => {
    const updated = fields.map(f => {
      if (f.id === id) {
        const newOptions = [...f.options];
        newOptions[index] = val;
        return { ...f, options: newOptions };
      }
      return f;
    });
    setFields(updated);
    onChange(updated);
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Dynamic Registration Form Builder</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button type="button" onClick={() => addField('text')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Text</button>
        <button type="button" onClick={() => addField('email')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Email</button>
        <button type="button" onClick={() => addField('phone')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Phone</button>
        <button type="button" onClick={() => addField('textarea')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Textarea</button>
        <button type="button" onClick={() => addField('dropdown')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Dropdown</button>
        <button type="button" onClick={() => addField('radio')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add Radio</button>
        <button type="button" onClick={() => addField('file')} className="px-3 py-1 bg-[#EDBF9B] bg-opacity-30 text-[#FD7B41] rounded-md text-sm hover:bg-opacity-50 transition">Add File Upload</button>
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="p-4 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg relative">
            <button 
              type="button" 
              onClick={() => removeField(field.id)} 
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field Label</label>
                <input 
                  type="text" 
                  value={field.label} 
                  onChange={(e) => updateField(field.id, 'label', e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:ring-[#FD7B41] focus:border-[#FD7B41]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Field Type</label>
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-400 capitalize cursor-not-allowed">
                  {field.fieldType}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={field.required}
                  onChange={(e) => updateField(field.id, 'required', e.target.checked)}
                  className="w-4 h-4 text-[#FD7B41] rounded"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Required Field</label>
              </div>
            </div>

            {/* Options for dropdown and radio */}
            {['dropdown', 'radio'].includes(field.fieldType) && (
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</h4>
                {(field.options || []).map((opt, i) => (
                  <div key={i} className="flex mb-2">
                    <input 
                      type="text" 
                      value={opt} 
                      onChange={(e) => updateOption(field.id, i, e.target.value)}
                      className="flex-1 px-3 py-1 border dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-l focus:outline-none focus:ring-1 focus:ring-[#FD7B41]"
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addOption(field.id)}
                  className="mt-2 text-xs text-[#FD7B41] hover:underline"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {fields.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No custom fields added yet. Add a field above to start building your registration form.</p>
      )}
    </div>
  );
};

export default DynamicFormBuilder;

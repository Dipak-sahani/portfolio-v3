import React from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';

import axios from 'axios';
import { toast } from 'react-toastify';
import usePageBuilderStore from '../../../store/pageBuilder.store';
import { useNavigate } from 'react-router-dom';

const EditorLayout = () => {
    const { title, slug, content } = usePageBuilderStore();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            // Basic validation
            if (!title) {
                toast.error("Please enter a page title.");
                return;
            }
            if (!slug) {
                toast.error("Please enter a page slug.");
                return;
            }

            // TODO: Replace with actual API call service
            // For now, mocking the save
            console.log("Saving Page:", { title, slug, content });

            // Example Axios call (uncomment when backend is ready)
            // await axios.post('/api/builder/pages', { title, slug, content });

            toast.success("Page saved successfully!");
        } catch (error) {
            console.error("Save failed", error);
            toast.error("Failed to save page.");
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* Header / Toolbar */}
            <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">Page Builder</h1>
                    <div className="flex items-center gap-2 ml-4">
                        <button onClick={usePageBuilderStore.getState().undo} className="p-1 px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs" title="Undo">
                            Undo
                        </button>
                        <button onClick={usePageBuilderStore.getState().redo} className="p-1 px-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs" title="Redo">
                            Redo
                        </button>
                    </div>
                    {/* <input 
                type="text" 
                placeholder="Page Title" 
                className="border rounded px-2 py-1 text-sm"
                value={title}
                // onChange... 
              /> */}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate('/')} className="px-4 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">Exit</button>
                    <button onClick={handleSave} className="px-4 py-1 text-sm bg-[#FD7B41] text-white rounded hover:bg-[#e06a35]">Save Page</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <Canvas />
                <PropertiesPanel />
            </div>
        </div>
    );
};

export default EditorLayout;

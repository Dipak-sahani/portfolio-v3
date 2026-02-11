import React from 'react';
import usePageBuilderStore from '../../../store/pageBuilder.store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faFont, faImage, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import DataManager from './DataManager';

const Sidebar = () => {
    const { selectedNodeId, addNode } = usePageBuilderStore();

    const handleAddNode = (type) => {
        if (!selectedNodeId) {
            alert("Please select a container (Div) to add elements into.");
            return;
        }
        // TODO: Ideally we should check if the selected node can accept children (is a DIV)
        // For now assuming user selects a container or we might need a way to add to root.
        addNode(selectedNodeId, type);
    };

    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full p-4 flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Elements</h3>
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => handleAddNode('div')}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center transition-colors"
                >
                    <FontAwesomeIcon icon={faSquare} className="mb-2 text-[#FD7B41]" />
                    <span className="text-sm font-medium dark:text-gray-200">Container</span>
                </button>
                <button
                    onClick={() => handleAddNode('text')}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center transition-colors"
                >
                    <FontAwesomeIcon icon={faFont} className="mb-2 text-blue-500" />
                    <span className="text-sm font-medium dark:text-gray-200">Text</span>
                </button>
                <button
                    onClick={() => handleAddNode('image')}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center transition-colors"
                >
                    <FontAwesomeIcon icon={faImage} className="mb-2 text-green-500" />
                    <span className="text-sm font-medium dark:text-gray-200">Image</span>
                </button>
                <button
                    onClick={() => handleAddNode('button')}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center transition-colors"
                >
                    <FontAwesomeIcon icon={faMousePointer} className="mb-2 text-purple-500" />
                    <span className="text-sm font-medium dark:text-gray-200">Button</span>
                </button>
            </div>

            {/* Data Manager */}
            <DataManager />

            <div className="mt-auto p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-800 dark:text-yellow-200">
                <p><strong>Tip:</strong> Select a container on the canvas before adding an element.</p>
            </div>
        </div>
    );
};

export default Sidebar;

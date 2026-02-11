import React from 'react';
import usePageBuilderStore from '../../../store/pageBuilder.store';
import NodeRenderer from './NodeRenderer';

const Canvas = () => {
    const { content, selectNode } = usePageBuilderStore();

    const handleCanvasClick = () => {
        selectNode(null); // Deselect when clicking on empty canvas area
    };

    return (
        <div
            className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 overflow-auto h-full"
            onClick={handleCanvasClick}
        >
            <div
                className="min-h-[800px] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mx-auto max-w-4xl transition-all"
                onClick={(e) => e.stopPropagation()} // Prevent deselection when clicking inside the page area
            >
                {content.map((node) => (
                    <NodeRenderer key={node.id} node={node} />
                ))}

                {content.length === 0 && (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500">
                        Start by adding a block from the sidebar
                    </div>
                )}
            </div>
        </div>
    );
};

export default Canvas;

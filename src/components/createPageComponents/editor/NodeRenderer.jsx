import React from 'react';
import usePageBuilderStore from '../../../store/pageBuilder.store';

const NodeRenderer = ({ node }) => {
    const { selectedNodeId, selectNode } = usePageBuilderStore();

    const isSelected = selectedNodeId === node.id;

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent selecting parent when clicking child
        selectNode(node.id);
    };

    const commonStyles = {
        ...node.styles,
        outline: isSelected ? '2px solid #FD7B41' : '1px dashed transparent', // Visual cue for selection
        cursor: 'pointer',
        position: 'relative',
    };

    // Helper to render specific types
    const renderContent = () => {
        switch (node.type) {
            case 'text':
                return <p style={node.styles}>{node.properties.textContent}</p>;

            case 'image':
                return (
                    <img
                        src={node.properties.src || 'https://via.placeholder.com/150'}
                        alt={node.properties.alt || 'placeholder'}
                        style={{ ...node.styles, maxWidth: '100%' }}
                    />
                );

            case 'button':
                return (
                    <button style={node.styles}>
                        {node.properties.textContent || 'Click Me'}
                    </button>
                );

            case 'div':
            default:
                return (
                    <div style={commonStyles} onClick={handleClick}>
                        {/* Label for empty divs to make them visible/selectable */}
                        {node.children.length === 0 && <span className="text-xs text-gray-400 p-1 pointer-events-none">Empty Div</span>}

                        {node.children && node.children.map((child) => (
                            <NodeRenderer key={child.id} node={child} />
                        ))}
                    </div>
                );
        }
    };

    // For non-container elements, we wrap them to handle selection click
    if (node.type !== 'div') {
        return (
            <div style={{ display: 'inline-block', ...commonStyles }} onClick={handleClick}>
                {renderContent()}
            </div>
        )
    }

    return renderContent();
};

export default NodeRenderer;

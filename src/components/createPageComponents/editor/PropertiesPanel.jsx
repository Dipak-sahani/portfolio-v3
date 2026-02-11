import React, { useState } from 'react';
import usePageBuilderStore from '../../../store/pageBuilder.store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { uploadImage } from "../../../services/upload.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Section = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 px-2 flex items-center justify-between text-left text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
                <span>{title}</span>
                <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} className="text-xs text-gray-400" />
            </button>
            {isOpen && <div className="p-2 space-y-3 pb-4">{children}</div>}
        </div>
    );
};

const InputGroup = ({ label, children }) => (
    <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
        {children}
    </div>
);

const ColorPicker = ({ value, onChange }) => (
    <div className="flex items-center gap-2">
        <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0 p-0"
        />
        <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
        />
    </div>
);

const PropertiesPanel = () => {
    const { selectedNodeId, content, updateNode } = usePageBuilderStore();
    const [uploading, setUploading] = useState(false);

    const findNode = (nodes, id) => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findNode(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedNode = selectedNodeId ? findNode(content, selectedNodeId) : null;

    if (!selectedNode) {
        return (
            <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full p-4">
                <p className="text-gray-500 text-sm text-center mt-10">Select an element to edit properties</p>
            </div>
        );
    }

    const handleStyleChange = (key, value) => {
        updateNode(selectedNodeId, { styles: { [key]: value } });
    };

    const handlePropChange = (key, value) => {
        updateNode(selectedNodeId, { properties: { [key]: value } });
    };


    // ...

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadImage(file);
            updateNode(selectedNodeId, { properties: { src: imageUrl } });
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("Upload failed", error);
            // toast is already handled in service
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                    {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Properties
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-1">{selectedNode.id.slice(0, 8)}</p>
            </div>

            <div className="flex-1 overflow-y-auto">

                {/* Helper for text content */}
                {(selectedNode.type === 'text' || selectedNode.type === 'button') && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <InputGroup label="Text Content">
                            <textarea
                                rows={3}
                                value={selectedNode.properties.textContent || ''}
                                onChange={(e) => handlePropChange('textContent', e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                            />
                        </InputGroup>
                    </div>
                )}

                {/* Helper for Image Source */}
                {selectedNode.type === 'image' && (
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <InputGroup label="Image Source">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Enter Image URL"
                                    value={selectedNode.properties.src || ''}
                                    onChange={(e) => handlePropChange('src', e.target.value)}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                                />
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={uploading}
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className={`w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 border-dashed rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {uploading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faChevronDown} className="mr-2" />
                                                Upload Image
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </InputGroup>
                    </div>
                )}

                {/* 1. Layout Properties */}
                <Section title="Layout" defaultOpen={true}>
                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Display">
                            <select
                                value={selectedNode.styles.display || 'block'}
                                onChange={(e) => handleStyleChange('display', e.target.value)}
                                className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                            >
                                <option value="block">Block</option>
                                <option value="flex">Flex</option>
                                <option value="grid">Grid</option>
                                <option value="inline-block">Inline Block</option>
                                <option value="none">None</option>
                            </select>
                        </InputGroup>
                        <InputGroup label="Position">
                            <select
                                value={selectedNode.styles.position || 'static'}
                                onChange={(e) => handleStyleChange('position', e.target.value)}
                                className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs"
                            >
                                <option value="static">Static</option>
                                <option value="relative">Relative</option>
                                <option value="absolute">Absolute</option>
                                <option value="fixed">Fixed</option>
                            </select>
                        </InputGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Width">
                            <input type="text" value={selectedNode.styles.width || ''} onChange={(e) => handleStyleChange('width', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="auto" />
                        </InputGroup>
                        <InputGroup label="Height">
                            <input type="text" value={selectedNode.styles.height || ''} onChange={(e) => handleStyleChange('height', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="auto" />
                        </InputGroup>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Padding">
                            <input type="text" value={selectedNode.styles.padding || ''} onChange={(e) => handleStyleChange('padding', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="px/rem" />
                        </InputGroup>
                        <InputGroup label="Margin">
                            <input type="text" value={selectedNode.styles.margin || ''} onChange={(e) => handleStyleChange('margin', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="px/rem" />
                        </InputGroup>
                    </div>
                </Section>

                {/* 2. Flexbox Props (Conditionally shown ideally, but showing all for simplicity/user request) */}
                {selectedNode.styles.display === 'flex' && (
                    <Section title="Flexbox" defaultOpen={true}>
                        <div className="grid grid-cols-2 gap-2">
                            <InputGroup label="Direction">
                                <select value={selectedNode.styles.flexDirection || 'row'} onChange={(e) => handleStyleChange('flexDirection', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                    <option value="row">Row</option>
                                    <option value="column">Column</option>
                                    <option value="row-reverse">Row Reverse</option>
                                    <option value="column-reverse">Col Reverse</option>
                                </select>
                            </InputGroup>
                            <InputGroup label="Wrap">
                                <select value={selectedNode.styles.flexWrap || 'nowrap'} onChange={(e) => handleStyleChange('flexWrap', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                    <option value="nowrap">No Wrap</option>
                                    <option value="wrap">Wrap</option>
                                </select>
                            </InputGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <InputGroup label="Justify Content">
                                <select value={selectedNode.styles.justifyContent || 'flex-start'} onChange={(e) => handleStyleChange('justifyContent', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                    <option value="flex-start">Start</option>
                                    <option value="center">Center</option>
                                    <option value="flex-end">End</option>
                                    <option value="space-between">Space Between</option>
                                    <option value="space-around">Space Around</option>
                                </select>
                            </InputGroup>
                            <InputGroup label="Align Items">
                                <select value={selectedNode.styles.alignItems || 'stretch'} onChange={(e) => handleStyleChange('alignItems', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                    <option value="stretch">Stretch</option>
                                    <option value="flex-start">Start</option>
                                    <option value="center">Center</option>
                                    <option value="flex-end">End</option>
                                </select>
                            </InputGroup>
                        </div>
                        <InputGroup label="Gap">
                            <input type="text" value={selectedNode.styles.gap || ''} onChange={(e) => handleStyleChange('gap', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" />
                        </InputGroup>
                    </Section>
                )}

                {/* 3. Typography */}
                <Section title="Typography">
                    <InputGroup label="Color">
                        <ColorPicker value={selectedNode.styles.color} onChange={(val) => handleStyleChange('color', val)} />
                    </InputGroup>
                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Font Size">
                            <input type="text" value={selectedNode.styles.fontSize || ''} onChange={(e) => handleStyleChange('fontSize', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" style={{ minWidth: 0 }} />
                        </InputGroup>
                        <InputGroup label="Font Weight">
                            <select value={selectedNode.styles.fontWeight || 'normal'} onChange={(e) => handleStyleChange('fontWeight', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                                <option value="300">Light</option>
                                <option value="600">Semibold</option>
                                <option value="800">Extra Bold</option>
                            </select>
                        </InputGroup>
                    </div>
                    <InputGroup label="Text Align">
                        <select value={selectedNode.styles.textAlign || 'left'} onChange={(e) => handleStyleChange('textAlign', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                            <option value="justify">Justify</option>
                        </select>
                    </InputGroup>
                </Section>

                {/* 4. Background */}
                <Section title="Background">
                    <InputGroup label="Color">
                        <ColorPicker value={selectedNode.styles.backgroundColor} onChange={(val) => handleStyleChange('backgroundColor', val)} />
                    </InputGroup>
                    <InputGroup label="Image URL">
                        <input type="text" value={selectedNode.styles.backgroundImage?.replace('url(', '').replace(')', '') || ''} onChange={(e) => handleStyleChange('backgroundImage', `url(${e.target.value})`)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" />
                    </InputGroup>
                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Size">
                            <select value={selectedNode.styles.backgroundSize || 'auto'} onChange={(e) => handleStyleChange('backgroundSize', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                <option value="auto">Auto</option>
                                <option value="cover">Cover</option>
                                <option value="contain">Contain</option>
                            </select>
                        </InputGroup>
                        <InputGroup label="Position">
                            <select value={selectedNode.styles.backgroundPosition || 'center'} onChange={(e) => handleStyleChange('backgroundPosition', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                <option value="center">Center</option>
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </InputGroup>
                    </div>
                </Section>

                {/* 5. Borders */}
                <Section title="Border">
                    <div className="grid grid-cols-2 gap-2">
                        <InputGroup label="Width">
                            <input type="text" value={selectedNode.styles.borderWidth || ''} onChange={(e) => handleStyleChange('borderWidth', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="px" />
                        </InputGroup>
                        <InputGroup label="Style">
                            <select value={selectedNode.styles.borderStyle || 'none'} onChange={(e) => handleStyleChange('borderStyle', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                                <option value="none">None</option>
                                <option value="solid">Solid</option>
                                <option value="dashed">Dashed</option>
                                <option value="dotted">Dotted</option>
                            </select>
                        </InputGroup>
                    </div>
                    <InputGroup label="Color">
                        <ColorPicker value={selectedNode.styles.borderColor} onChange={(val) => handleStyleChange('borderColor', val)} />
                    </InputGroup>
                    <InputGroup label="Radius">
                        <input type="text" value={selectedNode.styles.borderRadius || ''} onChange={(e) => handleStyleChange('borderRadius', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs" placeholder="px/rem" />
                    </InputGroup>
                </Section>

                {/* 6. Effects */}
                <Section title="Effects">
                    <InputGroup label="Opacity">
                        <input
                            type="range"
                            min="0" max="1" step="0.1"
                            value={selectedNode.styles.opacity || '1'}
                            onChange={(e) => handleStyleChange('opacity', e.target.value)}
                            className="w-full"
                        />
                        <div className="text-right text-xs text-gray-500">{selectedNode.styles.opacity || 1}</div>
                    </InputGroup>
                    <InputGroup label="Cursor">
                        <select value={selectedNode.styles.cursor || 'auto'} onChange={(e) => handleStyleChange('cursor', e.target.value)} className="w-full p-1.5 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white text-xs">
                            <option value="auto">Auto</option>
                            <option value="pointer">Pointer</option>
                            <option value="text">Text</option>
                            <option value="move">Move</option>
                            <option value="not-allowed">Not Allowed</option>
                        </select>
                    </InputGroup>
                </Section>


            </div>

            <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => usePageBuilderStore.getState().deleteNode(selectedNodeId)}
                    className="w-full py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors text-sm font-medium"
                >
                    Delete Component
                </button>
            </div>
        </div>
    );
};

export default PropertiesPanel;

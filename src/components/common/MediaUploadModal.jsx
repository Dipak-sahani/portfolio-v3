import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloudUploadAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ImagePreview from '../ImagePrev/ImagePreview';

const MediaUploadModal = ({ isOpen, onClose, onUpload, title, aspectRatio = "video" }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            await onUpload(file);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFile(null);
        setPreview(null);
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className={`relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 group ${!preview ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : ''}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />

                                {preview ? (
                                    <div className={`w-full ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'} relative`}>
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-medium"><FontAwesomeIcon icon={faCloudUploadAlt} /> Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`w-full ${aspectRatio === 'square' ? 'aspect-square' : 'aspect-video'} flex flex-col items-center justify-center text-gray-400`}>
                                        <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl mb-2" />
                                        <p className="text-sm font-medium">Click to upload image</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!file || loading}
                                className="mt-6 w-full py-2 bg-[#FD7B41] text-white rounded-xl font-bold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <FontAwesomeIcon icon={faSpinner} spin />}
                                {loading ? 'Uploading...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default MediaUploadModal;

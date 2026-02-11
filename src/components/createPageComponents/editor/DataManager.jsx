import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDatabase } from '@fortawesome/free-solid-svg-icons';

const DataManager = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [datasets, setDatasets] = useState([]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                // For simplicity, we'll try to parse CSV here or just send raw JSON if we can.
                // In a real app, use 'xlsx' library to parse Excel to JSON on client side
                // OR send file to backend using FormData.
                // Here, let's assume valid JSON for the prototype or CSV parsing logic.

                // Mocking CSV to JSON for demo purposes if it's a simple text file
                // In production: import * as XLSX from 'xlsx'; const wb = XLSX.read(data)...

                // For now, let's just simulate an upload successful call
                // const formData = new FormData();
                // formData.append('file', file);

                // await axios.post('/api/builder/datasets/upload', formData); // if backend handles file

                // let's assume we parse it to JSON
                const mockData = [
                    { id: 1, name: "Product A", price: 100 },
                    { id: 2, name: "Product B", price: 200 }
                ];

                await axios.post('/api/builder/datasets', {
                    name: file.name,
                    data: mockData,
                    columns: ["id", "name", "price"]
                });

                toast.success("Dataset uploaded successfully!");
                setIsOpen(false);
            } catch (error) {
                console.error("Upload failed", error);
                toast.error("Failed to upload dataset.");
            } finally {
                setUploading(false);
            }
        };

        reader.readAsText(file);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex flex-col items-center justify-center transition-colors mt-2 w-full"
            >
                <FontAwesomeIcon icon={faDatabase} className="mb-2 text-indigo-500" />
                <span className="text-sm font-medium dark:text-gray-200">Data</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-xl">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Manage Data</h2>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Excel/CSV
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FontAwesomeIcon icon={faUpload} className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLSX</p>
                                </div>
                                <input type="file" className="hidden" accept=".csv, .xlsx" onChange={handleFileUpload} disabled={uploading} />
                            </label>
                            {uploading && <p className="text-sm text-blue-500 mt-2 text-center">Uploading and parsing...</p>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataManager;

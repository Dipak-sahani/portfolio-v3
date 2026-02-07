import React, { useState } from 'react';
import { createReport } from '../../services/report.service';

const ReportModal = ({ isOpen, onClose, targetId, targetType }) => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason) return;

        setLoading(true);
        try {
            await createReport({ targetId, targetType, reason, description });
            onClose();
            setReason('');
            setDescription('');
        } catch (error) {
            // Error handled in service
        } finally {
            setLoading(false);
        }
    };

    const reasons = [
        "Spam",
        "Harassment or bullying",
        "Hate speech",
        "Violence",
        "Nudity or sexual activity",
        "False information",
        "Scam or fraud",
        "Other"
    ];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Report {targetType}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Why are you reporting this?
                        </label>
                        <div className="space-y-2">
                            {reasons.map((r) => (
                                <label key={r} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="text-[#FD7B41] focus:ring-[#FD7B41]"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{r}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Additional Details (Optional)
                        </label>
                        <textarea
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#FD7B41] focus:border-[#FD7B41] bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                            placeholder="Provide more context..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD7B41]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!reason || loading}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!reason || loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#FD7B41] hover:bg-[#e06a35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD7B41]'
                                }`}
                        >
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;

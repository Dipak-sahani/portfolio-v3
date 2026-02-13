import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StartupProfile from './StartupProfile';
import { useStartupStore } from '../../store/startup.store';

const StartupDetailsPage = () => {
    const { id } = useParams();
    const { currentStartup, getStartupDetails, isLoading } = useStartupStore();

    useEffect(() => {
        if (id) {
            getStartupDetails(id);
        }
    }, [id, getStartupDetails]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FD7B41]"></div>
            </div>
        );
    }

    if (!currentStartup) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-500">
                Startup not found.
            </div>
        );
    }

    return (
        <div>
            <StartupProfile startupData={currentStartup} isUser={false} />
        </div>
    );
};

export default StartupDetailsPage;

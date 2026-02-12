import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../../services/auth.service';
import { toast } from 'react-toastify';

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await API.get(`/users/verify-email/${token}`);
                if (res.data.success || res.status === 200) {
                    setStatus('success');
                    toast.success("Email verified successfully!");
                    setTimeout(() => navigate('/auth'), 3000);
                }
            } catch (error) {
                console.error(error);
                setStatus('error');
                toast.error(error.response?.data?.message || "Verification failed");
            }
        };
        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-[#3C4044] dark:text-gray-200 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-[#FD7B41] border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
                        <p className="text-gray-500">Please wait while we verify your email address.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="animate-fadeIn">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                        <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                        <p className="text-gray-500 mb-6">Your account has been successfully verified. Redirecting to login...</p>
                        <button onClick={() => navigate('/auth')} className="bg-[#FD7B41] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3C4044] transition-colors">
                            Go to Login
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-fadeIn">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✕</div>
                        <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                        <p className="text-gray-500 mb-6">The verification link is invalid or has expired.</p>
                        <button onClick={() => navigate('/auth')} className="text-[#FD7B41] font-semibold hover:underline">
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailPage;

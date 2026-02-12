import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../../services/auth.service';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return toast.warn("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
        }

        setLoading(true);
        try {
            await API.post(`/users/reset-password/${token}`, { newPassword });
            toast.success("Password reset successfully! Logic in now.");
            setTimeout(() => navigate('/auth'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-[#3C4044] dark:text-gray-200 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-2 text-[#FD7B41]">Reset Password</h2>
                <p className="text-gray-500 mb-6">Enter your new password below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">New Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#FD7B41] outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#FD7B41] outline-none transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FD7B41] text-white py-3 rounded-xl font-bold hover:bg-[#3C4044] transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/auth" className="text-sm font-bold text-gray-400 hover:text-[#FD7B41] transition-colors">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

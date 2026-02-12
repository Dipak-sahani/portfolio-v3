import React, { useState } from 'react';
import { API } from '../../services/auth.service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/users/forgot-password', { email });
            setSent(true);
            toast.success("Password reset email sent!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-[#3C4044] dark:text-gray-200 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-4 text-[#FD7B41]">Forgot Password?</h2>

                {!sent ? (
                    <>
                        <p className="text-gray-500 mb-6">Enter your email address to receive a password reset link.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-[#FD7B41] outline-none transition-colors"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FD7B41] text-white py-3 rounded-xl font-bold hover:bg-[#3C4044] transition-colors disabled:opacity-70"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center animate-fadeIn">
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✉️</div>
                        <h3 className="text-xl font-bold mb-2">Check your email</h3>
                        <p className="text-gray-500 mb-6">We've sent a password reset link to <strong>{email}</strong>.</p>
                        <button onClick={() => setSent(false)} className="text-[#FD7B41] font-semibold hover:underline">
                            Resend email
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link to="/auth" className="text-sm font-bold text-gray-400 hover:text-[#FD7B41] transition-colors">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

import React, { useState, useEffect } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";
import { useContacts } from "../../store/contactSelection.store";
import { useAuthStore } from "../../store/auth.store";
import socket from "../../app/socket";
import { toast } from "react-toastify";
import { getContact } from "../../services/message.service";

const ShareModal = ({ isOpen, onClose, title, url, content }) => {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState("external"); // 'external' or 'internal'
    const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const { user } = useAuthStore();

    // We need to fetch contacts if not available in store, but simpler to use getContact service directly/via store
    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(false);

    useEffect(() => {
        if (activeTab === "internal" && contacts.length === 0) {
            const fetchContacts = async () => {
                setLoadingContacts(true);
                try {
                    const res = await getContact();
                    setContacts(res || []);
                } catch (error) {
                    console.error("Failed to load contacts", error);
                } finally {
                    setLoadingContacts(false);
                }
            };
            fetchContacts();
        }
    }, [activeTab]);

    const handleInternalShare = async () => {
        if (!selectedContact) return;
        setSending(true);

        try {
            if (!socket.connected) {
                socket.connect();
            }

            const messagePayload = {
                conversationId: selectedContact.conversationId,
                receiverId: selectedContact.user._id, // Assuming structure
                content: `${message}\n\nCheck this out: ${title}\n${url}`,
                senderId: user._id,
                type: "text",
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            socket.emit("send_message", messagePayload);
            toast.success("Shared successfully!");
            onClose();
        } catch (error) {
            console.error("Share failed", error);
            toast.error("Failed to share.");
        } finally {
            setSending(false);
        }
    };

    const shareUrl = url || window.location.href;
    const shareTitle = title || "Check this out on Berojgar Founder";

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Share</h2>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                        className={`flex-1 py-2 text-sm font-medium text-center ${activeTab === "external"
                            ? "text-[#FD7B41] border-b-2 border-[#FD7B41]"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                        onClick={() => setActiveTab("external")}
                    >
                        Social Apps
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-medium text-center ${activeTab === "internal"
                            ? "text-[#FD7B41] border-b-2 border-[#FD7B41]"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                        onClick={() => setActiveTab("internal")}
                    >
                        Send to Connection
                    </button>
                </div>

                {/* Content */}
                <div className="min-h-[200px]">
                    {activeTab === "external" ? (
                        <div className="flex flex-col gap-6 py-4">
                            <div className="flex justify-around items-center">
                                <div className="flex flex-col items-center space-y-2">
                                    <WhatsappShareButton url={shareUrl} title={shareTitle} separator=":: ">
                                        <WhatsappIcon size={48} round />
                                    </WhatsappShareButton>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <FacebookShareButton url={shareUrl} quote={shareTitle}>
                                        <FacebookIcon size={48} round />
                                    </FacebookShareButton>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Facebook</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <TwitterShareButton url={shareUrl} title={shareTitle}>
                                        <TwitterIcon size={48} round />
                                    </TwitterShareButton>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Twitter</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <LinkedinShareButton url={shareUrl} title={shareTitle} summary={content} source="Berojgar Founder">
                                        <LinkedinIcon size={48} round />
                                    </LinkedinShareButton>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">LinkedIn</span>
                                </div>
                            </div>

                            {/* Copy Link Section */}
                            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                <input
                                    type="text"
                                    readOnly
                                    value={shareUrl}
                                    className="flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-300 focus:outline-none"
                                />
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareUrl);
                                        toast.success("Link copied!");
                                    }}
                                    className="text-sm font-bold text-[#FD7B41] hover:text-[#e06a35] px-2"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {loadingContacts ? (
                                <div className="text-center py-4 text-gray-500">Loading contacts...</div>
                            ) : contacts.length > 0 ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Contact</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#FD7B41] focus:border-[#FD7B41] bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                                            onChange={(e) => {
                                                const contact = contacts.find(c => c.user._id === e.target.value);
                                                setSelectedContact(contact);
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Choose a connection...</option>
                                            {contacts.map((contact) => (
                                                <option key={contact.user?._id} value={contact.user?._id}>
                                                    {contact.user?.fullName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message (Optional)</label>
                                        <textarea
                                            rows="2"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#FD7B41] focus:border-[#FD7B41] bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm"
                                            placeholder="Add a note..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4 text-gray-500">No connections found.</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD7B41]"
                    >
                        Close
                    </button>
                    {activeTab === "internal" && (
                        <button
                            onClick={handleInternalShare}
                            disabled={!selectedContact || sending}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${!selectedContact || sending
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#FD7B41] hover:bg-[#e06a35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD7B41]'
                                }`}
                        >
                            {sending ? 'Sending...' : 'Send'}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ShareModal;

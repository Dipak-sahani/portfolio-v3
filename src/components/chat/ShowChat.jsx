import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVideo,
  faEllipsisV,
  faCheck,
  faPaperPlane,
  faPlus,
  faImage,
  faPaperclip,
  faMicrophone,
  faComments,
  faUserFriends,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { getMessagesByConversation } from "../../services/message.service";
import { useAuthStore } from "../../store/auth.store";
import socket from "../../app/socket";
import { useParams, useNavigate } from "react-router-dom";
import { useContacts } from "../../store/contactSelection.store";
import { useCallback } from "react";
import { toast } from "react-toastify";

const LIMIT = 10;

const ChatArea = ({ activeContact }) => {
  const user = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [isOnlineUser, setIsUserOnline] = useState(false);
  const [statusColor, setStatusColor] = useState("bg-gray-400");
  const [statusText, setStatusText] = useState("Offline");
  const [newMessages, setNewMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const selectedContact = useContacts((state) => state.selectedContact);
  // console.log(selectedContact);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  /* ---------------- SOCKET CONNECTION ---------------- */

  const handleNewMessage = (d) => {
    // console.log("New message:", d);
    // console.log("Nww, ", d?.message);

    if (d.message.senderId === user._id) return;

    setMessages((prevMessages) => [...prevMessages, d?.message]);
    setIsUserOnline(d?.status);
    // console.log(isOnlineUser, "hhhhhh");

    // Scroll to bottom
    scrollToBottom();
    // console.log(messages);
  };

  const handleOnlineUser = (d) => {
    // console.log(d);
    setIsUserOnline(d?.status);
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      console.log("✅ Connected:", socket.id);
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("❌ Disconnected");
      setIsConnected(false);
    };

    const onNewMessage = (data) => {
      if (!data?.message) return;

      // ignore own message
      if (data.message.senderId === user._id) return;

      setMessages((prev) => [...prev, data.message]);
      setIsUserOnline(data?.status || false);
    };

    const onOnlineStatus = (data) => {
      setIsUserOnline(data?.status || false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new_message", onNewMessage);
    socket.on("ReceiverInRoom", onOnlineStatus);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new_message", onNewMessage);
      socket.off("ReceiverInRoom", onOnlineStatus);

      // ❌ DO NOT disconnect here
      // Let socket stay alive globally
    };
  }, [user._id]);





  /* ---------------- FETCH MESSAGES ---------------- */

  useEffect(() => {
    if (!selectedContact?.conversationId) return;

    socket.emit("join_conversation", {
      conversationId: selectedContact.conversationId,
    });

    console.log("📥 Joined room");

    return () => {
      socket.emit("leave_conversation", {
        conversationId: selectedContact.conversationId,
      });

      console.log("📤 Left room");
    };
  }, [selectedContact?.conversationId]);

  /* ---------------- SEND MESSAGE ---------------- */

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!socket.connected) return;

    const tempMessage = {
      _id: Date.now(), // temporary id
      conversationId: selectedContact?.conversationId || null,
      receiverId: selectedContact?.id,
      senderId: user._id,
      content: newMessage,
      createdAt: new Date(),
      status: "sending", // optional
    };

    // ✅ 1️⃣ Add immediately to UI
    setMessages((prev) => [...prev, tempMessage]);

    // clear input
    setNewMessage("");

    // ✅ 2️⃣ Emit to backend
    socket.emit("send_message", tempMessage);
  };




  // ===============================
  // presence ping
  // ===============================

  useEffect(() => {
    if (!socket || !socket.connected) return;

    const interval = setInterval(() => {
      socket.emit("presence_ping");
    }, 25000); // 25s heartbeat

    return () => clearInterval(interval);
  }, [socket.connected]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  /* ---------------- STATUS HELPERS ---------------- */

  const getStatus = () => {
    if (isOnlineUser) {
      setStatusColor("bg-green-500");
      setStatusText("Online");
    } else {
      setStatusColor("bg-gray-400");
      setStatusText("Offline");
    }
  };

  useEffect(() => {
    getStatus();
  }, [isOnlineUser]);

  /* ---------------- EMPTY STATE ---------------- */

  if (!selectedContact) {
    return (
      <div className="hidden md:flex md:w-3/4 flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <FontAwesomeIcon
          icon={faUserFriends}
          className="text-6xl text-gray-400 dark:text-gray-600"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-700 dark:text-gray-300">
          Select a conversation
        </h2>
      </div>
    );
  }

  ///// formate time
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /// date formate

  const formatDateOnly = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const value = Math.floor(seconds / intervals[key]);
      if (value >= 1) return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }

    return "just now";
  };

  // get date helper

  const getDateLabel = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";

    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ---------------- auto reload data ---------------- */

  const containerRef = useRef(null);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages(true);
  }, [selectedContact?.conversationId]);

  const loadMessages = useCallback(
    async (isInitial = false) => {
      if (loading) return;

      const conversationId = selectedContact?.conversationId;
      if (!conversationId) return;

      setLoading(true);

      try {
        const res = await getMessagesByConversation(
          conversationId,
          LIMIT,
          isInitial ? 0 : skip,
        );

        if (res?.messages?.length) {
          setMessages((prev) =>
            isInitial ? res.messages : [...res.messages, ...prev],
          );
          setSkip((prev) => prev + LIMIT);
          setHasMore(res.hasMore);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [selectedContact, loading, skip, hasMore],
  );

  // 🔥 AUTO CALL WHEN TOP REACHED
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || loading || !hasMore) return;

    if (container.scrollTop === 0) {
      loadMessages();
    }
  };

  const isUserNearBottom = () => {
    const container = containerRef.current;
    if (!container) return false;

    return (
      container.scrollHeight - container.scrollTop - container.clientHeight <
      120 // px threshold
    );
  };

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
    if (!isUserNearBottom()) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   if (skip > LIMIT) {
  //     container.scrollTop = container.scrollHeight * 0.3;
  //   }
  // }, [messages]);

  return (
    <div
      className=" w-full flex flex-col h-full bg-gray-50 dark:bg-gray-900"
      style={{
        backgroundImage: "url('/images/chatbg.png')",
        backgroundBlendMode: "overlay"
      }}
    >
      {/* Header */}
      <div className="p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center sticky transition-colors">
        <div
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (selectedContact?.id) {
              navigate(`/profile/${selectedContact.id}`);
            }
          }}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold overflow-hidden">
            {/* If avatar is URL, show img, else text */}
            {(selectedContact.avatar && selectedContact.avatar.length > 2) ? (
              <img src={selectedContact.avatar?.startsWith("http") ? selectedContact.avatar : `${import.meta.env.VITE_IMG_CDN}/${selectedContact.avatar}`} alt={selectedContact.name} className="w-full h-full object-cover" />
            ) : (
              selectedContact.avatar
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 hover:underline">{selectedContact.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1 ${statusColor}`}
              />
              {statusText}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <button className="icon-btn hover:text-gray-700 dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button className="icon-btn hover:text-gray-700 dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faVideo} />
          </button>
          <button className="icon-btn hover:text-gray-700 dark:hover:text-gray-200">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: "600px",
          overflowY: "auto",
        }}
        className="relative border border-gray-200 dark:border-gray-700"
      >
        {loading && <p style={{ textAlign: "center" }} className="text-gray-500 dark:text-gray-400">Loading...</p>}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scroll inset-0 bg-cover bg-center z-50 p-4">
          {messages?.map((msg, i) => {
            const currentDate = new Date(msg.createdAt).toDateString();
            const prevDate =
              i > 0 ? new Date(messages[i - 1].createdAt).toDateString() : null;

            const showDateLine = currentDate !== prevDate;
            const isMe = msg.senderId === user._id;

            return (
              <div key={msg._id}>
                {showDateLine && (
                  <div
                    className="flex justify-center py-4"
                  >
                    <span className="px-4 py-1 text-xs text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-full">
                      {getDateLabel(msg.createdAt)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex pb-3 z-10 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-md z-10 shadow-sm ${isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700"
                      }`}
                  >
                    {msg.content}
                    <div className={`text-xs mt-1 text-right opacity-70 ${isMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                      {msg?.createdAt ? (
                        <span> {formatTime(msg.createdAt)}</span>
                      ) : (
                        <span>{msg?.time}</span>
                      )}
                      {isMe && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="ml-1 text-xs"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* <div className="flex-auto"></div> */}

      {/* Input */}
      <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700 flex-auto transition-colors">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />

          <button
            type="submit"
            className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;

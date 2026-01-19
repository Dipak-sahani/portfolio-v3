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
import { useParams } from "react-router-dom";

const ChatArea = ({ activeContact }) => {
  const user = useAuthStore((state) => state.user);

  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { id } = useParams();
  console.log(id);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  /* ---------------- SOCKET CONNECTION ---------------- */

  const handleNewMessage = (d) => {
    console.log("New message:", d);
    // console.log("Nww, ", d?.message);

    if (d.message.senderId === user._id) return;

    setMessages((prevMessages) => [...prevMessages, d?.message]);

    // Scroll to bottom
    scrollToBottom();
    // console.log(messages);
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.off("new_message", handleNewMessage);
    socket.on("new_message", handleNewMessage);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new_message", handleNewMessage);
      // 🔥 disconnect ONLY when chat page unmounts
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!activeContact?.conversationId) return;
    if (!socket.connected) return;

    socket.emit("join_conversation", {
      conversationId: activeContact.conversationId,
    });
  }, [activeContact, isConnected]);

  /* ---------------- FETCH MESSAGES ---------------- */

  useEffect(() => {
    if (!activeContact?.conversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await getMessagesByConversation(
          activeContact.conversationId,
        );
        setMessages(res || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [activeContact]);

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    if (!socket.connected) {
      console.error("Socket not connected");
      return;
    }

    const messagePayload = {
      conversationId: activeContact?.conversationId,
      receiverId: id,
      content: newMessage,
      senderId: user._id,
      type: "text",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, messagePayload]);
    setNewMessage("");

    socket.emit("send_message", messagePayload);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  /* ---------------- STATUS HELPERS ---------------- */

  const getStatusColor = (status) => {
    if (status === "online") return "bg-green-500";
    if (status === "away") return "bg-yellow-500";
    return "bg-gray-400";
  };

  const getStatusText = (status) => {
    if (status === "online") return "Online";
    if (status === "away") return "Away";
    return "Offline";
  };

  /* ---------------- EMPTY STATE ---------------- */

  if (!activeContact) {
    return (
      <div className="hidden md:flex md:w-3/4 flex-col items-center justify-center bg-gray-50">
        <FontAwesomeIcon
          icon={faUserFriends}
          className="text-6xl text-gray-400"
        />
        <h2 className="mt-4 text-xl font-bold text-gray-700">
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

  /* ---------------- UI ---------------- */

  return (
    <div className=" w-full flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
            {activeContact.avatar}
          </div>
          <div className="ml-3">
            <h3 className="font-bold">{activeContact.name}</h3>
            <p className="text-sm text-gray-500">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1 ${getStatusColor(
                  activeContact.status,
                )}`}
              />
              {getStatusText(activeContact.status)}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 text-gray-500">
          <button className="icon-btn">
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button className="icon-btn">
            <FontAwesomeIcon icon={faVideo} />
          </button>
          <button className="icon-btn">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages?.map((msg, i) => {
          const currentDate = new Date(msg.createdAt).toDateString();
          const prevDate =
            i > 0
              ? new Date(messages[i - 1].createdAt).toDateString()
              : null;

          const showDateLine = currentDate !== prevDate;
          const isMe = msg.senderId === user._id;

          return (
            <div key={msg._id}>
              {showDateLine && (
                <div className="flex justify-center my-4">
                  <span className="px-4 py-1 text-xs text-gray-500 bg-gray-200 rounded-full">
                    {getDateLabel(msg.createdAt)}
                  </span>
                </div>
              )}
              <div
                className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-md ${
                    isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-green-600 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                  <div className="text-xs mt-1 text-right opacity-70">
                   { msg?.createdAt? <span> {formatTime(msg.createdAt)}</span>: <span>{msg?.time}</span> }
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

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;

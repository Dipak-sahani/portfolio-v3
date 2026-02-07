import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import socket from "../../app/socket";
import { getAuthToken } from "../../services/auth.service";

// Assumptions:
// - Parent passes `selectedUserId`
// - Auth token already available (optional)
// - Socket.IO backend supports joinChat, leaveChat, sendMessage, typing, stopTyping


export default function ChatDisplayPage({ selectedUserId, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);
  const bottomRef = useRef(null);

  // Connect socket once
  useEffect(() => {
    // 🔄 Update token before connecting (in case user just logged in)
    const token = getAuthToken();
    if (token) {
      socket.auth = { token };
    }

    if (!socket.connected) socket.connect();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", ({ from }) => {
      if (from === selectedUserId) setIsTyping(true);
    });

    socket.on("stopTyping", ({ from }) => {
      if (from === selectedUserId) setIsTyping(false);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [selectedUserId]);

  // Join / leave chat room when selection changes
  useEffect(() => {
    if (!selectedUserId) return;

    socket.emit("joinChat", { userId: selectedUserId });

    return () => {
      socket.emit("leaveChat", { userId: selectedUserId });
      setMessages([]);
      setIsTyping(false);
    };
  }, [selectedUserId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!selectedUserId) return;

    socket.emit("typing", { to: selectedUserId });

    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      socket.emit("stopTyping", { to: selectedUserId });
    }, 1200);
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedUserId) return;

    const payload = {
      to: selectedUserId,
      from: currentUserId,
      text: input.trim(),
      createdAt: Date.now(),
    };

    socket.emit("send_message", payload);
    socket.emit("stopTyping", { to: selectedUserId });

    setMessages((prev) => [...prev, payload]);
    setInput("");
  };

  if (!selectedUserId) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] rounded px-3 py-2 text-sm ${m.from === currentUserId
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-900"
              }`}
          >
            {m.text}
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-gray-400">Typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 rounded border px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

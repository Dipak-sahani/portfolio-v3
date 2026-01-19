import React, { useState } from "react";
import socket from "../../app/socket";

export function MyForm(data) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log(data);
  
  const onSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    if (!socket.connected) {
      setError("Not connected to server");
      return;
    }

    setIsLoading(true);
    setError(null);

    socket
      .timeout(5000)
      .emit("send_message", {receiverId:data?.data, content:value, type:"text"}, (err, response) => {
        setIsLoading(false);

        if (err) {
          setError("Server timeout. Try again.");
          return;
        }

        setValue("");
      });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 p-4 border-t border-gray-200 bg-white"
    >
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        disabled={isLoading}
        className="
          flex-1
          rounded-full
          border border-gray-300
          px-4 py-2
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100
        "
      />

      {/* Send Button */}
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="
          rounded-full
          bg-blue-600
          px-4 py-2
          text-sm font-medium text-white
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:bg-blue-300
          transition
        "
      >
        {isLoading ? "Sending..." : "Send"}
      </button>

      {/* Error */}
      {error && (
        <p className="absolute bottom-14 left-4 text-xs text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}

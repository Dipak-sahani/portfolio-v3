import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationPopup from "./NotificationPopup";

const NotificationBell = ({
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* 🔔 Bell */}
      <div
        className="w-14 h-14 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#EDBF9B]/40"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBell} className="w-14 h-14 text-[#3C4044]" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 text-xs font-bold bg-black text-[#FD7B41] border-2 border-white rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* 📦 Popup */}
      {open && (
        <NotificationPopup
          notifications={notifications}
          onMarkRead={onMarkRead}
          onMarkAllRead={onMarkAllRead}
        />
      )}
    </div>
  );
};

export default NotificationBell;

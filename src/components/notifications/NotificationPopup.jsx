import dayjs from "dayjs";
import NotificationCard from "./NotificationCard";

const NotificationPopup = ({
  notifications = [],
  onMarkRead,
  onMarkAllRead,
}) => {
  return (
    <div className="absolute right-0 mt-3 w-96 bg-[#DDDCDB] rounded-xl shadow-xl border border-[#EDBF9B] z-50">
      
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#EDBF9B]">
        <h3 className="text-[#3C4044] font-semibold text-lg">
          Notifications
        </h3>

        <button
          onClick={onMarkAllRead}
          className="text-sm text-[#FD7B41] font-medium hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* 🔹 Notification List */}
      <div className="max-h-100 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-[#3C4044] opacity-70">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n._id}
              notification={n}
              onMarkRead={onMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;

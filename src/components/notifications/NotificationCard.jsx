import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

const NotificationCard = ({ notification, onMarkRead }) => {
  const isUnread = !notification.isRead;
  const actorName =
  notification?.actor?.type === "USER"
    ? notification?.actor?.userId?.fullName
    : notification?.actor?.name;

  return (
    <div
      className={`px-4 py-3 border-b border-[#EDBF9B] flex gap-3 ${
        isUnread ? "bg-[#EDBF9B]/40" : "bg-transparent"
      }`}
    >
      {/* 🔔 Dot */}
      {isUnread && (
        <span className="mt-2 w-2 h-2 bg-[#221a16] rounded-full shrink-0" />
      )}

      {/* 📄 Content */}
      <div className="flex-1">
        <div className=" flex justify-between">
            <p className="text-[#3C4044] text-sm font-medium">
         {notification.title}
          
        </p>

            <div className="font-medium flex justify-center items-center ">
   <FontAwesomeIcon icon={faUser} className="bg-[#EDBF9B] rounded-full p-2 "/> <span className="px-1"> {actorName}</span> 
</div>
        </div>
        
        <p className="text-[#3C4044] text-xs opacity-80 mt-1">
          {notification.message}
        </p>

        

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[#3C4044] opacity-60">
            {dayjs(notification.createdAt).format("DD MMM, hh:mm A")}
          </span>

          {!notification.isRead && (
            <button
              onClick={() => onMarkRead(notification._id)}
              className="text-xs text-[#FD7B41] hover:underline hover:text-red-500"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

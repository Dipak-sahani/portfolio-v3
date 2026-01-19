import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getMyNotifications, markAllReadAPI, markNotificationReadAPI } from "../services/notification.service.js";

export const useNotificationStore = create(
  persist(
    (set) => ({
      notifications: [],

      fetchNotification: async () => {
        try {
          const res = await getMyNotifications();

          set({
            notifications: res || [],
          });
        } catch (error) {
          console.error("Fetch notification error:", error);
        }
      },



      markNotificationRead: async (id) => {
        try {
          await markNotificationReadAPI(id);

          set((state) => ({
            notifications: state.notifications.map((n) =>
              n._id === id ? { ...n, isRead: true } : n
            ),
          }));
        } catch (err) {
          console.error(err);
        }
      },

      // ✅ mark all as read
      markAllRead: async () => {
        try {
          await markAllReadAPI();

          set((state) => ({
            notifications: state.notifications.map((n) => ({
              ...n,
              isRead: true,
            })),
          }));
        } catch (err) {
          console.error(err);
        }
      },
    

    }),
    {
      name: "notifications",
      partialize: (state) => ({
        notifications: state.notifications,
      }),
    }
  )
);

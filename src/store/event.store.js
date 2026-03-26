import { create } from "zustand";
import {
  getEventService,
  getMyRegisteredEvents,
  getMyPostedEventsService,
  deleteEventService
} from "../services/event.service";

export const useEventStore = create((set, get) => ({
  loading: false,
  events: [],
  myRegisteredEvents: [],
  myPostedEvents: [],

  getEvents: async () => {
    try {
      set({ loading: true });

      const res = await getEventService();
      // console.log(res);

      if (res) {
        set((state) => ({ events: res.events, loading: false }));
      }
    } catch (error) {

    }
  },

  getMyRegisteredEvents: async () => {
    try {
      const res = await getMyRegisteredEvents();

      set({ myRegisteredEvents: res?.data?.events || [] });
    } catch (error) {

    }
  },

  getMyPostedEvents: async () => {
    try {
      const res = await getMyPostedEventsService();
      set({ myPostedEvents: res?.data?.events || [] });
    } catch (error) {
      console.error(error);
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const res = await deleteEventService(eventId);
      if (res.success) {
        set((state) => ({
          myPostedEvents: state.myPostedEvents.filter((e) => e._id !== eventId),
          events: state.events.filter((e) => e._id !== eventId)
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting event:", error);
      return false;
    }
  },

  setEventsFromDashboard: (newEvents) => {
    set((state) => {
      const incoming = Array.isArray(newEvents) ? newEvents : [newEvents];

      const merged = [...state.events, ...incoming];

      const uniqueMap = new Map(merged.map((e) => [e._id, e]));

      const uniqueEvents = Array.from(uniqueMap.values());
      const eventIds = Array.from(uniqueMap.keys());

      return { events: uniqueEvents, myRegisteredEvents: eventIds };
    });
  },
}));

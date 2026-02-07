import { create } from "zustand";
import {
  getEventService,
  getMyRegisteredEvents,
} from "../services/event.service";

export const useEventStore = create((set, get) => ({
  loading: false,
  events: [],
  myRegisteredEvents: [],

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

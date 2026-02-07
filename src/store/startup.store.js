import { create } from 'zustand';
import { API } from '../services/auth.service';

export const useStartupStore = create((set, get) => ({
  startups: [],
  myStartup: [],
  currentStartup: null,
  isLoading: false,
  error: null,

  fetchMyStartup: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.get('/startup/my');
      console.log(res);

      set({ myStartup: res?.data?.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Error fetching startups', isLoading: false });
    }
  },

  getStartupDetails: async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await API.get(`/${id}`);
      set({ currentStartup: data.data, isLoading: false });
    } catch (err) {
      set({ error: 'Startup not found', isLoading: false });
    }
  },

  saveStartup: async (formData) => {
    set({ isLoading: true });
    console.log(formData);

    try {
      const isEdit = !!formData._id;
      const response = isEdit
        ? await API.put(`/startup/${formData._id}`, formData)
        : await API.post('/startup', formData);



      const updatedStartup = response.data.data;


      set({
        myStartup: updatedStartup,
        isLoading: false
      });
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, error: err.response?.data?.message };
    }
  },

  addNote: async (startupId, noteData) => {
    try {
      const res = await API.post(`/startup/${startupId}/notes`, noteData);
      set((state) => ({
        myStartup: {
          ...state.myStartup,
          notes: [...(state.myStartup.notes || []), res.data.data]
        }
      }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  },

  updateNote: async (startupId, noteId, noteData) => {
    try {
      const res = await API.put(`/startup/${startupId}/notes/${noteId}`, noteData);
      set((state) => ({
        myStartup: {
          ...state.myStartup,
          notes: state.myStartup.notes.map(note =>
            note._id === noteId ? res.data.data : note
          )
        }
      }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  },

  deleteNote: async (startupId, noteId) => {
    try {
      await API.delete(`/startup/${startupId}/notes/${noteId}`);
      set((state) => ({
        myStartup: {
          ...state.myStartup,
          notes: state.myStartup.notes.filter(note => note._id !== noteId)
        }
      }));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  },

  deleteManyNotes: async (startupId, noteIds) => {
    try {
      // Optimized: Run all deletes in parallel
      await Promise.all(noteIds.map(id => API.delete(`/startup/${startupId}/notes/${id}`)));

      set((state) => ({
        myStartup: {
          ...state.myStartup,
          notes: state.myStartup.notes.filter(note => !noteIds.includes(note._id))
        }
      }));
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to delete some notes" };
    }
  }
}));
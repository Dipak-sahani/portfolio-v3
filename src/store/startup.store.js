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

  saveStartup: async (data) => {
    set({ isLoading: true });
    try {
      const isEdit = !!data._id;

      const formData = new FormData();

      // Append all fields
      const excludedFields = ['notes', '_id', 'createdAt', 'updatedAt', '__v', 'founderId', 'team'];

      Object.keys(data).forEach(key => {
        if (excludedFields.includes(key)) return;

        if (key === 'socialLinks') {
          Object.keys(data.socialLinks).forEach(socialKey => {
            formData.append(`socialLinks[${socialKey}]`, data.socialLinks[socialKey]);
          });
        } else if (Array.isArray(data[key])) {
          data[key].forEach(item => formData.append(key, item));
        } else if (key === 'logoFile') {
          if (data.logoFile) formData.append('logo', data.logoFile);
        } else if (key === 'coverImageFile') {
          if (data.coverImageFile) formData.append('coverImage', data.coverImageFile);
        } else if (key !== 'logo' && key !== 'coverImage') {
          formData.append(key, data[key]);
        }
      });


      const response = isEdit
        ? await API.put(`/startup/${data._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        : await API.post('/startup', formData, { headers: { "Content-Type": "multipart/form-data" } });

      const updatedStartup = response.data.data;

      set((state) => ({
        myStartup: updatedStartup, // Update store directly
        isLoading: false
      }));

      // Refresh list if needed (optional)

      return { success: true };
    } catch (err) {
      console.error(err);
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
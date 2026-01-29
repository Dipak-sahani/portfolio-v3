import { API } from "./auth.service";

/**
 * Follow a user
 * param {string} userId - ID of the user to follow
 */
export const getEventService = async () => {
  try {
    const response = await API.get('/event');
    return response.data; // { success: true, events: [...] }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; // Let the caller handle it
  }
};

// Get event by ID
export const getEventById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data; // { success: true, event: {...} }
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

// Create a new event (requires auth token)
export const createEvent = async (data) => {
  try {
    const response = await API.post('/event', data);
    return response.data; // { success: true, event: {...} }
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Optional: update event
export const updateEvent = async (id, data) => {
  try {
    const response = await API.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    throw error;
  }
};

// Optional: delete event
export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    throw error;
  }
};
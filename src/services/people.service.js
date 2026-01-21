import { API } from "./auth.service";
export const searchPeople = async (params) => {
  try {
    //  console.log("searchUsers called with:", params);
    const response = await API.get('/users/search-user', {
      
      params: {
        ...params,
        // Transform arrays to strings for URL params
        skills: params.skills?.join(','),
        availability: params.availability?.join(','),
      }
    });
    
    return {
      success: true,
      data: response.data.data,
      page: response.data.page,
      totalPages: response.data.totalPages,
      totalResults: response.data.totalResults
    };
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

export const getPersonById = async (id) => {
  try {
    const response = await API.get(`/people/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get person error:', error);
    throw error;
  }
};

export const savePerson = async (personId) => {
  try {
    const response = await API.post('/people/saved', { personId });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Save person error:', error);
    throw error;
  }
};

export const getSavedPeople = async (params = {}) => {
  try {
    const response = await API.get('/people/saved', { params });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Get saved people error:', error);
    throw error;
  }
};
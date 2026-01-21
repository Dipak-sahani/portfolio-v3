// services/api.js
import { API } from "./auth.service";

// Helper function to handle errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  throw error.response?.data?.message || error.message || 'API request failed';
};

// Posts API
export const createPost = async (postData) => {
  try {
    const res = await API.post('/post', postData);
    // console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPosts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await API.get(`/post?${query}`);
    // console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const res = await API.get(`/post/${postId}`);
    console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    const res = await API.patch(`/post/${postId}`, updateData);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await API.delete(`/posts/${postId}`);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const likePost = async (postId) => {
  try {
    const res = await API.patch(`/post/${postId}/like`);
    // console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const unLikePost = async (postId) => {
  try {
    const res = await API.patch(`/post/${postId}/unlike`);
    // console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const savePost = async (postId) => {
  try {
    const res = await API.patch(`/post/${postId}/post-save`);
    // console.log(res);
    
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};


export const sharePost = async (postId) => {
  try {
    const res = await API.post(`/posts/${postId}/share`);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// User API
export const getProfile = async () => {
  try {
    const res = await API.get('/users/profile');
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProfile = async (profileData) => {
  try {
    const res = await API.put('/users/profile', profileData);
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserStats = async () => {
  try {
    const res = await API.get('/users/stats');
    return res.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Workspace API
export const getWorkspaces = async () => {
  try {
    const res = await API.get('/workspaces');
    return res.data.data?.workspaces || [];
  } catch (error) {
    handleApiError(error);
  }
};
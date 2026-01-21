// store/usePostStore.js - Updated for new API format
import { create } from "zustand";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  sharePost,
  unLikePost,
  savePost,
} from "../services/post.service";

export const usePostStore = create((set, get) => ({
  // State
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalPosts: 0,
  },

  // Actions
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Fetch all posts
  fetchPosts: async (loadMore = false) => {
    try {
      const { pagination, posts, loading } = get();
      if (loading) return;

      const nextPage = loadMore ? pagination.page + 1 : 1;

      set({ loading: true, error: null });

      const data = await getPosts({
        page: nextPage,
        limit: import.meta.env.REACT_APP_LIMIT || 8,
      });

      // console.log(data.postsWithFlags);

      set({
        posts: loadMore ? [...posts, ...data.postsWithFlags] : data.postsWithFlags,
        pagination: data.pagination || pagination, // page updates here
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch single post
  fetchPostById: async (postId) => {
    try {
      set({ loading: true, error: null });
      const post = await getPostById(postId);
      set({ currentPost: post, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Create post
  createPost: async (postData) => {
    try {
      const newPost = await createPost(postData);
      set((state) => ({
        posts: [newPost, ...state.posts],
        currentPost: newPost,
      }));
      return newPost;
    } catch (err) {
      throw err;
    }
  },

  // Update post
  updatePost: async (postId, updateData) => {
    try {
      const updatedPost = await updatePost(postId, updateData);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? updatedPost : post,
        ),
        currentPost: updatedPost,
      }));
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },

  // Delete post (soft delete)
  deletePost: async (postId) => {
    try {
      await deletePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, isDeleted: true } : post,
        ),
        currentPost:
          state.currentPost?._id === postId
            ? { ...state.currentPost, isDeleted: true }
            : state.currentPost,
      }));
    } catch (err) {
      throw err;
    }
  },

  // Like post
  likePost: async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLikedByMe: true, // mark as liked
                likeCount: post.likeCount + 1, // increment like count locally
              }
            : post,
        ),
        currentPost:
          state.currentPost?._id === postId
            ? {
                ...state.currentPost,
                isLikedByMe: true,
                likeCount: state.currentPost.likeCount + 1,
              }
            : state.currentPost,
      }));

      return updatedPost;
    } catch (err) {
      throw err;
    }
  },
  unLikePost: async (postId) => {
    try {
      const updatedPost = await unLikePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLikedByMe: false, // mark as liked
                likeCount: post.likeCount - 1, // increment like count locally
              }
            : post,
        ),
        currentPost:
          state.currentPost?._id === postId
            ? {
                ...state.currentPost,
                isLikedByMe: true,
                likeCount: state.currentPost.likeCount + 1,
              }
            : state.currentPost,
      }));
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },
  savePost: async (postId) => {
    try {
      const updatedPost = await savePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                isSavedByMe: true,
              }
            : post,
        ),
        currentPost:
          state.currentPost?._id === postId
            ? {
                ...state.currentPost,
                isLikedByMe: true,
                likeCount: state.currentPost.likeCount + 1,
              }
            : state.currentPost,
      }));
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },

  // Share post
  sharePost: async (postId) => {
    try {
      const updatedPost = await sharePost(postId);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? updatedPost : post,
        ),
        currentPost:
          state.currentPost?._id === postId ? updatedPost : state.currentPost,
      }));
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },

  // Clear current post
  clearCurrentPost: () => set({ currentPost: null }),

  // Clear all
  reset: () =>
    set({
      posts: [],
      currentPost: null,
      loading: false,
      error: null,
    }),
}));

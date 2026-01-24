// stores/useFollowStore.js
import { create } from "zustand";
import { followUser, unfollowUser } from "../services/follow.service";
import { usePostStore } from "./post.store";

export const useFollowStore = create((set) => ({
  isFollowing: false,
  followerCount: 0,

  // Initialize from backend data
  hydrate: ({ isFollowing, followerCount }) =>
    set({ isFollowing, followerCount }),

  follow: async (userId) => {
    try {
      await followUser(userId);
      set((state) => ({
        isFollowing: true,
        followerCount: state.followerCount + 1,
      }));


      // 2️⃣ Update post state
      const postStore = usePostStore.getState();
      postStore.updateAuthorFollow(
        userId,             // author ID
        true,               // isFollowing
        postStore.posts.find(p => p.authorId._id === userId)?.authorId.followerCount + 1 || 1
      );

    } catch (err) {
      console.error(err);
    }
  },

  unfollow: async (userId) => {
    try {
      await unfollowUser(userId);
      set((state) => ({
        isFollowing: false,
        followerCount: state.followerCount - 1,
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));

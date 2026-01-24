import { API } from "./auth.service";

/**
 * Follow a user
 * param {string} userId - ID of the user to follow
 */
export const followUser = async (userId) => {
  try {
    const res = await API.post(`/users/follow/${userId}`);
    return res.data; // { message: "Followed" }
  } catch (err) {
    console.error("Follow user error:", err);
    throw err;
  }
};

/**
 * Unfollow a user
 * param {string} userId - ID of the user to unfollow
 */
export const unfollowUser = async (userId) => {
  try {
    const res = await API.post(`/users/unfollow/${userId}`);
    return res.data; // { message: "Unfollowed" }
  } catch (err) {
    console.error("Unfollow user error:", err);
    throw err;
  }
};

/**
 * Get follow info for a user
 * @param {string} userId - ID of the user to fetch info
 */
export const getFollowInfo = async (userId) => {
  try {
    const res = await API.get(`/users/${userId}/follow-info`);
    return res.data; 
    // expected: { followerCount: number, isFollowing: boolean }
  } catch (err) {
    console.error("Get follow info error:", err);
    throw err;
  }
};

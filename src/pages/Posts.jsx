import React, { useEffect } from "react";
import { usePostStore } from "../store/post.store";
import PostCard from "../components/post/PostCard";

const Posts = () => {
  const {
    posts,
    fetchPosts,
    loading,
    error,
  } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p>Loading posts...</p>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="flex justify-center py-10 text-red-500">
        <p>{error || "Failed to load posts"}</p>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <p>No posts available</p>
      </div>
    );
  }

  /* ---------- Success ---------- */
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;

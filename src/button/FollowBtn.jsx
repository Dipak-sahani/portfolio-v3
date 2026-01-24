import React from "react";
import { useFollowStore } from "../store/follow.store";

const FollowButton = ({ authorId, isFollowing }) => {
  const { follow, unfollow } = useFollowStore();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => (isFollowing ? unfollow(authorId) : follow(authorId))}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          isFollowing ? "bg-gray-200 text-gray-800" : "bg-blue-500 text-white"
        }`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default FollowButton;

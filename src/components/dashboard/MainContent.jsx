// components/MainContent.jsx
import React from 'react';
import PostsSection from './sections/PostSection';
import EventsSection from './sections/EventSection';
import LikedPostsSection from './sections/LikedPostsSection';
import CommentsSection from './sections/CommentsSection';
import SavedPostsSection from './sections/SavedPostsSections';

function MainContent({ activeTab, data, user, allData }) {
  const sectionTitles = {
    posts: 'My Posts',
    events: 'My Events',
    likedPosts: 'Liked Posts',
    comments: 'My Comments',
    savedPosts: 'Saved Posts'
  };

  // console.log(allData);
  
  const renderSection = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsSection posts={data} />;
      case 'events':
        return <EventsSection events={data} />;
      case 'likedPosts':
        return <LikedPostsSection posts={data} />;
      case 'comments':
        return <CommentsSection comments={data} />;
      case 'savedPosts':
        return <SavedPostsSection posts={data} />;
      default:
        return <PostsSection posts={data} />;
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3C4044] mb-2">
            {sectionTitles[activeTab]}
          </h1>
          <p className="text-gray-600">
            Manage and view your {activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value={`${allData?.posts?.totalCount || 0}`}
            icon="📝"
            color="bg-[#FD7B41]"
          />
          <StatCard
            title="Upcoming Events"
            value={`soon`}
            icon="📅"
            color="bg-[#EDBF9B]"
          />
          <StatCard
            title="Likes Received"
            value={`${allData?.likesReceived}`}
            icon="❤️"
            color="bg-[#FD7B41]"
          />
          <StatCard
            title="Saved Items"
            value={`${allData?.savedPosts?.totalCount}`}
            icon="💾"
            color="bg-[#EDBF9B]"
          />
        </div>

        {/* Content Section */}
        {renderSection()}
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-[#3C4044]">{value}</p>
      </div>
      <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center`}>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default MainContent;
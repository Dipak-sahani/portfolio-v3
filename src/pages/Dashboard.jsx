// components/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import MainContent from '../components/dashboard/MainContent';
import { posts, events, likedPosts, comments, savedPosts } from '../../public/data/mockData.js';
import MobileHeader from '../components/dashboard/MobileHeader.jsx';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth.store.js';
import { useDashboardData } from '../store/dashboardData.store.js';
import PostDetailModal from '../components/post/PostDetailModal.jsx';
import ProjectDetailModal from '../components/project/ProjectDetailModal.jsx';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useAuthStore((state) => state.user)
  const [allData, setAllData] = useState([]);

  const dashboardData = useDashboardData((state) => state.dashboardData)
  const dashboardLoading = useDashboardData((state) => state.dashboardLoading)
  const getDashboardData = useDashboardData((state) => state.getDashboardData)



  const [tabData, setTableData] = useState({
    posts,
    events,
    likedPosts,
    likedProjects: [],
    likedEvents: [],
    comments,
    savedPosts,
    savedNews: []
  })


  // fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const res = await getDashboardData();

      // console.log(res);
      setAllData(res)
      setTableData((prev => ({
        ...prev,
        posts: res?.posts?.data,
        comments: res?.comments?.data,
        savedPosts: res?.savedPosts?.data,
        events: res?.registeredEvent?.data,
        likedPosts: res?.likedData?.posts,
        likedProjects: res?.likedData?.projects,
        likedEvents: res?.likedData?.events
      })))

    } catch (error) {


    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, [])



  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const closePostModal = () => {
    setSelectedPostId(null);
  };

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setSelectedProjectId(project._id);
  };

  const closeProjectModal = () => {
    setSelectedProjectId(null);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-[#DDDCDB] dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile Header */}
      <MobileHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
        activeTab={activeTab}
      />

      <div className="flex min-h-screen">
        {/* Sidebar for Desktop, Drawer for Mobile */}
        <div className={`
          sidebar
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out' : ''}
          ${isMobile && !isSidebarOpen ? '-translate-x-full' : ''}
          ${!isMobile ? 'relative w-64' : 'w-64'}
        `}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            isMobile={isMobile}
            closeSidebar={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Overlay for mobile sidebar */}
        {isMobile && isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <div className={`
          flex-1 transition-all duration-300
          ${isMobile && isSidebarOpen ? 'ml-0' : 'ml-0'}
          ${!isMobile ? 'ml-0' : ''}
        `}>
          <MainContent
            activeTab={activeTab}
            data={tabData[activeTab]}
            user={user}
            isMobile={isMobile}
            allData={allData}
            onPostClick={handlePostClick}
            onProjectClick={handleProjectClick}
            refresh={fetchDashboardData}
          />
        </div>
      </div>

      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={closePostModal}
        />
      )}

      {selectedProjectId && (
        <ProjectDetailModal
          project={selectedProject}
          postId={selectedProjectId}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
}


export default Dashboard;
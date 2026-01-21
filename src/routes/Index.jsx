import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoutes";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import ChatPage from "../pages/Chat/ChatPage";
import NotFound from "../pages/NotFound";
import PeopleSearch from "../pages/PeopleSearch";
import Post from "../pages/PostPage";
import CreatePostPage from "../components/post/CreatePostPage";
import Posts from "../pages/Posts";
import Dashboard from "../pages/Dashboard";
import EditPostPage from "../components/post/EditPostPage";
import MoreOption from "../pages/MoreOption";
import ComingSoonPage from "../pages/CominSoonPage";


// startup and business idea 
import IdeaSelectionPage from "../pages/startupAndBusinessPages/StartupPage";

export const AppRoutes=()=> {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      {/* Auth Layout */}
      
      

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />

          <Route path="/users" element={<PeopleSearch />} />
          {/* <Route path="/post" element={<Post />} /> */}
          <Route path="/post" element={<Posts />} />

          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:postId" element={<EditPostPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/more-option" element={<MoreOption />} />





          <Route path="/startup-idea" element={<IdeaSelectionPage />} />

        




        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}

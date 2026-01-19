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


export default function AppRoutes() {
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
          <Route path="/post" element={<Post />} />
          <Route path="/post1" element={<Posts />} />

          <Route path="/create-post" element={<CreatePostPage />} />



        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

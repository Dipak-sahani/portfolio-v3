import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoutes";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import AboutUs from "../pages/AboutUs";
import ContactPage from "../pages/ContactPage";
import ChatPage from "../pages/chat/ChatPage";
import NotFound from "../pages/NotFound";
import PeopleSearch from "../pages/PeopleSearch";
import Posts from "../pages/Posts";
import CreatePostPage from "../components/post/CreatePostPage";
import PostFeedPage from "../pages/PostFeedPage";
import Dashboard from "../pages/Dashboard";
import EditPostPage from "../components/post/EditPostPage";
import MoreOption from "../pages/MoreOption";
import ComingSoonPage from "../pages/CominSoonPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";

import OtherPersonProfilePage from "../pages/OtherPersonProfilePage";
import TeamCreationPage from "../pages/Team";
import EventPage from "../pages/EventPage";

// startup and business idea 
import IdeaSelectionPage from "../pages/startupAndBusinessPages/StartupPage";
import ProjectDashboard from "../pages/ProjectShowCase";
import ProfessionalCard from "../card/ContactSelectCard";
import EventCreationForm from "../pages/Event";
import StartupProfile from "../pages/startupAndBusinessPages/StartupProfile";
import StartupForm from "../pages/startupAndBusinessPages/StartupForm";
import MyStartupProfile from "../pages/startupAndBusinessPages/MyStartupProfile";
import StartupDetailsPage from "../pages/startupAndBusinessPages/StartupDetailsPage";
import PostDetailsPage from "../pages/PostDetailsPage";
import PageBuilder from "../pages/PageBuilder";
import GuidePage from "../pages/startupAndBusinessPages/GuidePage";
import BlockedUsersPage from "../pages/BlockedUsersPage";






const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth Layout */}



      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />

          <Route path="/users" element={<PeopleSearch />} />
          <Route path="/post" element={<PostFeedPage />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/edit-post/:postId" element={<EditPostPage />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/more-option" element={<MoreOption />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/project" element={<ProjectDashboard />} />
          <Route path="/profile/:username" element={<OtherPersonProfilePage />} />
          <Route path="/card" element={<ProfessionalCard />} />
          <Route path="/team" element={<TeamCreationPage />} />
          <Route path="/event" element={<EventCreationForm />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/startup-profile" element={<MyStartupProfile />} />
          <Route path="/startup/:id" element={<StartupDetailsPage />} />
          <Route path="/startup-form" element={<StartupForm />} />



          <Route path="/startup-idea" element={<IdeaSelectionPage />} />

          {/* Guide Pages */}
          <Route path="/business-model" element={<GuidePage topic="businessModel" />} />
          <Route path="/funding-investors" element={<GuidePage topic="funding" />} />
          <Route path="/pitch-decks" element={<GuidePage topic="pitchDeck" />} />
          <Route path="/incubators" element={<GuidePage topic="incubators" />} />
          <Route path="/mentorship" element={<GuidePage topic="mentorship" />} />
          <Route path="/case-study" element={<GuidePage topic="caseStudy" />} />
          <Route path="/developers" element={<GuidePage topic="developers" />} />
          <Route path="/designers" element={<GuidePage topic="designers" />} />
          <Route path="/marketers" element={<GuidePage topic="marketers" />} />
          <Route path="/advisors" element={<GuidePage topic="advisors" />} />
          <Route path="/freelancers" element={<GuidePage topic="freelancers" />} />
          <Route path="/team" element={<GuidePage topic="team" />} />
          <Route path="/website-builder" element={<GuidePage topic="websiteBuilder" />} />
          <Route path="/payment" element={<GuidePage topic="paymentValues" />} />
          <Route path="/legal-compliance" element={<GuidePage topic="legalCompliance" />} />
          <Route path="/accounting" element={<GuidePage topic="accounting" />} />
          <Route path="/marketing" element={<GuidePage topic="marketing" />} />
          <Route path="/analytics" element={<GuidePage topic="analytics" />} />
          <Route path="/ai-tool" element={<GuidePage topic="aiTool" />} />

          {/* Page Builder Route */}
          <Route path="/page-builder" element={<PageBuilder />} />
          <Route path="/page-builder/:pageId" element={<PageBuilder />} />






        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}




export default AppRoutes;
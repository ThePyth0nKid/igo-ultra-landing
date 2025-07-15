import React, { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Hero from "./components/Hero"
import Mission from "./components/Mission"
import UltraFitSection from "@/components/ultra-paths/UltraFitSection"
import UltraMindSection from "@/components/ultra-paths/UltraMindSection"
import UltraSpiritSection from "@/components/ultra-paths/UltraSpiritSection"
import UltraWorldSection from "./components/ultra-paths/UltraWorldSection"
import UltrascienceSection from "./components/ultra-paths/UltrascienceSection"
import Roadmap from "./components/Roadmap"
import Community from "./components/Community"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import DiscordCallback from "./pages/DiscordCallback"
import OnboardingContainer from "./pages/Onboarding";
import PrivateRoute from "./components/auth/PrivateRoute"
import LayoutWithNavbar from "./components/layout/LayoutWithNavbar"
import LayoutWithSidebar from "./components/layout/LayoutWithSidebar";
import LayoutWithBottomNav from "./components/layout/LayoutWithBottomNav";
import Impressum from "./pages/Impressum"
import Datenschutz from "./pages/Datenschutz"
import Kontakt from "./pages/Kontakt"
import Leaderboard from "./pages/Leaderboard"
import ComingSoon from './pages/ComingSoon';
import ProfileEdit from "./pages/ProfileEdit";
import AdminPanel from "./pages/AdminPanel";
import UserDetail from "@/components/admin/UserDetail";
import UserCreate from "@/components/admin/UserCreate";
import SeasonList from "@/components/admin/SeasonList";
import SeasonDetail from "@/components/admin/SeasonDetail";
import SeasonCreate from "@/components/admin/SeasonCreate";

const App = () => {
  return (
    <div className="bg-black text-white font-sans">
      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            <LayoutWithNavbar>
              <Hero />
              <Mission />
              <UltraFitSection />
              <UltraMindSection />
              <UltraSpiritSection />
              <UltraWorldSection />
              <UltrascienceSection />
              <Roadmap />
              <Community />
              <Footer />
            </LayoutWithNavbar>
          }
        />

        {/* OAuth2 callback after Discord login */}
        <Route path="/discord/callback" element={<DiscordCallback />} />

        {/* One-time onboarding step for new users */}
        <Route path="/onboarding" element={<OnboardingContainer />} />

        {/* Protected dashboard for logged-in users with completed profile */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <Dashboard />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />

        {/* Leaderboard für eingeloggte User */}
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <ResponsiveLeaderboardWrapper />
            </PrivateRoute>
          }
        />

        {/* Profil bearbeiten */}
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <LayoutWithNavbar>
                <ProfileEdit />
              </LayoutWithNavbar>
            </PrivateRoute>
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel/users/:id"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapperUserDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel/users/create"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapperUserCreate />
            </PrivateRoute>
          }
        />
        {/* Season Admin */}
        <Route
          path="/admin-panel/seasons"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapperSeasonList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel/seasons/:id"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapperSeasonDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel/seasons/create"
          element={
            <PrivateRoute>
              <ResponsiveAdminPanelWrapperSeasonCreate />
            </PrivateRoute>
          }
        />

        {/* Coming Soon page */}
        <Route path="/coming-soon" element={<ComingSoon />} />

        {/* Impressum, Datenschutz, Kontakt */}
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/kontakt" element={<Kontakt />} />

        {/* Catch-all fallback route */}
        <Route path="*" element={<div className="p-10">404 – Not Found</div>} />
      </Routes>
    </div>
  )
}

// Wrapper-Komponente für AdminPanel mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapper: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <AdminPanel />
    </Layout>
  );
};

// Wrapper-Komponente für UserDetail mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapperUserDetail: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <UserDetail />
    </Layout>
  );
};

// Wrapper-Komponente für UserCreate mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapperUserCreate: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <UserCreate />
    </Layout>
  );
};

// Wrapper-Komponente für SeasonList mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapperSeasonList: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <SeasonList />
    </Layout>
  );
};
// Wrapper-Komponente für SeasonDetail mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapperSeasonDetail: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <SeasonDetail />
    </Layout>
  );
};
// Wrapper-Komponente für SeasonCreate mit Sidebar oder BottomNav
const ResponsiveAdminPanelWrapperSeasonCreate: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <SeasonCreate />
    </Layout>
  );
};

// Wrapper-Komponente für Leaderboard mit Sidebar oder BottomNav
const ResponsiveLeaderboardWrapper: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;
  return (
    <Layout>
      <Leaderboard />
    </Layout>
  );
};

export default App

import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import LayoutWithBottomNav from "@/components/layout/LayoutWithBottomNav";
import { API_BASE } from '@/lib/api';

// Zusätzliche Typen für Fraktion und Herkunft
interface Faction {
  id: number;
  name: string;
  style: string;
  icon: string;
}
interface Origin {
  id: number;
  name: string;
  type: string;
}

type User = {
  id: number;
  username: string;
  ultra_name?: string;
  level?: number;
  xp?: number;
  rank?: string;
  avatar_url?: string;
  avatar?: string; // relativer Pfad als Fallback
  bio?: string;
  faction?: Faction;
  origin?: Origin;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fetch user data
    fetchCurrentUser()
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    // Check screen size for layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint (Tailwind)
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-black">
        Loading your Ultra Dashboard...
      </div>
    );
  }

  // Avatar-URL-Logik: absolute URL bevorzugen, sonst relativen Pfad mit API_BASE ergänzen
  let avatarSrc = "/images/default-avatar.png";
  if (user.avatar_url) {
    avatarSrc = user.avatar_url;
  } else if (user.avatar) {
    avatarSrc = user.avatar.startsWith('http') ? user.avatar : `${API_BASE}${user.avatar}`;
  }

  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 py-10">
        {/* Avatar und Name */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={avatarSrc}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-ultra-red shadow-lg object-cover"
          />
          <h2 className="text-3xl font-ultra text-ultra-red mt-2">
            {user.ultra_name || user.username}
          </h2>
          <span className="text-gray-400 text-sm">@{user.username}</span>
        </div>

        {/* User-Infos */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-xl flex flex-col gap-2">
            <h3 className="text-lg font-bold text-ultra-red mb-2">🧑‍🚀 Ultra-Profil</h3>
            <ul className="text-gray-200 text-sm space-y-1">
              <li><span className="font-semibold text-white">Level:</span> {user.level ?? 0}</li>
              <li><span className="font-semibold text-white">XP:</span> {user.xp ?? 0}</li>
              <li><span className="font-semibold text-white">Rang:</span> {user.rank ?? "Unranked"}</li>
              {user.faction && (
                <li><span className="font-semibold text-white">Fraktion:</span> {user.faction.name}</li>
              )}
              {user.origin && (
                <li><span className="font-semibold text-white">Herkunft:</span> {user.origin.name} ({user.origin.type})</li>
              )}
            </ul>
          </div>
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-xl flex flex-col gap-2">
            <h3 className="text-lg font-bold text-ultra-red mb-2">📝 Bio</h3>
            <p className="text-gray-200 text-sm whitespace-pre-line min-h-[60px]">
              {user.bio || <span className="italic text-gray-500">Keine Bio hinterlegt.</span>}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import LayoutWithBottomNav from "@/components/layout/LayoutWithBottomNav";

type User = {
  id: number;
  username: string;
  ultra_name?: string;
  level?: number;
  xp?: number;
  rank?: number;
  avatar_url?: string;
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

  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar */}
        <section className="bg-white/5 border border-gray-800 rounded-xl p-4 text-center shadow-xl">
          <img
            src={user.avatar_url || "/images/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-ultra-red shadow-md mx-auto"
          />
          <h2 className="text-xl font-ultra text-ultra-red mt-4">
            {user.ultra_name || user.username}
          </h2>
          <p className="text-xs text-gray-400">ID: {user.id}</p>
          <p className="text-sm text-gray-300">
            Lv. <span className="text-ultra-red">{user.level ?? 0}</span>
          </p>
          <p className="text-sm text-gray-300">XP: {user.xp ?? 0}</p>
          <p className="text-sm text-gray-300">
            Rang: {user.rank ?? "Unranked"}
          </p>
        </section>

        {/* Skillpunkte + Inventar */}
        <section className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-ultra text-ultra-red mb-2">🎯 Skillpunkte</h3>
            <p className="text-gray-300 text-sm">
              Coming soon: Deine Fähigkeiten & Spezialisierungen.
            </p>
          </div>
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-ultra text-ultra-red mb-2">🎒 Inventar</h3>
            <p className="text-gray-300 text-sm">
              Hier wird später deine Ausrüstung & XP-Boni angezeigt.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;

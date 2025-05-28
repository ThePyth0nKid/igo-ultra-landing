import React, { useEffect, useState } from "react";
import { fetchCurrentUser, logoutUser } from "@/lib/api";
import { Home, BarChart2, Settings, Package, LogOut } from "lucide-react";

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

  useEffect(() => {
    fetchCurrentUser()
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-black">
        Loading your Ultra Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar – fixiert & Logout ganz unten */}
      <aside className="w-20 sm:w-24 bg-black/90 border-r border-gray-800 flex flex-col justify-between py-6 fixed top-0 left-0 bottom-0 z-40">
        {/* Top Navigation */}
        <div className="flex flex-col items-center gap-8">
          <button className="flex flex-col items-center gap-1 hover:text-ultra-red transition-all">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-ultra-red transition-all">
            <BarChart2 size={24} />
            <span className="text-xs">XP</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-ultra-red transition-all">
            <Package size={24} />
            <span className="text-xs">Items</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-ultra-red transition-all">
            <Settings size={24} />
            <span className="text-xs">Settings</span>
          </button>
        </div>

        {/* Logout */}
        <div className="flex flex-col items-center">
          <button
            onClick={logoutUser}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-600 transition-all"
          >
            <LogOut size={24} />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content with padding to the right of fixed sidebar */}
      <main class="ml-24 pt-24 w-full p-6 sm:p-10 flex flex-col md:flex-row gap-6">
        {/* Compact Avatar Card */}
        <section className="w-full md:w-1/3 bg-white/5 border border-gray-800 rounded-xl p-4 flex flex-col items-center gap-3 text-center shadow-xl">
          <img
            src={user.avatar_url || "/images/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-ultra-red shadow-md"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-ultra text-ultra-red">{user.ultra_name || user.username}</h2>
            <p className="text-xs text-gray-400">ID: {user.id}</p>
            <p className="text-sm text-gray-300">
              Lv. <span className="text-ultra-red font-semibold">{user.level ?? 0}</span>
            </p>
            <p className="text-sm text-gray-300">XP: {user.xp ?? 0}</p>
            <p className="text-sm text-gray-300">Rang: {user.rank ?? "Unranked"}</p>
          </div>
        </section>

        {/* Skill & Inventory */}
        <section className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-ultra text-ultra-red mb-2">🎯 Skillpunkte</h3>
            <p className="text-gray-300 text-sm">Coming soon: Deine Fähigkeiten & Spezialisierungen.</p>
          </div>

          <div className="bg-white/5 border border-gray-800 rounded-xl p-4 shadow-lg">
            <h3 className="text-lg font-ultra text-ultra-red mb-2">🎒 Inventar</h3>
            <p className="text-gray-300 text-sm">Hier wird später deine Ausrüstung & XP-Boni angezeigt.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

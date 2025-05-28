import React from "react";
import { Home, BarChart2, Settings, Package, LogOut } from "lucide-react";
import { logoutUser } from "@/lib/api";

const Sidebar = () => {
  return (
    <aside className="w-20 sm:w-24 fixed top-24 left-0 bottom-0 z-40 bg-black/90 border-r border-gray-800 py-6">
      {/* Navigation */}
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
  );
};

export default Sidebar;

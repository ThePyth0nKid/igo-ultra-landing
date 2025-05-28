import React from "react";
import { Home, BarChart2, Settings, Package, LogOut } from "lucide-react";
import { logoutUser } from "@/lib/api";

const ICON_SIZE = 28; // Einheitliche Größe

const navItems = [
  { icon: <Home size={ICON_SIZE} />, label: "Home" },
  { icon: <BarChart2 size={ICON_SIZE} />, label: "XP" },
  { icon: <Package size={ICON_SIZE} />, label: "Items" },
  { icon: <Settings size={ICON_SIZE} />, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-20 sm:w-24 fixed top-18 left-0 bottom-0 z-40 bg-black/90 border-r border-gray-800 py-8 flex flex-col justify-between items-center space-y-4">
      {/* Navigation */}
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 text-white hover:text-ultra-red transition-all"
          >
            {item.icon}
            <span className="text-[11px] leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={logoutUser}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-red-600 transition-all"
        >
          <LogOut size={ICON_SIZE} />
          <span className="text-[11px] leading-tight">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

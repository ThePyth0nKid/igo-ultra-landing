import React from "react";
import { logoutUser } from "@/lib/api";
import FitIcon from "@/components/icons/FitIcon";  // Dein eigenes Icon!
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrophy, FaHome } from "react-icons/fa";

const ICON_SIZE = 32;

const navItems = [
  { icon: "fit", label: "UltraFit" },
  { icon: "/icons/mind-white.svg", label: "UltraMind" },
  { icon: "/icons/spirit-white.svg", label: "UltraSpirit" },
  { icon: "/icons/world-white.svg", label: "UltraWorld" },
  { icon: "trophy", label: "Leaderboard" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  const handleNav = (label: string) => {
    if (label === "Leaderboard") {
      navigate("/leaderboard");
    } else if (["UltraFit", "UltraMind", "UltraSpirit", "UltraWorld"].includes(label)) {
      navigate(`/coming-soon?section=${label}`);
    }
  };
  return (
    <aside className="w-20 sm:w-24 fixed top-18 left-0 bottom-0 z-40 bg-black/90 border-r border-gray-800 py-8 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-6">
        {location.pathname !== "/dashboard" && (
          <button
            className="flex flex-col items-center bg-transparent border-none shadow-none focus:outline-none mb-2"
            onClick={() => navigate("/dashboard")}
          >
            <FaHome size={ICON_SIZE} className="text-ultra-red transition-transform duration-200 hover:scale-110" />
            <span className="text-[11px] leading-tight mt-1">Dashboard</span>
          </button>
        )}
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center bg-transparent border-none shadow-none focus:outline-none"
            onClick={() => handleNav(item.label)}
          >
            {item.icon === "fit" ? (
              <FitIcon />
            ) : item.icon === "trophy" ? (
              <FaTrophy size={ICON_SIZE} className="text-yellow-400 drop-shadow" />
            ) : (
              <img
                src={item.icon}
                alt={item.label}
                width={ICON_SIZE}
                height={ICON_SIZE}
                className="transition-transform duration-200 hover:scale-110"
              />
            )}
            <span className="text-[11px] leading-tight mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center bg-transparent border-none shadow-none focus:outline-none"
        >
          <img
            src="/icons/igu-white.svg"
            alt="Logout"
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="transition-transform duration-200 hover:scale-110"
          />
          <span className="text-[11px] leading-tight mt-1">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

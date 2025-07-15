import React from "react";
import { useNavigate } from "react-router-dom";

const ICON_SIZE = 32;

const navItems = [
  { icon: "/icons/fit-white.svg", label: "UltraFit" },
  { icon: "/icons/mind-white.svg", label: "UltraMind" },
  { icon: "/icons/igu-white.svg", label: "IGOULTRA" },
  { icon: "/icons/spirit-white.svg", label: "UltraSpirit" },
  { icon: "/icons/world-white.svg", label: "UltraWorld" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const handleNav = (label: string) => {
    if (["UltraFit", "UltraMind", "UltraSpirit", "UltraWorld"].includes(label)) {
      navigate(`/coming-soon?section=${label}`);
    }
    // IGOULTRA-Button bleibt ohne Navigation
  };
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 border-t border-gray-800 py-2 flex justify-around items-center">
      {navItems.map((item, index) => (
        <button
          key={index}
          className="flex flex-col items-center bg-transparent border-none shadow-none focus:outline-none"
          onClick={() => handleNav(item.label)}
        >
          <img
            src={item.icon}
            alt={item.label}
            width={ICON_SIZE}
            height={ICON_SIZE}
            className="transition-transform duration-200 hover:scale-110"
          />
          <span className="text-[11px] leading-tight mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

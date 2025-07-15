// src/components/Navbar.tsx
'use client';

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { redirectToDiscordLogin, fetchCurrentUser, logoutUser } from "@/lib/api";

type User = {
  id: number;
  username: string;
  ultra_name?: string;
  level?: number;
  xp?: number;
  rank?: number;
  avatar_url?: string;
  missing_onboarding_fields?: string[];
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();   // ← hier importieren
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Scroll-Effekt
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktuellen User laden bei jedem Routenwechsel
  useEffect(() => {
    fetchCurrentUser()
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, [location]);  // ← neu: Depend on location

  // Close burger menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Logout
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
  };

  const buttonStyle =
    "bg-transparent hover:bg-red-600 text-white text-sm px-6 py-2 sm:px-8 sm:py-3 rounded-full font-ultra tracking-widest shadow-xl border-2 border-white hover:shadow-red-700 transition-all duration-300 transform hover:scale-110 animate-pulse";

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 shadow-2xl backdrop-blur-md border-b border-gray-800"
            : "bg-black/70 backdrop-blur border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center relative">
          <img src="/images/logo.gif" alt="Logo" className="h-10 w-auto" />
          <div />
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-16 right-6 w-72 max-w-full bg-black/95 z-50 px-6 py-6 flex flex-col items-center gap-6 text-white text-xl backdrop-blur rounded-xl shadow-2xl border border-gray-800"
            style={{ minWidth: '220px' }}
          >
            {/* Ultra-Section Navigation */}
            <div className="flex flex-col gap-2 w-full mb-4">
              {location.pathname === "/" ? (
                // Landingpage Navigation - Anker-Links zu Sections
                [
                  { label: "UltraFit", hash: "#fit" },
                  { label: "UltraMind", hash: "#mind" },
                  { label: "UltraSpirit", hash: "#spirit" },
                  { label: "UltraWorld", hash: "#world" },
                  { label: "Ultrascience", hash: "#ultrascience" },
                  { label: "Roadmap", hash: "#roadmap" },
                  { label: "Community", hash: "#community" },
                ].map(({ label, hash }) => (
                  <a
                    key={label}
                    href={hash}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-ultra-red/20 text-base font-ultra tracking-wide border border-transparent hover:border-ultra-red transition-all"
                  >
                    {label}
                  </a>
                ))
              ) : (
                // Dashboard/Other Pages Navigation - Coming Soon Links
                [
                  { label: "UltraFit", section: "UltraFit" },
                  { label: "UltraMind", section: "UltraMind" },
                  { label: "UltraSpirit", section: "UltraSpirit" },
                  { label: "UltraWorld", section: "UltraWorld" },
                ].map(({ label, section }) => (
                  <button
                    key={label}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(`/coming-soon?section=${section}`);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-ultra-red/20 text-base font-ultra tracking-wide border border-transparent hover:border-ultra-red transition-all"
                  >
                    {label}
                  </button>
                ))
              )}
            </div>
            {/* Auth/Onboarding-abhängige Buttons */}
            {!user || (user.missing_onboarding_fields && user.missing_onboarding_fields.length > 0) ? (
              <Button
                onClick={() => {
                  redirectToDiscordLogin();
                  setMenuOpen(false);
                }}
                className={buttonStyle}
              >
                Login with Discord
              </Button>
            ) : (
              <>
                <span className="text-white text-sm text-center font-light">
                  {user.ultra_name ? (
                    <>
                      Willkommen, <span className="font-semibold">{user.ultra_name}</span>
                    </>
                  ) : (
                    <>
                      Willkommen, <span className="font-semibold">{user.username}</span>
                    </>
                  )}
                  {user.level !== undefined && (
                    <span className="ml-2 text-ultra-red">Lv. {user.level}</span>
                  )}
                </span>
                <button
                  onClick={() => {
                    navigate("/leaderboard");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-ultra-red/20 text-ultra-red font-bold text-lg transition-all border-2 border-ultra-red mb-2"
                >
                  Leaderboard
                </button>
                <button
                  onClick={() => {
                    navigate("/profile/edit");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-ultra-red/20 text-ultra-red font-bold text-lg transition-all border-2 border-ultra-red mb-2"
                >
                  Profil bearbeiten
                </button>
                <Button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className={buttonStyle}
                >
                  Logout
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

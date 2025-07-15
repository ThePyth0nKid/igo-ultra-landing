import React, { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import LayoutWithSidebar from '@/components/layout/LayoutWithSidebar';
import LayoutWithBottomNav from '@/components/layout/LayoutWithBottomNav';
import { useLocation } from 'react-router-dom';

const sectionDescriptions: Record<string, string> = {
  UltraFit: 'Bereite dich auf körperliche Herausforderungen vor, die deine Grenzen sprengen. UltraFit wird dich stärker machen als je zuvor – im Körper und im Geist.',
  UltraMind: 'Hier erwarten dich mentale Quests, Rätsel und Mindhacks. UltraMind öffnet dir die Tore zu ungeahnten geistigen Kräften.',
  UltraSpirit: 'Tauche ein in spirituelle Abenteuer, Rituale und die Suche nach deinem inneren Gleichgewicht. UltraSpirit verbindet dich mit dem Unsichtbaren.',
  UltraWorld: 'Erkunde neue Welten, Communities und digitale Realitäten. UltraWorld ist das Portal zu einer vernetzten, mystischen Zukunft.',
};

const ComingSoon = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  // Erwartet: /coming-soon?section=UltraFit
  const params = new URLSearchParams(location.search);
  const section = params.get('section');
  const description = section && sectionDescriptions[section]
    ? sectionDescriptions[section]
    : 'Ein neues Ultra-Abenteuer erwartet dich. Bleib gespannt – das nächste Kapitel wird legendär!';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;

  return (
    <>
      <Navbar />
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
          <FaRegClock className="text-6xl text-ultra-red mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold mb-2">Coming Soon</h1>
          {section && <h2 className="text-2xl font-semibold text-ultra-red mb-2">{section}</h2>}
          <p className="text-lg text-gray-300 mb-4 text-center max-w-xl">{description}</p>
        </div>
      </Layout>
    </>
  );
};

export default ComingSoon; 
import React from "react";
import Sidebar from "@/components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const LayoutWithSidebar = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar – immer sichtbar, unter Navbar */}
      <Sidebar />

      {/* Main Content – Abstand oben & links */}
      <main className="flex-1 ml-20 sm:ml-24 pt-24 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;

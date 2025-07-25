import React from "react";
import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

const LayoutWithBottomNav = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 pt-24 p-4 sm:p-8">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default LayoutWithBottomNav;

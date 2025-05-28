import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type Props = {
  children: ReactNode;
};

const LayoutWithNavbar = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="pt-20 sm:pt-4 md:pt-24 lg:pt-16">{children}</div>
    </>
  );
};

export default LayoutWithNavbar;

"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white p-10 flex justify-center items-center gap-5">
      <Link className={`${pathname === "/" ? "text-sky-400" : ""}`} href={"/"}>
        Home
      </Link>
      <Link
        className={`${pathname === "/events" ? "text-sky-400" : ""}`}
        href={"/events"}
      >
        Events
      </Link>
    </div>
  );
};

export default Navbar;

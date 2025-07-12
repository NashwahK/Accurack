"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/log-entries", label: "Log Entries" },
    { href: "/departments", label: "Departments" },
  ];

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 sticky top-0 z-50 
      bg-gradient-to-b from-white/80 to-transparent dark:from-black/80 dark:to-transparent 
      backdrop-blur-sm text-black dark:text-white">

      <div className="flex items-center gap-2">
        <img src="/Accurack Logo.svg" alt="Accurack Logo" className="w-8 h-8" />
        <h1 className="font-semibold text-xl">Accurack</h1>
      </div>
      <div className="flex gap-8 text-lg">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`
              pb-1
              border-b-2
              transition
              ${isActive(href) ? "font-bold border-yellow-400" : "border-transparent hover:border-yellow-400 transition duration-300 ease-in-out hover:-translate-y-1"}
            `}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

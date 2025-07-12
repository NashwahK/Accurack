"use client";

import Link from "next/link";
import Image from "next/image";
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
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 z-50 
      bg-gradient-to-b from-white/80 to-transparent dark:from-black/80 dark:to-transparent 
      backdrop-blur-sm text-black dark:text-white">

      {/* Logo and name */}
      <div className="flex items-center gap-2">
        <Image
          src="/Accurack Logo.svg"
          alt="Accurack Logo"
          width={40}
          height={40}
        />
        {/* Hide name on small screens */}
        <h1 className="font-semibold text-2xl hidden sm:block">Accurack</h1>
      </div>

      {/* Nav links */}
      <div className="flex gap-4 sm:gap-8 text-sm sm:text-lg overflow-x-auto max-w-[70%] sm:max-w-none">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`
              pb-1
              border-b-2
              truncate
              max-w-[100px]
              ${isActive(href)
                ? "font-bold border-yellow-400"
                : "border-transparent hover:border-yellow-400 transition duration-300 ease-in-out hover:-translate-y-1"
              }
            `}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

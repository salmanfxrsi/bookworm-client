"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Route {
  name: string;
  path: string;
}

const routes: Route[] = [
  { name: "My Books", path: "/dashboard/my-books" },
  { name: "Control Books", path: "/admin/users" },
  { name: "Control Users", path: "/admin/settings" },
  { name: "Control Tutorials", path: "/admin/settings" },
];

export default function TopNavbar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 
                    bg-white/20 backdrop-blur-xl border border-white/30 
                    rounded-full shadow-lg flex justify-center py-3 px-6 space-x-6 z-50
                    w-auto min-w-[300px] max-w-[800px]"
    >
      {routes.map((route) => (
        <Link key={route.path} href={route.path}>
          <span
            className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
              pathname === route.path
                ? "bg-white/50 text-emerald-600 shadow-md"
                : "text-gray-700 hover:bg-white/30 hover:shadow-sm"
            }`}
          >
            {route.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

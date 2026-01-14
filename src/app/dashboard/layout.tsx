"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/dashboard/TopNavbar";
import { useSession } from "next-auth/react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role !== "user") {
        router.replace("/admin/pending-reviews");
      }
    }
  }, [session, status, router]);

  if (
    status === "loading" ||
    (status === "authenticated" && session.user.role !== "user")
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Checking access...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="pt-26 p-8">{children}</div>
    </div>
  );
}

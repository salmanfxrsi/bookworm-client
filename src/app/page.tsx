"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import FeaturedBooksSection from "@/components/home/FeaturedBooksSection/FeaturedBooksSection";
import GenresSection from "@/components/home/GenresSection";
import HeroSection from "@/components/home/HeroSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import TopAuthorsSection from "@/components/home/TopAuthorsSection";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <HeroSection />
      {/* <GenresSection />
      <FeaturedBooksSection/>
      <TopAuthorsSection />
      <NewArrivalsSection /> */}
      <NewsletterSection />
    </main>
  );
}

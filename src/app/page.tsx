import FeaturedBooksSection from "@/components/home/FeaturedBooksSection/FeaturedBooksSection";
import GenresSection from "@/components/home/GenresSection";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <HeroSection />
      <GenresSection />
      <FeaturedBooksSection/>
    </main>
  );
}

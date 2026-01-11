import FeaturedBooksSection from "@/components/home/FeaturedBooksSection/FeaturedBooksSection";
import GenresSection from "@/components/home/GenresSection";
import HeroSection from "@/components/home/HeroSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import TopAuthorsSection from "@/components/home/TopAuthorsSection";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <HeroSection />
      <GenresSection />
      <FeaturedBooksSection/>
      <TopAuthorsSection />
      <NewArrivalsSection />
    </main>
  );
}

import { SearchPackages } from "@/components/packages/search-packages"
import { FeaturedPackages } from "@/components/packages/featured-packages"
import { HeroSection } from "@/components/landing/hero-section"
import { PopularDestinations } from "@/components/landing/popular-destinations"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <div className="container py-8 md:py-12">
          <SearchPackages />
          <FeaturedPackages />
          <PopularDestinations />
          <TestimonialsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

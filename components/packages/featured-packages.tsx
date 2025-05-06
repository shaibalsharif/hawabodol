import Link from "next/link"
import { PackageCard } from "@/components/packages/package-card"
import { Button } from "@/components/ui/button"

export function FeaturedPackages() {
  // Mock data
  const featuredPackages = [
    {
      id: 1,
      title: "Cox's Bazar Beach Getaway",
      location: "Cox's Bazar",
      image: "/placeholder.svg?height=300&width=400",
      price: 12000,
      duration: "3 days, 2 nights",
      rating: 4.8,
      reviewCount: 124,
    },
    {
      id: 2,
      title: "Sundarbans Mangrove Adventure",
      location: "Sundarbans",
      image: "/placeholder.svg?height=300&width=400",
      price: 15000,
      duration: "4 days, 3 nights",
      rating: 4.7,
      reviewCount: 98,
    },
    {
      id: 3,
      title: "Bandarban Hill Trekking",
      location: "Bandarban",
      image: "/placeholder.svg?height=300&width=400",
      price: 10000,
      duration: "3 days, 2 nights",
      rating: 4.9,
      reviewCount: 87,
    },
  ]

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Packages</h2>
          <p className="text-muted-foreground mt-2">Explore our handpicked tour packages for your next adventure</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/packages">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </section>
  )
}

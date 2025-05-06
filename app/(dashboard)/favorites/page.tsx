"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PackageCard } from "@/components/packages/package-card"
import { Button } from "@/components/ui/button"
import { ErrorBoundary } from "@/components/error-boundary"
import { PackageGridSkeleton } from "@/components/ui/skeletons"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Heart, PackageOpen } from "lucide-react"

// Mock data - would be fetched from API in a real app
const favoritePackages = [
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
    id: 3,
    title: "Bandarban Hill Trekking",
    location: "Bandarban",
    image: "/placeholder.svg?height=300&width=400",
    price: 10000,
    duration: "3 days, 2 nights",
    rating: 4.9,
    reviewCount: 87,
  },
  {
    id: 5,
    title: "Sylhet Tea Garden Tour",
    location: "Sylhet",
    image: "/placeholder.svg?height=300&width=400",
    price: 9000,
    duration: "2 days, 1 night",
    rating: 4.5,
    reviewCount: 65,
  },
]

export default function FavoritesPage() {
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(favoritePackages)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter((pkg) => pkg.id !== id))
    toast({
      title: "Removed from favorites",
      description: "The package has been removed from your favorites.",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Favorites</h1>
          <Button asChild>
            <Link href="/packages">Browse Packages</Link>
          </Button>
        </div>

        <ErrorBoundary>
          {loading ? (
            <PackageGridSkeleton count={3} />
          ) : favorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((pkg) => (
                <div key={pkg.id} className="relative">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
                    onClick={() => handleRemoveFavorite(pkg.id)}
                  >
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  </Button>
                  <PackageCard package={pkg} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                You haven't added any packages to your favorites yet. Browse our packages and add some to your
                favorites.
              </p>
              <Button asChild>
                <Link href="/packages">
                  <PackageOpen className="mr-2 h-4 w-4" />
                  Browse Packages
                </Link>
              </Button>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  )
}

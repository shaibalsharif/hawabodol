"use client"

import { useState, useEffect } from "react"
import { PackageCard } from "@/components/packages/package-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, Search } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { PackageGridSkeleton } from "@/components/ui/skeletons"
import { useToast } from "@/components/ui/use-toast"

// Mock data - would be fetched from API in a real app
const packages = [
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
  {
    id: 4,
    title: "Saint Martin Island Tour",
    location: "Saint Martin",
    image: "/placeholder.svg?height=300&width=400",
    price: 14000,
    duration: "3 days, 2 nights",
    rating: 4.6,
    reviewCount: 76,
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
  {
    id: 6,
    title: "Rangamati Lake Cruise",
    location: "Rangamati",
    image: "/placeholder.svg?height=300&width=400",
    price: 11000,
    duration: "3 days, 2 nights",
    rating: 4.4,
    reviewCount: 54,
  },
]

export default function PackagesPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("all")
  const [duration, setDuration] = useState("any")
  const [price, setPrice] = useState("any")
  const [rating, setRating] = useState("any")
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleApplyFilters = () => {
    setLoading(true)
    // Simulate API call with filters
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Filters applied",
        description: "Your search results have been updated.",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <ErrorBoundary>
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Tour Packages</h1>
                <Button variant="outline" className="hidden md:flex">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card className="md:col-span-1 h-fit">
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="search">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          placeholder="Search packages"
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Select value={location} onValueChange={setLocation} disabled={loading}>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="All locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All locations</SelectItem>
                          <SelectItem value="coxs-bazar">Cox's Bazar</SelectItem>
                          <SelectItem value="sundarbans">Sundarbans</SelectItem>
                          <SelectItem value="bandarban">Bandarban</SelectItem>
                          <SelectItem value="saint-martin">Saint Martin</SelectItem>
                          <SelectItem value="sylhet">Sylhet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={duration} onValueChange={setDuration} disabled={loading}>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Any duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any duration</SelectItem>
                          <SelectItem value="1-3">1-3 days</SelectItem>
                          <SelectItem value="4-7">4-7 days</SelectItem>
                          <SelectItem value="8-14">8-14 days</SelectItem>
                          <SelectItem value="15+">15+ days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price Range</Label>
                      <Select value={price} onValueChange={setPrice} disabled={loading}>
                        <SelectTrigger id="price">
                          <SelectValue placeholder="Any price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any price</SelectItem>
                          <SelectItem value="0-5000">৳0 - ৳5,000</SelectItem>
                          <SelectItem value="5000-10000">৳5,000 - ৳10,000</SelectItem>
                          <SelectItem value="10000-15000">৳10,000 - ৳15,000</SelectItem>
                          <SelectItem value="15000+">৳15,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Select value={rating} onValueChange={setRating} disabled={loading}>
                        <SelectTrigger id="rating">
                          <SelectValue placeholder="Any rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any rating</SelectItem>
                          <SelectItem value="4+">4+ stars</SelectItem>
                          <SelectItem value="3+">3+ stars</SelectItem>
                          <SelectItem value="2+">2+ stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={handleApplyFilters} disabled={loading}>
                      {loading ? "Applying..." : "Apply Filters"}
                    </Button>
                  </CardContent>
                </Card>
                <div className="md:col-span-3">
                  {loading ? (
                    <PackageGridSkeleton count={6} />
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {packages.map((pkg) => (
                        <PackageCard key={pkg.id} package={pkg} />
                      ))}
                    </div>
                  )}
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" disabled={loading}>
                      Load More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

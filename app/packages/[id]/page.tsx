"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/layout/main-nav"
import { Footer } from "@/components/layout/footer"
import { Calendar, Clock, MapPin, Star, Users } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

function PackageDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="relative h-[400px] overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <Skeleton className="h-10 w-3/4" />
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-12 w-full mb-6" />
            <div className="space-y-6">
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app, this would be fetched from the database
  const packageData = {
    id: Number.parseInt(params.id),
    title: "Cox's Bazar Beach Getaway",
    location: "Cox's Bazar, Bangladesh",
    description:
      "Experience the beauty of the world's longest natural sea beach with our 3-day Cox's Bazar tour package. Enjoy stunning sunrises and sunsets, relax on the beach, and explore local attractions. This package includes comfortable accommodation, daily breakfast, and guided tours to popular spots like Inani Beach and Himchari National Park.",
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    price: 12000,
    duration: "3 days, 2 nights",
    startDate: "2023-06-15",
    endDate: "2023-06-17",
    totalSeats: 20,
    availableSeats: 8,
    rating: 4.8,
    reviewCount: 124,
    categories: [
      {
        name: "Standard",
        price: 12000,
        description: "Comfortable accommodation with basic amenities",
        features: ["Shared accommodation", "Daily breakfast", "Guided tour", "Transportation"],
      },
      {
        name: "Deluxe",
        price: 15000,
        description: "Premium accommodation with additional amenities",
        features: [
          "Private accommodation",
          "All meals included",
          "Guided tour",
          "Transportation",
          "Evening entertainment",
        ],
      },
      {
        name: "Premium",
        price: 20000,
        description: "Luxury accommodation with all amenities",
        features: [
          "Luxury accommodation",
          "All meals included",
          "Private guided tour",
          "Private transportation",
          "Evening entertainment",
          "Spa treatment",
        ],
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival and Beach Exploration",
        description:
          "Arrive at Cox's Bazar and check into your hotel. After lunch, visit the main beach and enjoy the sunset. Evening at leisure.",
      },
      {
        day: 2,
        title: "Inani Beach and Himchari",
        description:
          "Visit Inani Beach in the morning, known for its unique coral stones. After lunch, explore Himchari National Park and enjoy the panoramic view of the Bay of Bengal.",
      },
      {
        day: 3,
        title: "Departure",
        description:
          "Early morning beach visit to enjoy the sunrise. After breakfast, check out from the hotel and depart from Cox's Bazar.",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 5,
        date: "2023-04-15",
        comment: "Amazing experience! The beach was beautiful and the tour guide was very knowledgeable.",
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 4,
        date: "2023-03-22",
        comment: "Great package overall. The hotel was comfortable and the itinerary was well-planned.",
      },
      {
        id: 3,
        user: "Ahmed Khan",
        rating: 5,
        date: "2023-02-10",
        comment: "Excellent service! The tour operator was very professional and helpful.",
      },
    ],
    operator: {
      id: 1,
      name: "Bangladesh Adventures",
      rating: 4.7,
      reviewCount: 256,
    },
  }

  const handleBookNow = () => {
    toast({
      title: "Booking initiated",
      description: "You're being redirected to the booking page.",
    })
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
          {loading ? (
            <PackageDetailSkeleton />
          ) : (
            <>
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={packageData.images[0] || "/placeholder.svg"}
                  alt={packageData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 container">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Badge>{packageData.location}</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="fill-yellow-500 h-4 w-4" />
                        <span className="ml-1 text-sm font-medium">{packageData.rating}</span>
                        <span className="ml-1 text-sm text-muted-foreground">({packageData.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{packageData.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-white">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span className="text-sm">{packageData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span className="text-sm">
                          {packageData.startDate} to {packageData.endDate}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span className="text-sm">{packageData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        <span className="text-sm">
                          {packageData.availableSeats} seats left out of {packageData.totalSeats}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <Tabs defaultValue="overview">
                      <TabsList className="w-full">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="space-y-6 mt-6">
                        <div>
                          <h2 className="text-2xl font-bold mb-4">About This Package</h2>
                          <p className="text-muted-foreground">{packageData.description}</p>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Package Categories</h2>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {packageData.categories.map((category, index) => (
                              <Card key={index}>
                                <CardContent className="p-4">
                                  <h3 className="text-lg font-bold">{category.name}</h3>
                                  <p className="text-2xl font-bold mt-2">৳{category.price}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Features:</h4>
                                    <ul className="space-y-1">
                                      {category.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="text-sm flex items-center">
                                          <span className="mr-2">•</span>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <Button className="w-full mt-4">Select</Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {packageData.images.map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`${packageData.title} - Image ${index + 1}`}
                                className="rounded-md object-cover aspect-[4/3]"
                              />
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="itinerary" className="space-y-6 mt-6">
                        <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>
                        <div className="space-y-6">
                          {packageData.itinerary.map((day) => (
                            <div key={day.day} className="border-l-2 border-primary pl-4 pb-6">
                              <h3 className="text-lg font-bold">
                                Day {day.day}: {day.title}
                              </h3>
                              <p className="text-muted-foreground mt-2">{day.description}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="reviews" className="space-y-6 mt-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-2xl font-bold">Reviews</h2>
                          <Button>Write a Review</Button>
                        </div>
                        <div className="space-y-4">
                          {packageData.reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{review.user}</h3>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2 text-muted-foreground">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <div>
                    <Card className="sticky top-20">
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold">Book This Package</h3>
                          <p className="text-3xl font-bold">৳{packageData.price}</p>
                          <p className="text-sm text-muted-foreground">per person (Standard category)</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Available Seats:</span>
                            <span className="font-medium">
                              {packageData.availableSeats} / {packageData.totalSeats}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Tour Date:</span>
                            <span className="font-medium">
                              {packageData.startDate} to {packageData.endDate}
                            </span>
                          </div>
                        </div>
                        <Button className="w-full" asChild onClick={handleBookNow}>
                          <Link href={`/packages/${packageData.id}/book`}>Book Now</Link>
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                          <p>No payment required to book</p>
                        </div>
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Tour Operator</h4>
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/operators/${packageData.operator.id}`}
                              className="text-primary hover:underline"
                            >
                              {packageData.operator.name}
                            </Link>
                            <div className="flex items-center text-yellow-500">
                              <Star className="fill-yellow-500 h-4 w-4" />
                              <span className="ml-1 text-sm font-medium">{packageData.operator.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

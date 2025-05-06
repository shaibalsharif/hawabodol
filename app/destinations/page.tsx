import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata = {
  title: "Destinations | হাওয়াবদল - Hawabodol",
  description: "Explore popular travel destinations in Bangladesh with হাওয়াবদল (Hawabodol).",
}

export default function DestinationsPage() {
  // Mock data for destinations
  const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      image: "/placeholder.svg?height=400&width=600",
      description: "The world's longest natural sea beach stretching 120 kilometers along the Bay of Bengal.",
      packageCount: 15,
    },
    {
      id: 2,
      name: "Sundarbans",
      image: "/placeholder.svg?height=400&width=600",
      description: "The largest mangrove forest in the world, home to the Royal Bengal Tiger and diverse wildlife.",
      packageCount: 12,
    },
    {
      id: 3,
      name: "Bandarban",
      image: "/placeholder.svg?height=400&width=600",
      description: "A hilly district with breathtaking landscapes, waterfalls, and indigenous cultures.",
      packageCount: 10,
    },
    {
      id: 4,
      name: "Saint Martin",
      image: "/placeholder.svg?height=400&width=600",
      description: "Bangladesh's only coral island with crystal clear waters and beautiful marine life.",
      packageCount: 8,
    },
    {
      id: 5,
      name: "Sylhet",
      image: "/placeholder.svg?height=400&width=600",
      description: "Known for its tea gardens, natural beauty, and numerous waterfalls.",
      packageCount: 14,
    },
    {
      id: 6,
      name: "Rangamati",
      image: "/placeholder.svg?height=400&width=600",
      description: "A scenic hill district with the beautiful Kaptai Lake and indigenous communities.",
      packageCount: 7,
    },
    {
      id: 7,
      name: "Kuakata",
      image: "/placeholder.svg?height=400&width=600",
      description: "A panoramic sea beach where you can witness both sunrise and sunset over the Bay of Bengal.",
      packageCount: 6,
    },
    {
      id: 8,
      name: "Sajek Valley",
      image: "/placeholder.svg?height=400&width=600",
      description: "A beautiful hill station known as the 'Queen of Hills' with stunning cloud views.",
      packageCount: 9,
    },
    {
      id: 9,
      name: "Srimangal",
      image: "/placeholder.svg?height=400&width=600",
      description: "The tea capital of Bangladesh with lush green tea gardens and rainforests.",
      packageCount: 11,
    },
  ]

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Popular Destinations</h1>
            <p className="text-muted-foreground">Explore the most beautiful destinations in Bangladesh</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search destinations..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/packages?location=${destination.name.toLowerCase().replace("'", "").replace(" ", "-")}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{destination.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {destination.packageCount} packages available
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        View Packages
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

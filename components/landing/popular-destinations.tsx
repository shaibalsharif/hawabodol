import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PopularDestinations() {
  const destinations = [
    {
      name: "Cox's Bazar",
      image: "/placeholder.svg?height=300&width=400",
      description: "The longest natural sea beach in the world",
      link: "/packages?location=coxs-bazar",
    },
    {
      name: "Sundarbans",
      image: "/placeholder.svg?height=300&width=400",
      description: "The largest mangrove forest in the world",
      link: "/packages?location=sundarbans",
    },
    {
      name: "Bandarban",
      image: "/placeholder.svg?height=300&width=400",
      description: "Home to the highest peaks in Bangladesh",
      link: "/packages?location=bandarban",
    },
    {
      name: "Saint Martin",
      image: "/placeholder.svg?height=300&width=400",
      description: "The only coral island in Bangladesh",
      link: "/packages?location=saint-martin",
    },
  ]

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Popular Destinations</h2>
          <p className="text-muted-foreground mt-2">Explore the most visited destinations in Bangladesh</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/destinations">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <Link key={destination.name} href={destination.link} className="group">
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

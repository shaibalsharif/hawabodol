import Link from "next/link"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Search } from "lucide-react"

export const metadata = {
  title: "Tour Operators | হাওয়াবদল - Hawabodol",
  description: "Discover trusted tour operators on হাওয়াবদল (Hawabodol) for your next adventure.",
}

export default function OperatorsPage() {
  // Mock data for tour operators
  const operators = [
    {
      id: 1,
      name: "Bangladesh Adventures",
      logo: "/placeholder.svg?height=100&width=100",
      description: "Specializing in adventure tours across Bangladesh with experienced guides.",
      rating: 4.8,
      reviewCount: 256,
      packageCount: 15,
      verified: true,
    },
    {
      id: 2,
      name: "Cox's Travel Agency",
      logo: "/placeholder.svg?height=100&width=100",
      description: "The leading tour operator for Cox's Bazar and surrounding areas.",
      rating: 4.7,
      reviewCount: 189,
      packageCount: 12,
      verified: true,
    },
    {
      id: 3,
      name: "Dhaka Tours",
      logo: "/placeholder.svg?height=100&width=100",
      description: "Offering city tours and day trips from Dhaka to nearby attractions.",
      rating: 4.5,
      reviewCount: 142,
      packageCount: 8,
      verified: true,
    },
    {
      id: 4,
      name: "Sylhet Explorers",
      logo: "/placeholder.svg?height=100&width=100",
      description: "Specialized in tea garden tours and nature trips in Sylhet region.",
      rating: 4.6,
      reviewCount: 118,
      packageCount: 10,
      verified: true,
    },
    {
      id: 5,
      name: "Sundarbans Safari",
      logo: "/placeholder.svg?height=100&width=100",
      description: "Expert guides for Sundarbans mangrove forest tours and wildlife spotting.",
      rating: 4.9,
      reviewCount: 95,
      packageCount: 6,
      verified: true,
    },
    {
      id: 6,
      name: "Bandarban Trekkers",
      logo: "/placeholder.svg?height=100&width=100",
      description: "Specialized in trekking and hiking tours in the Chittagong Hill Tracts.",
      rating: 4.7,
      reviewCount: 87,
      packageCount: 9,
      verified: true,
    },
  ]

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Tour Operators</h1>
            <p className="text-muted-foreground">
              Discover trusted tour operators for your next adventure in Bangladesh
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search tour operators..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {operators.map((operator) => (
              <Card key={operator.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted">
                        <img
                          src={operator.logo || "/placeholder.svg"}
                          alt={operator.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{operator.name}</h3>
                          {operator.verified && (
                            <Badge variant="outline" className="bg-green-500 text-white">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="fill-yellow-500 h-4 w-4" />
                          <span className="ml-1 text-sm font-medium">{operator.rating}</span>
                          <span className="ml-1 text-sm text-muted-foreground">({operator.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{operator.description}</p>
                    <div className="mt-4 text-sm">
                      <span className="font-medium">{operator.packageCount}</span>{" "}
                      <span className="text-muted-foreground">packages available</span>
                    </div>
                  </div>
                  <div className="border-t p-4 flex justify-end">
                    <Button asChild>
                      <Link href={`/operators/${operator.id}`}>View Packages</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

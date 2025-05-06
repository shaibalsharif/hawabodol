"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

interface Package {
  id: number
  title: string
  location: string
  image: string
  price: number
  duration: string
  rating: number
  reviewCount: number
}

export function PackageCard({ package: pkg }: { package: Package }) {
  return (
    <Link href={`/packages/${pkg.id}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={pkg.image || "/placeholder.svg"}
            alt={pkg.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-2 left-2">{pkg.location}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{pkg.title}</h3>
          <div className="flex items-center mt-2">
            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{pkg.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({pkg.reviewCount} reviews)</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{pkg.duration}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold">৳{pkg.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

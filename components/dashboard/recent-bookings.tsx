"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

const bookings = [
  {
    id: "B12345",
    customerName: "John Doe",
    packageName: "Cox's Bazar Beach Getaway",
    date: "2023-05-15T00:00:00Z",
    amount: 12000,
    status: "confirmed",
  },
  {
    id: "B12346",
    customerName: "Jane Smith",
    packageName: "Sundarbans Mangrove Adventure",
    date: "2023-05-20T00:00:00Z",
    amount: 15000,
    status: "pending",
  },
  {
    id: "B12347",
    customerName: "Ahmed Khan",
    packageName: "Bandarban Hill Trekking",
    date: "2023-05-25T00:00:00Z",
    amount: 10000,
    status: "confirmed",
  },
  {
    id: "B12348",
    customerName: "Fatima Rahman",
    packageName: "Cox's Bazar Beach Getaway",
    date: "2023-06-01T00:00:00Z",
    amount: 12000,
    status: "pending",
  },
  {
    id: "B12349",
    customerName: "Kamal Hossain",
    packageName: "Sundarbans Mangrove Adventure",
    date: "2023-06-05T00:00:00Z",
    amount: 15000,
    status: "confirmed",
  },
]

export function RecentBookings() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-amber-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{booking.customerName}</h3>
              <Badge variant="outline" className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{booking.packageName}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(booking.date), { addSuffix: true })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">৳{booking.amount}</p>
            <Button variant="outline" size="sm" asChild className="mt-2">
              <Link href={`/operator/bookings/${booking.id}`}>View</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CreditCardIcon, FileTextIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"
import { TableSkeleton } from "@/components/ui/skeletons"
import { useToast } from "@/components/ui/use-toast"

// Mock data - would be fetched from API in a real app
const bookings = [
  {
    id: "B12345",
    packageName: "Cox's Bazar Beach Getaway",
    location: "Cox's Bazar",
    date: "2023-05-15T00:00:00Z",
    endDate: "2023-05-17T00:00:00Z",
    amount: 12000,
    status: "confirmed",
    participants: 2,
    operator: "Bangladesh Adventures",
  },
  {
    id: "B12346",
    packageName: "Sundarbans Mangrove Adventure",
    location: "Sundarbans",
    date: "2023-06-20T00:00:00Z",
    endDate: "2023-06-23T00:00:00Z",
    amount: 15000,
    status: "pending",
    participants: 1,
    operator: "Eco Tours Bangladesh",
  },
  {
    id: "B12347",
    packageName: "Bandarban Hill Trekking",
    location: "Bandarban",
    date: "2023-07-25T00:00:00Z",
    endDate: "2023-07-27T00:00:00Z",
    amount: 10000,
    status: "completed",
    participants: 3,
    operator: "Adventure Tours BD",
  },
  {
    id: "B12348",
    packageName: "Saint Martin Island Tour",
    location: "Saint Martin",
    date: "2023-08-10T00:00:00Z",
    endDate: "2023-08-12T00:00:00Z",
    amount: 14000,
    status: "cancelled",
    participants: 2,
    operator: "Cox's Travel Agency",
  },
]

export default function BookingsPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-amber-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Booking cancelled",
        description: `Booking ${bookingId} has been cancelled successfully.`,
      })
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <Button asChild>
            <Link href="/packages">Browse Packages</Link>
          </Button>
        </div>

        <ErrorBoundary>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {loading ? (
                <TableSkeleton rows={4} columns={3} />
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-4">
              {loading ? (
                <TableSkeleton rows={2} columns={3} />
              ) : (
                <div className="space-y-4">
                  {bookings
                    .filter((b) => b.status === "confirmed" || b.status === "pending")
                    .map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              {loading ? (
                <TableSkeleton rows={1} columns={3} />
              ) : (
                <div className="space-y-4">
                  {bookings
                    .filter((b) => b.status === "completed")
                    .map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-4">
              {loading ? (
                <TableSkeleton rows={1} columns={3} />
              ) : (
                <div className="space-y-4">
                  {bookings
                    .filter((b) => b.status === "cancelled")
                    .map((booking) => (
                      <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  )
}

interface BookingCardProps {
  booking: (typeof bookings)[0]
  onCancel: (id: string) => void
}

function BookingCard({ booking, onCancel }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500"
      case "pending":
        return "bg-amber-500"
      case "completed":
        return "bg-blue-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{booking.packageName}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {booking.location}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {formatDate(booking.date)} - {formatDate(booking.endDate)}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <CreditCardIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                ৳{booking.amount.toLocaleString()} • {booking.participants}{" "}
                {booking.participants > 1 ? "persons" : "person"}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <FileTextIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Booking ID: {booking.id}</span>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            {booking.status === "pending" || booking.status === "confirmed" ? (
              <Button variant="outline" size="sm" onClick={() => onCancel(booking.id)}>
                Cancel Booking
              </Button>
            ) : booking.status === "completed" ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/reviews/new?package=${booking.id}`}>Write Review</Link>
              </Button>
            ) : null}
            <Button size="sm" asChild>
              <Link href={`/bookings/${booking.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

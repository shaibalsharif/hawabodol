import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, CreditCard, Package, Users } from "lucide-react"
import Link from "next/link"

export default function TouristDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Next trip in 15 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳25,000</div>
              <p className="text-xs text-muted-foreground">+৳12,000 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Packages</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="upcoming">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
              <TabsTrigger value="past">Past Trips</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <Button asChild>
              <Link href="/packages">Browse Packages</Link>
            </Button>
          </div>
          <TabsContent value="upcoming" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Cox's Bazar Beach Getaway</CardTitle>
                <CardDescription>3 days, 2 nights • Starting on May 15, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID: #12345</p>
                    <p className="text-sm font-medium mt-1">Total: ৳12,000</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/bookings/12345">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="text-center py-8 text-muted-foreground">No more upcoming trips</div>
          </TabsContent>
          <TabsContent value="past" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sundarbans Mangrove Adventure</CardTitle>
                <CardDescription>4 days, 3 nights • March 10-13, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID: #12344</p>
                    <p className="text-sm font-medium mt-1">Total: ৳15,000</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/bookings/12344">View Details</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/reviews/new?package=2">Write Review</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bandarban Hill Trekking</CardTitle>
                <CardDescription>3 days, 2 nights • January 5-7, 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking ID: #12343</p>
                    <p className="text-sm font-medium mt-1">Total: ৳10,000</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href="/bookings/12343">View Details</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/reviews/new?package=3">Write Review</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="favorites" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Cox's Bazar Beach"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Cox's Bazar Beach Getaway</h3>
                  <p className="text-sm text-muted-foreground mt-1">3 days, 2 nights</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">৳12,000</span>
                    <Button asChild>
                      <Link href="/packages/1">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sundarbans Mangrove"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Sundarbans Mangrove Adventure</h3>
                  <p className="text-sm text-muted-foreground mt-1">4 days, 3 nights</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">৳15,000</span>
                    <Button asChild>
                      <Link href="/packages/2">View</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

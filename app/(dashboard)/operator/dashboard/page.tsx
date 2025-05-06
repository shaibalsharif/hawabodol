import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Package, Users } from "lucide-react"
import Link from "next/link"
import { OperatorStats } from "@/components/dashboard/operator-stats"
import { RecentBookings } from "@/components/dashboard/recent-bookings"

export default function OperatorDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Operator Dashboard</h1>
          <Button asChild>
            <Link href="/operator/packages/new">Create New Package</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳245,000</div>
              <p className="text-xs text-muted-foreground">+৳42,000 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">+18 from last month</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="packages">Active Packages</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <OperatorStats />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bookings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest bookings for your packages</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBookings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="packages" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Cox's Bazar Beach"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Cox's Bazar Beach Getaway</h3>
                  <p className="text-sm text-muted-foreground mt-1">3 days, 2 nights</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-muted-foreground">Bookings: 15/20</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">৳12,000</span>
                    <Button variant="outline" asChild>
                      <Link href="/operator/packages/1">Manage</Link>
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
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Sundarbans Mangrove Adventure</h3>
                  <p className="text-sm text-muted-foreground mt-1">4 days, 3 nights</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-muted-foreground">Bookings: 8/15</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">৳15,000</span>
                    <Button variant="outline" asChild>
                      <Link href="/operator/packages/2">Manage</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Bandarban Hill"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                    Draft
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Bandarban Hill Trekking</h3>
                  <p className="text-sm text-muted-foreground mt-1">3 days, 2 nights</p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="text-muted-foreground">Not published yet</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold">৳10,000</span>
                    <Button variant="outline" asChild>
                      <Link href="/operator/packages/3">Edit</Link>
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

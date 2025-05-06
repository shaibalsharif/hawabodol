import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Building, CreditCard, Package, Users } from "lucide-react"
import Link from "next/link"
import { AdminStats } from "@/components/dashboard/admin-stats"
import { PendingApprovals } from "@/components/dashboard/pending-approvals"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/reports">View Reports</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/settings">System Settings</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground">+42 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tour Operators</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳1,245,000</div>
              <p className="text-xs text-muted-foreground">+৳142,000 from last month</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="reports">Recent Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>Monthly statistics for the current year</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <AdminStats />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="approvals" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Tour operators waiting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <PendingApprovals />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest reports from users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Inappropriate Content</h3>
                      <p className="text-sm text-muted-foreground">Reported by: John Doe</p>
                      <p className="text-sm text-muted-foreground">Package: Cox's Bazar Beach Getaway</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/admin/reports/1">Review</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">Misleading Information</h3>
                      <p className="text-sm text-muted-foreground">Reported by: Jane Smith</p>
                      <p className="text-sm text-muted-foreground">Package: Sundarbans Mangrove Adventure</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/admin/reports/2">Review</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Payment Issue</h3>
                      <p className="text-sm text-muted-foreground">Reported by: Ahmed Khan</p>
                      <p className="text-sm text-muted-foreground">Booking ID: #12345</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/admin/reports/3">Review</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

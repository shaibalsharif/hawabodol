"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ErrorBoundary } from "@/components/error-boundary"
import { TableSkeleton } from "@/components/ui/skeletons"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Calendar, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - would be fetched from API in a real app
const packages = [
  {
    id: 1,
    title: "Cox's Bazar Beach Getaway",
    location: "Cox's Bazar",
    startDate: "2023-05-15",
    endDate: "2023-05-17",
    price: 12000,
    status: "published",
    bookings: 12,
    availableSeats: 8,
  },
  {
    id: 2,
    title: "Sundarbans Mangrove Adventure",
    location: "Sundarbans",
    startDate: "2023-06-20",
    endDate: "2023-06-23",
    price: 15000,
    status: "published",
    bookings: 8,
    availableSeats: 12,
  },
  {
    id: 3,
    title: "Bandarban Hill Trekking",
    location: "Bandarban",
    startDate: "2023-07-25",
    endDate: "2023-07-27",
    price: 10000,
    status: "draft",
    bookings: 0,
    availableSeats: 20,
  },
  {
    id: 4,
    title: "Saint Martin Island Tour",
    location: "Saint Martin",
    startDate: "2023-08-10",
    endDate: "2023-08-12",
    price: 14000,
    status: "published",
    bookings: 15,
    availableSeats: 5,
  },
]

export default function OperatorPackagesPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredPackages, setFilteredPackages] = useState(packages)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter packages based on search term and status
    let filtered = packages

    if (searchTerm) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((pkg) => pkg.status === statusFilter)
    }

    setFilteredPackages(filtered)
  }, [searchTerm, statusFilter])

  const handleDeletePackage = (id: number) => {
    setFilteredPackages(filteredPackages.filter((pkg) => pkg.id !== id))
    toast({
      title: "Package deleted",
      description: "The package has been deleted successfully.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Manage Packages</h1>
          <Button asChild>
            <Link href="/operator/packages/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Package
            </Link>
          </Button>
        </div>

        <ErrorBoundary>
          <Card>
            <CardHeader>
              <CardTitle>Tour Packages</CardTitle>
              <CardDescription>
                View and manage all your tour packages. Create new packages, edit existing ones, or delete packages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status-filter" className="sr-only">
                      Filter by status
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter} disabled={loading}>
                      <SelectTrigger id="status-filter" className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Packages</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Packages</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={4} columns={5} />
                    ) : filteredPackages.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">Package</th>
                                <th className="h-12 px-4 text-left font-medium">Date</th>
                                <th className="h-12 px-4 text-left font-medium">Price</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Bookings</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPackages.map((pkg) => (
                                <tr key={pkg.id} className="border-b">
                                  <td className="p-4">
                                    <div className="font-medium">{pkg.title}</div>
                                    <div className="text-sm text-muted-foreground">{pkg.location}</div>
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center">
                                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                      <span>
                                        {pkg.startDate} - {pkg.endDate}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-4">৳{pkg.price.toLocaleString()}</td>
                                  <td className="p-4">{getStatusBadge(pkg.status)}</td>
                                  <td className="p-4">
                                    <div>
                                      {pkg.bookings} / {pkg.bookings + pkg.availableSeats}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{pkg.availableSeats} seats left</div>
                                  </td>
                                  <td className="p-4 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">Actions</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                          <Link href={`/packages/${pkg.id}`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                          <Link href={`/operator/packages/${pkg.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                          </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={() => handleDeletePackage(pkg.id)}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <h2 className="text-xl font-semibold mb-2">No packages found</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          {searchTerm || statusFilter !== "all"
                            ? "No packages match your search criteria. Try adjusting your filters."
                            : "You haven't created any packages yet. Create your first package to get started."}
                        </p>
                        <Button asChild>
                          <Link href="/operator/packages/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Package
                          </Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="published" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={3} columns={5} />
                    ) : (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">Package</th>
                                <th className="h-12 px-4 text-left font-medium">Date</th>
                                <th className="h-12 px-4 text-left font-medium">Price</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Bookings</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPackages
                                .filter((pkg) => pkg.status === "published")
                                .map((pkg) => (
                                  <tr key={pkg.id} className="border-b">
                                    <td className="p-4">
                                      <div className="font-medium">{pkg.title}</div>
                                      <div className="text-sm text-muted-foreground">{pkg.location}</div>
                                    </td>
                                    <td className="p-4">
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>
                                          {pkg.startDate} - {pkg.endDate}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4">৳{pkg.price.toLocaleString()}</td>
                                    <td className="p-4">{getStatusBadge(pkg.status)}</td>
                                    <td className="p-4">
                                      <div>
                                        {pkg.bookings} / {pkg.bookings + pkg.availableSeats}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {pkg.availableSeats} seats left
                                      </div>
                                    </td>
                                    <td className="p-4 text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem asChild>
                                            <Link href={`/packages/${pkg.id}`}>
                                              <Eye className="mr-2 h-4 w-4" />
                                              View
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem asChild>
                                            <Link href={`/operator/packages/${pkg.id}/edit`}>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => handleDeletePackage(pkg.id)}
                                          >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="draft" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={1} columns={5} />
                    ) : (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">Package</th>
                                <th className="h-12 px-4 text-left font-medium">Date</th>
                                <th className="h-12 px-4 text-left font-medium">Price</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Bookings</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPackages
                                .filter((pkg) => pkg.status === "draft")
                                .map((pkg) => (
                                  <tr key={pkg.id} className="border-b">
                                    <td className="p-4">
                                      <div className="font-medium">{pkg.title}</div>
                                      <div className="text-sm text-muted-foreground">{pkg.location}</div>
                                    </td>
                                    <td className="p-4">
                                      <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>
                                          {pkg.startDate} - {pkg.endDate}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="p-4">৳{pkg.price.toLocaleString()}</td>
                                    <td className="p-4">{getStatusBadge(pkg.status)}</td>
                                    <td className="p-4">
                                      <div>
                                        {pkg.bookings} / {pkg.bookings + pkg.availableSeats}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {pkg.availableSeats} seats left
                                      </div>
                                    </td>
                                    <td className="p-4 text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Actions</span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem asChild>
                                            <Link href={`/packages/${pkg.id}`}>
                                              <Eye className="mr-2 h-4 w-4" />
                                              View
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem asChild>
                                            <Link href={`/operator/packages/${pkg.id}/edit`}>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => handleDeletePackage(pkg.id)}
                                          >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  )
}

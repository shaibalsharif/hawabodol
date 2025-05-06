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
import { Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data - would be fetched from API in a real app
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "tourist",
    status: "active",
    profileImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "tourist",
    status: "active",
    profileImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-02-20",
  },
  {
    id: 3,
    name: "Bangladesh Adventures",
    email: "info@bangladeshadventures.com",
    role: "operator",
    status: "active",
    profileImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-01-10",
  },
  {
    id: 4,
    name: "Cox's Travel Agency",
    email: "info@coxstravelagency.com",
    role: "operator",
    status: "pending",
    profileImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-03-05",
  },
  {
    id: 5,
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    role: "tourist",
    status: "suspended",
    profileImage: "/placeholder.svg?height=40&width=40",
    createdAt: "2023-02-01",
  },
]

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState(users)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter users based on search term, role, and status
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }, [searchTerm, roleFilter, statusFilter])

  const handleStatusChange = (userId: number, newStatus: string) => {
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)),
    )

    toast({
      title: "User status updated",
      description: `User status has been updated to ${newStatus}.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Pending
          </Badge>
        )
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "operator":
        return <Badge className="bg-blue-500">Operator</Badge>
      case "tourist":
        return <Badge className="bg-green-500">Tourist</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <ErrorBoundary>
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                View and manage all users. Approve operator accounts, suspend users, or change user roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="role-filter" className="sr-only">
                      Filter by role
                    </Label>
                    <Select value={roleFilter} onValueChange={setRoleFilter} disabled={loading}>
                      <SelectTrigger id="role-filter" className="w-[150px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="tourist">Tourist</SelectItem>
                      </SelectContent>
                    </Select>

                    <Label htmlFor="status-filter" className="sr-only">
                      Filter by status
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter} disabled={loading}>
                      <SelectTrigger id="status-filter" className="w-[150px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">All Users</TabsTrigger>
                    <TabsTrigger value="tourists">Tourists</TabsTrigger>
                    <TabsTrigger value="operators">Operators</TabsTrigger>
                    <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={5} columns={4} />
                    ) : filteredUsers.length > 0 ? (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">User</th>
                                <th className="h-12 px-4 text-left font-medium">Role</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Joined</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <Avatar>
                                        <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">{getRoleBadge(user.role)}</td>
                                  <td className="p-4">{getStatusBadge(user.status)}</td>
                                  <td className="p-4">{user.createdAt}</td>
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
                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                        {user.status === "pending" && (
                                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                            Approve User
                                          </DropdownMenuItem>
                                        )}
                                        {user.status === "active" && (
                                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                                            Suspend User
                                          </DropdownMenuItem>
                                        )}
                                        {user.status === "suspended" && (
                                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                            Reactivate User
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
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
                        <h2 className="text-xl font-semibold mb-2">No users found</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          No users match your search criteria. Try adjusting your filters.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="tourists" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={3} columns={4} />
                    ) : (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">User</th>
                                <th className="h-12 px-4 text-left font-medium">Role</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Joined</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers
                                .filter((user) => user.role === "tourist")
                                .map((user) => (
                                  <tr key={user.id} className="border-b">
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{user.name}</div>
                                          <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4">{getRoleBadge(user.role)}</td>
                                    <td className="p-4">{getStatusBadge(user.status)}</td>
                                    <td className="p-4">{user.createdAt}</td>
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
                                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                                          {user.status === "active" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                                              Suspend User
                                            </DropdownMenuItem>
                                          )}
                                          {user.status === "suspended" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                              Reactivate User
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
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

                  <TabsContent value="operators" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={2} columns={4} />
                    ) : (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">User</th>
                                <th className="h-12 px-4 text-left font-medium">Role</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Joined</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers
                                .filter((user) => user.role === "operator")
                                .map((user) => (
                                  <tr key={user.id} className="border-b">
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{user.name}</div>
                                          <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4">{getRoleBadge(user.role)}</td>
                                    <td className="p-4">{getStatusBadge(user.status)}</td>
                                    <td className="p-4">{user.createdAt}</td>
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
                                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                                          {user.status === "pending" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                              Approve Operator
                                            </DropdownMenuItem>
                                          )}
                                          {user.status === "active" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                                              Suspend Operator
                                            </DropdownMenuItem>
                                          )}
                                          {user.status === "suspended" && (
                                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                              Reactivate Operator
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">Delete Operator</DropdownMenuItem>
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

                  <TabsContent value="pending" className="mt-4">
                    {loading ? (
                      <TableSkeleton rows={1} columns={4} />
                    ) : (
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="h-12 px-4 text-left font-medium">User</th>
                                <th className="h-12 px-4 text-left font-medium">Role</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                <th className="h-12 px-4 text-left font-medium">Joined</th>
                                <th className="h-12 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredUsers
                                .filter((user) => user.status === "pending")
                                .map((user) => (
                                  <tr key={user.id} className="border-b">
                                    <td className="p-4">
                                      <div className="flex items-center gap-3">
                                        <Avatar>
                                          <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">{user.name}</div>
                                          <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-4">{getRoleBadge(user.role)}</td>
                                    <td className="p-4">{getStatusBadge(user.status)}</td>
                                    <td className="p-4">{user.createdAt}</td>
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
                                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                            Approve User
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">Reject User</DropdownMenuItem>
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

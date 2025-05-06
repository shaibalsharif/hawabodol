"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-provider"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  CreditCard,
  Home,
  Package,
  Settings,
  Users,
  Building,
  MessageSquare,
  FileText,
  HelpCircle,
  LogOut,
} from "lucide-react"

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Help & Support",
        href: "/support",
        icon: HelpCircle,
      },
    ]

    if (user?.role === "admin") {
      return [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          icon: Home,
        },
        {
          title: "Users",
          href: "/admin/users",
          icon: Users,
        },
        {
          title: "Tour Operators",
          href: "/admin/operators",
          icon: Building,
        },
        {
          title: "Tour Packages",
          href: "/admin/packages",
          icon: Package,
        },
        {
          title: "Bookings",
          href: "/admin/bookings",
          icon: Calendar,
        },
        {
          title: "Reports",
          href: "/admin/reports",
          icon: FileText,
        },
        {
          title: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
        },
        ...commonItems,
      ]
    } else if (user?.role === "operator") {
      return [
        {
          title: "Dashboard",
          href: "/operator/dashboard",
          icon: Home,
        },
        {
          title: "Tour Packages",
          href: "/operator/packages",
          icon: Package,
        },
        {
          title: "Bookings",
          href: "/operator/bookings",
          icon: Calendar,
        },
        {
          title: "Customers",
          href: "/operator/customers",
          icon: Users,
        },
        {
          title: "Payments",
          href: "/operator/payments",
          icon: CreditCard,
        },
        {
          title: "Analytics",
          href: "/operator/analytics",
          icon: BarChart3,
        },
        {
          title: "Messages",
          href: "/operator/messages",
          icon: MessageSquare,
        },
        ...commonItems,
      ]
    } else {
      // Tourist
      return [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: Home,
        },
        {
          title: "My Bookings",
          href: "/bookings",
          icon: Calendar,
        },
        {
          title: "Payments",
          href: "/payments",
          icon: CreditCard,
        },
        {
          title: "Favorites",
          href: "/favorites",
          icon: Package,
        },
        {
          title: "Messages",
          href: "/messages",
          icon: MessageSquare,
        },
        ...commonItems,
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <div className={cn("flex w-[240px] flex-col", className)}>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <nav className="grid gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  )
}

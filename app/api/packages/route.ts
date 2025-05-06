import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tourPackages } from "@/lib/db/schema"
import { desc, eq, like, and, gte, lte } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const location = searchParams.get("location")
    const date = searchParams.get("date")
    const duration = searchParams.get("duration")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Build query conditions
    const conditions = []

    if (location) {
      conditions.push(like(tourPackages.location, `%${location}%`))
    }

    if (date) {
      const searchDate = new Date(date)
      conditions.push(gte(tourPackages.startDate, searchDate))
    }

    if (duration) {
      // Parse duration range (e.g., "1-3", "4-7", "8-14", "15+")
      const [min, max] = duration.split("-").map(Number)

      if (min && max) {
        // For specific range
        conditions.push(
          and(
            gte(tourPackages.endDate, new Date(new Date().setDate(new Date().getDate() + min))),
            lte(tourPackages.endDate, new Date(new Date().setDate(new Date().getDate() + max))),
          ),
        )
      } else if (min) {
        // For "15+" type of duration
        conditions.push(gte(tourPackages.endDate, new Date(new Date().setDate(new Date().getDate() + min))))
      }
    }

    // Only show published packages
    conditions.push(eq(tourPackages.status, "published"))

    // Execute query
    const packages = await db.query.tourPackages.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(tourPackages.createdAt)],
      limit,
      offset,
      with: {
        operator: {
          with: {
            user: {
              columns: {
                id: true,
                name: true,
                profileImage: true,
              },
            },
          },
        },
      },
    })

    // Get total count for pagination
    const countResult = await db
      .select({ count: db.fn.count() })
      .from(tourPackages)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const total = Number(countResult[0].count)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      packages,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}

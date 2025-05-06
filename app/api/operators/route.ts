import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tourOperators } from "@/lib/db/schema"
import { desc, eq, like, and } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Build query conditions
    const conditions = []

    if (search) {
      conditions.push(like(tourOperators.companyName, `%${search}%`))
    }

    // Only show verified operators
    conditions.push(eq(tourOperators.verificationStatus, true))

    // Execute query
    const operators = await db.query.tourOperators.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(tourOperators.createdAt)],
      limit,
      offset,
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
      },
    })

    // Get total count for pagination
    const countResult = await db
      .select({ count: db.fn.count() })
      .from(tourOperators)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    const total = Number(countResult[0].count)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      operators,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching operators:", error)
    return NextResponse.json({ error: "Failed to fetch operators" }, { status: 500 })
  }
}

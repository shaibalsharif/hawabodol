import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tourOperators, tourPackages } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid operator ID" }, { status: 400 })
    }

    const operator = await db.query.tourOperators.findFirst({
      where: eq(tourOperators.id, id),
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
        tourPackages: {
          where: eq(tourPackages.status, "published"),
          limit: 10,
        },
      },
    })

    if (!operator) {
      return NextResponse.json({ error: "Operator not found" }, { status: 404 })
    }

    return NextResponse.json(operator)
  } catch (error) {
    console.error("Error fetching operator:", error)
    return NextResponse.json({ error: "Failed to fetch operator" }, { status: 500 })
  }
}

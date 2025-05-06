import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { tourPackages } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid package ID" }, { status: 400 })
    }

    const packageData = await db.query.tourPackages.findFirst({
      where: eq(tourPackages.id, id),
      with: {
        operator: {
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
        },
        packageCategories: true,
        reviews: {
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

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json(packageData)
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
  }
}

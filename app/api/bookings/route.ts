import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { bookings, tourPackages, packageCategories } from "@/lib/db/schema"
import { desc, eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/auth-options"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Build query conditions
    const conditions = [eq(bookings.userId, userId)]

    if (status) {
      conditions.push(eq(bookings.status, status))
    }

    // Execute query
    const userBookings = await db.query.bookings.findMany({
      where: and(...conditions),
      orderBy: [desc(bookings.createdAt)],
      limit,
      offset,
      with: {
        package: true,
        category: true,
      },
    })

    // Get total count for pagination
    const countResult = await db
      .select({ count: db.fn.count() })
      .from(bookings)
      .where(and(...conditions))

    const total = Number(countResult[0].count)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      bookings: userBookings,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const { packageId, categoryId, quantity, specialRequests } = await request.json()

    if (!packageId || !categoryId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get package and category details
    const packageData = await db.query.tourPackages.findFirst({
      where: eq(tourPackages.id, packageId),
      with: {
        packageCategories: {
          where: eq(packageCategories.id, categoryId),
        },
      },
    })

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    if (packageData.packageCategories.length === 0) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const category = packageData.packageCategories[0]

    // Check if enough seats are available
    if (packageData.availableSeats < quantity) {
      return NextResponse.json({ error: "Not enough seats available" }, { status: 400 })
    }

    // Calculate amounts
    const totalAmount = category.price * quantity
    const discountAmount = 0 // Apply discounts if any
    const finalAmount = totalAmount - discountAmount

    // Create booking
    const [booking] = await db
      .insert(bookings)
      .values({
        userId,
        packageId,
        categoryId,
        quantity,
        totalAmount,
        discountAmount,
        finalAmount,
        status: "pending",
        paymentMethod: null,
        paymentStatus: false,
        paymentDetails: specialRequests ? JSON.stringify({ specialRequests }) : null,
      })
      .returning()

    // Update available seats
    await db
      .update(tourPackages)
      .set({ availableSeats: packageData.availableSeats - quantity })
      .where(eq(tourPackages.id, packageId))

    return NextResponse.json({ message: "Booking created successfully", booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

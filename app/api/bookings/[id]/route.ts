import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { bookings, tourPackages } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/auth-options"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const bookingId = Number.parseInt(params.id)

    if (isNaN(bookingId)) {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 })
    }

    // Check if the booking belongs to the user or if the user is an admin/operator
    const booking = await db.query.bookings.findFirst({
      where: and(eq(bookings.id, bookingId), session.user.role === "admin" ? undefined : eq(bookings.userId, userId)),
      with: {
        package: {
          with: {
            operator: {
              with: {
                user: {
                  columns: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        category: true,
        user: {
          columns: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const bookingId = Number.parseInt(params.id)
    const { status } = await request.json()

    if (isNaN(bookingId)) {
      return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 })
    }

    // Get the booking
    const booking = await db.query.bookings.findFirst({
      where: eq(bookings.id, bookingId),
    })

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Check permissions
    if (session.user.role === "tourist" && booking.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // For operators, check if they own the package
    if (session.user.role === "operator") {
      const packageData = await db.query.tourPackages.findFirst({
        where: eq(tourPackages.id, booking.packageId),
        with: {
          operator: {
            with: {
              user: true,
            },
          },
        },
      })

      if (!packageData || packageData.operator.userId !== userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
      }
    }

    // Update booking status
    const [updatedBooking] = await db
      .update(bookings)
      .set({
        status,
        confirmedAt: status === "confirmed" ? new Date() : booking.confirmedAt,
        cancelledAt: status === "cancelled" ? new Date() : booking.cancelledAt,
        completedAt: status === "completed" ? new Date() : booking.completedAt,
      })
      .where(eq(bookings.id, bookingId))
      .returning()

    // If cancelled, update available seats
    if (status === "cancelled" && booking.status !== "cancelled") {
      await db
        .update(tourPackages)
        .set({
          availableSeats: db.raw(`available_seats + ${booking.quantity}`),
        })
        .where(eq(tourPackages.id, booking.packageId))
    }

    return NextResponse.json({ message: "Booking updated successfully", booking: updatedBooking })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    // Get user ID from query params
    const userId = request.nextUrl.searchParams.get("id")
    const email = request.nextUrl.searchParams.get("email")

    // Previously used Firebase UID
    // const uid = request.nextUrl.searchParams.get("uid")

    if (!userId && !email) {
      return NextResponse.json({ error: "User ID or email is required" }, { status: 400 })
    }

    // Find user by ID or email
    const user = await db.query.users.findFirst({
      where: userId ? eq(users.id, Number.parseInt(userId)) : eq(users.email, email as string),
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password from response
    const { password, ...userData } = user

    return NextResponse.json(userData, { status: 200 })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, tourOperators } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
// Comment out Firebase imports
// import { getAuth } from "firebase-admin/auth"
// import { initializeApp, getApps, cert } from "firebase-admin/app"

// // Initialize Firebase Admin if not already initialized
// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: "hwabodol",
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   })
// }

export async function POST(request: NextRequest) {
  try {
    const { name, phone, role, email, password } = await request.json()

    // Get the authorization token
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split("Bearer ")[1]

    // Instead of verifying Firebase token, verify our own JWT token
    // For now, we'll just use the token as a user identifier
    // In a real app, you would verify the JWT token

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: email ? eq(users.email, email) : eq(users.phone, phone),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User profile already exists" }, { status: 409 })
    }

    // Set initial status based on role
    const status = role === "operator" ? "pending" : "active"

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        phone,
        email,
        role,
        status,
        password,
      })
      .returning()

    // If role is operator, create tour operator record
    if (role === "operator" && newUser) {
      await db.insert(tourOperators).values({
        userId: newUser.id,
        companyName: name || "New Tour Operator",
      })
    }

    return NextResponse.json({ message: "Profile completed successfully", user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Complete profile error:", error)
    return NextResponse.json({ error: "Failed to complete profile" }, { status: 500 })
  }
}

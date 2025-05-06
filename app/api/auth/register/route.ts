import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users, tourOperators } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import * as bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json().catch(() => {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    })

    const { email, name, role, phone, password } = body

    // Validate required fields
    if (!email && !phone) {
      return NextResponse.json({ error: "Email or phone is required" }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: email ? eq(users.email, email) : eq(users.phone, phone),
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Set initial status based on role
    const status = role === "operator" ? "pending" : "active"

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        phone,
        name,
        role,
        status,
        password: hashedPassword,
      })
      .returning()

    // If role is operator, create tour operator record
    if (role === "operator" && newUser) {
      await db.insert(tourOperators).values({
        userId: newUser.id,
        companyName: name || "New Tour Operator",
      })
    }

    // Remove password from response
    const userResponse = { ...newUser, password: undefined }

    return NextResponse.json({ message: "User registered successfully", user: userResponse }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}

import { sql } from "drizzle-orm"
import { db } from "@/lib/db"

export async function addPasswordField() {
  try {
    // Check if the password column already exists
    const result = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'password'
    `)

    // If the column doesn't exist, add it
    if (result.rows.length === 0) {
      await db.execute(sql`
        ALTER TABLE users 
        ADD COLUMN password TEXT
      `)
      console.log("Added password column to users table")
    } else {
      console.log("Password column already exists in users table")
    }
  } catch (error) {
    console.error("Error adding password field:", error)
    throw error
  }
}
